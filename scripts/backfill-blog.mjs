import fs from 'fs';
import path from 'path';

const YT_API_KEY = 'AIzaSyB-Rmqu5gDjguyh-nqy1nXiiAPzVt_FCAA';
const CHANNEL_ID = 'UCh_rcAX1A5l1fJFalHXqtKQ';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY; // pass as env var
const BLOG_DIR = path.join(process.cwd(), 'public/blog');

function makeSlug(title) {
  return title
    .toLowerCase()
    .replace(/^ep\.?\s*\d+\s*:?\s*/i, '')
    .replace(/\|.*$/g, '')
    .replace(/the manage her:?\s*/gi, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 120);
}

function formatDuration(iso) {
  const match = (iso || '').match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '30 min';
  const h = parseInt(match[1]||0);
  const m = parseInt(match[2]||0);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

function getDurationSeconds(iso) {
  const match = (iso || '').match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (parseInt(match[1]||0) * 3600) + (parseInt(match[2]||0) * 60) + parseInt(match[3]||0);
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getAllVideoIds() {
  let videoIds = [];
  let nextPageToken = '';

  do {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${CHANNEL_ID}&part=id&type=video&maxResults=50&order=date${nextPageToken ? '&pageToken=' + nextPageToken : ''}`;
    const res = await fetch(url);
    const data = await res.json();
    const ids = (data.items || []).map(item => item.id.videoId).filter(Boolean);
    videoIds.push(...ids);
    nextPageToken = data.nextPageToken || '';
    console.log(`  Fetched ${videoIds.length} video IDs so far...`);
  } while (nextPageToken);

  return videoIds;
}

async function getVideoDetails(ids) {
  const results = [];
  // Process in batches of 50
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${YT_API_KEY}&id=${batch.join(',')}&part=snippet,contentDetails`;
    const res = await fetch(url);
    const data = await res.json();
    results.push(...(data.items || []));
  }
  return results;
}

async function generateBlogPost(episode) {
  const prompt = `You are a blog content writer for The Manage Her® — a women's leadership podcast hosted by Aimee Rickabus, CEO of a nine-figure technology company, bestselling author, and mother of six. Generate an enhanced show notes blog post from this podcast episode.

EPISODE DETAILS:
Title: ${episode.title}
Duration: ${episode.durationFormatted}
Published: ${episode.publishedAt}
YouTube URL: ${episode.youtubeUrl}

EPISODE DESCRIPTION:
${(episode.description || '').substring(0, 8000)}

Generate a JSON response with EXACTLY this structure (no markdown, no backticks, just raw JSON):
{
  "title": "A compelling blog title (different from the episode title, more SEO-friendly, under 80 characters)",
  "episodeNumber": extract the episode number from the title or use 0,
  "guestName": "Guest full name or empty string if solo episode",
  "guestBio": "2-3 sentence bio of the guest based on what is discussed in the episode",
  "excerpt": "A compelling 2-3 sentence summary that makes someone want to listen",
  "metaDescription": "SEO meta description under 160 characters",
  "topics": ["3-5 topic tags from: Leadership, Motherhood, Financial Literacy, Wellness, Entrepreneurship, Boundaries, Identity, Marriage, Community, Spirituality"],
  "keyTakeaways": ["5-7 key takeaways as complete sentences"],
  "pullQuotes": [{"text": "A memorable quote from the episode", "timestamp": ""}],
  "timestamps": [{"time": "0:00", "label": "Introduction"}],
  "content": "Full blog post as HTML. Use p tags for paragraphs, strong for emphasis, em for italic, h3 for subheadings. Write 800-1200 words covering the main themes insights and actionable advice. Write in The Manage Her brand voice: bold warm direct permission-giving. Address the reader as you. Do NOT use bullet point lists in the content. Write in flowing prose paragraphs."
}

IMPORTANT: Return ONLY valid JSON. No markdown. No backticks. No preamble.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();
  const text = data.content[0].text;
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(clean);
}

async function main() {
  if (!ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY env var');
    process.exit(1);
  }

  console.log('🔍 Fetching all video IDs from channel...');
  const allIds = await getAllVideoIds();
  console.log(`Found ${allIds.length} total videos`);

  console.log('📋 Getting video details...');
  const allVideos = await getVideoDetails(allIds);

  // Filter to full episodes (20+ min to catch slightly shorter ones)
  const fullEpisodes = allVideos
    .filter(v => getDurationSeconds(v.contentDetails.duration) >= 1200)
    .map(v => ({
      id: v.id,
      title: v.snippet.title,
      slug: makeSlug(v.snippet.title),
      description: v.snippet.description,
      thumbnail: v.snippet.thumbnails?.maxres?.url || v.snippet.thumbnails?.high?.url || '',
      publishedAt: v.snippet.publishedAt,
      duration: v.contentDetails.duration,
      durationFormatted: formatDuration(v.contentDetails.duration),
      youtubeUrl: `https://www.youtube.com/watch?v=${v.id}`
    }))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  console.log(`Found ${fullEpisodes.length} full episodes (20+ min)`);

  // Ensure blog directory exists
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

  let generated = 0;
  let skipped = 0;

  for (let i = 0; i < fullEpisodes.length; i++) {
    const ep = fullEpisodes[i];
    const filePath = path.join(BLOG_DIR, `${ep.slug}.json`);

    if (fs.existsSync(filePath)) {
      console.log(`⏭️  [${i+1}/${fullEpisodes.length}] Already exists: ${ep.title}`);
      skipped++;
      continue;
    }

    console.log(`✍️  [${i+1}/${fullEpisodes.length}] Generating: ${ep.title}`);

    try {
      const blogData = await generateBlogPost(ep);

      const post = {
        slug: ep.slug,
        title: blogData.title || ep.title,
        episodeNumber: blogData.episodeNumber || 0,
        guestName: blogData.guestName || '',
        guestBio: blogData.guestBio || '',
        publishedAt: ep.publishedAt,
        duration: ep.durationFormatted,
        thumbnail: ep.thumbnail,
        youtubeUrl: ep.youtubeUrl,
        spotifyUrl: 'https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ',
        appleUrl: 'https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475',
        excerpt: blogData.excerpt || '',
        metaDescription: blogData.metaDescription || '',
        topics: blogData.topics || [],
        keyTakeaways: blogData.keyTakeaways || [],
        pullQuotes: blogData.pullQuotes || [],
        timestamps: blogData.timestamps || [],
        content: blogData.content || ''
      };

      fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
      generated++;
      console.log(`   ✅ Saved: ${ep.slug}.json`);

      // Rate limit — wait 3 seconds between API calls
      if (i < fullEpisodes.length - 1) {
        await sleep(3000);
      }
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
    }
  }

  // Rebuild posts.json index
  console.log('\n📝 Rebuilding posts.json index...');
  const allPosts = [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));

  for (const file of files) {
    try {
      const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'));
      allPosts.push({
        slug: post.slug,
        title: post.title,
        episodeNumber: post.episodeNumber,
        guestName: post.guestName,
        publishedAt: post.publishedAt,
        duration: post.duration,
        thumbnail: post.thumbnail,
        excerpt: post.excerpt,
        topics: post.topics,
        youtubeUrl: post.youtubeUrl
      });
    } catch (e) {
      console.error(`  Skipping malformed: ${file}`);
    }
  }

  // Sort by date descending
  allPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  fs.writeFileSync(path.join(BLOG_DIR, 'posts.json'), JSON.stringify({ posts: allPosts }, null, 2));

  console.log(`\n🎉 Done! Generated ${generated} new posts, skipped ${skipped} existing. Total: ${allPosts.length} posts in index.`);
}

main().catch(console.error);
