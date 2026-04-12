import fs from 'fs';
import path from 'path';

const YT_API_KEY = 'AIzaSyB-Rmqu5gDjguyh-nqy1nXiiAPzVt_FCAA';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const BLOG_DIR = path.join(process.cwd(), 'public/blog');

// Authoritative videoId → episode number mapping
const EPISODE_MAP = {
  "2hbgru9Eu78": 1,
  "gIDKnhS-WaQ": 2,
  "vCXWjC0-DD8": 3,
  "IJA_-Jwjbtw": 4,
  "Tz6fwH9uMtE": 5,
  "5o-tpL1WEBw": 6,
  "-EB0fhJPc3Q": 7,
  "Tz8aQljU2iU": 8,
  "C1MfsqOjlos": 9,
  "sdM5uX9DGz": 10,
  "V0WHRu34H9I": 11,
  "T6r9Bc5DlqI": 12,
  "Gbv27RDjuGw": 13,
  "OtJvvXQiSII": 14,
  "L1CuMRrL1lo": 15,
  "W3JO1OLhh7M": 16,
  "cXnfu9RmDK4": 17,
  "FcJhWdtEkbQ": 18,
  "0IGvmKlcmWk": 19,
  "WxuhR9i-d2A": 20,
  "1wBxCejTPKI": 21,
  "ZkC0RDqXDVo": 22,
  "yJIuTMgnU4k": 23,
  "GbRG7Sh7ILw": 24,
  "3-IEwpqSsUw": 26,
  "4ICspFJ4GIg": 27,
  "1nsbOPCgVnI": 28,
  "vEOjLY7o_D8": 29,
  "idGdfC1HbmU": 30,
  "9rGp2LZuqCg": 31,
  "6bchW_vZF5s": 32,
  "o6vTHqXybhY": 33,
  "q3_Wj0pdh8U": 34,
  "ySo__KAKp_w": 35,
  "QlULl7ehS90": 36,
  "C84QQygFABc": 37,
  "palrIIBkoWQ": 38,
  "b2EqUll-ers": 39,
  "SVLzi5IeDBM": 40,
  "mU2baNVwfQI": 41,
  "cIdU6Qf2uDU": 42,
  "Nq9dQl0aNC8": 43,
  "ey-ZIuFXuQ0": 44,
  "qvkJahJDixU": 45,
  "SnpxclSMvqI": 46,
  "EHZGVY9DS6A": 47,
  "rE3zWkVNDKs": 48,
  "MPoNQUa8opQ": 49,
  "fC9hxdJMgro": 50,
  "uT9hLCNcfUc": 51,
  "swolr9A2BSI": 52,
  "Fx0TCk0PsFs": 53,
  "p5QkTRFlGN8": 54,
  "Ihtpj0mEQ_w": 55,
  "h6kSEVbmTnY": 56
};

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

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getVideoDetails(ids) {
  const results = [];
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
  "guestLinks": Extract any social media or website links for the guest from the episode description. Look for Instagram, LinkedIn, TikTok, YouTube, website URLs, etc. Return as an array of {"label": "Platform Name", "url": "https://..."} objects. If no links found, return empty array.,
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

  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

  // ── STEP 1: Fix episode numbers on existing blog posts ──
  console.log('═══ STEP 1: Fix episode numbers on existing blog posts ═══\n');

  const files = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  const existingVideoIds = new Set();
  let fixedCount = 0;

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    try {
      const post = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const videoId = (post.youtubeUrl || '').match(/[?&]v=([^&]+)/)?.[1];
      if (!videoId) continue;

      existingVideoIds.add(videoId);
      const correctEp = EPISODE_MAP[videoId];

      if (correctEp && post.episodeNumber !== correctEp) {
        console.log(`  Fixed: ${post.slug} from Ep ${post.episodeNumber} → Ep ${correctEp}`);
        post.episodeNumber = correctEp;
        fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
        fixedCount++;
      } else if (correctEp) {
        console.log(`  OK: ${post.slug} = Ep ${correctEp}`);
      } else {
        console.log(`  ⚠️  No mapping for videoId ${videoId} in ${file}`);
      }
    } catch (e) {
      console.error(`  Skipping malformed: ${file}`);
    }
  }

  console.log(`\nFixed ${fixedCount} episode numbers out of ${files.length} existing posts.\n`);

  // ── STEP 2: Backfill missing episodes ──
  console.log('═══ STEP 2: Backfill missing episodes ═══\n');

  const missingVideoIds = Object.keys(EPISODE_MAP).filter(vid => !existingVideoIds.has(vid));
  console.log(`${missingVideoIds.length} episodes need backfill\n`);

  if (missingVideoIds.length > 0) {
    console.log('Fetching video details from YouTube...');
    const videoDetails = await getVideoDetails(missingVideoIds);
    const videoMap = {};
    for (const v of videoDetails) videoMap[v.id] = v;

    // Sort by episode number
    missingVideoIds.sort((a, b) => EPISODE_MAP[a] - EPISODE_MAP[b]);

    let generated = 0;
    for (let i = 0; i < missingVideoIds.length; i++) {
      const vid = missingVideoIds[i];
      const epNum = EPISODE_MAP[vid];
      const v = videoMap[vid];

      if (!v) {
        console.log(`  ❌ Ep ${epNum}: videoId ${vid} not found on YouTube — skipping`);
        continue;
      }

      const episode = {
        id: v.id,
        title: v.snippet.title,
        slug: makeSlug(v.snippet.title),
        description: v.snippet.description,
        thumbnail: v.snippet.thumbnails?.maxres?.url || v.snippet.thumbnails?.high?.url || '',
        publishedAt: v.snippet.publishedAt,
        duration: v.contentDetails.duration,
        durationFormatted: formatDuration(v.contentDetails.duration),
        youtubeUrl: `https://www.youtube.com/watch?v=${v.id}`
      };

      const filePath = path.join(BLOG_DIR, `${episode.slug}.json`);
      console.log(`  ✍️  [${i+1}/${missingVideoIds.length}] Ep ${epNum}: ${episode.title.substring(0, 70)}`);

      try {
        const blogData = await generateBlogPost(episode);

        const post = {
          slug: episode.slug,
          title: blogData.title || episode.title,
          episodeNumber: epNum, // Use authoritative episode number
          guestName: blogData.guestName || '',
          guestBio: blogData.guestBio || '',
          publishedAt: episode.publishedAt,
          duration: episode.durationFormatted,
          thumbnail: episode.thumbnail,
          youtubeUrl: episode.youtubeUrl,
          spotifyUrl: 'https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ',
          appleUrl: 'https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475',
          excerpt: blogData.excerpt || '',
          metaDescription: blogData.metaDescription || '',
          topics: blogData.topics || [],
          keyTakeaways: blogData.keyTakeaways || [],
          guestLinks: blogData.guestLinks || [],
          pullQuotes: blogData.pullQuotes || [],
          timestamps: blogData.timestamps || [],
          content: blogData.content || ''
        };

        fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
        generated++;
        console.log(`     ✅ Saved: ${episode.slug}.json`);

        if (i < missingVideoIds.length - 1) await sleep(3000);
      } catch (err) {
        console.error(`     ❌ Failed: ${err.message}`);
      }
    }

    console.log(`\nGenerated ${generated} new blog posts.\n`);
  }

  // ── STEP 3: Rebuild posts.json index ──
  console.log('═══ STEP 3: Rebuild posts.json index ═══\n');

  const allFiles = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  const allPosts = [];

  for (const file of allFiles) {
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

  allPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  fs.writeFileSync(path.join(BLOG_DIR, 'posts.json'), JSON.stringify({ posts: allPosts }, null, 2));

  console.log(`Total: ${allPosts.length} posts in index (sorted by date descending)`);
  console.log(`\n🎉 Done! Fixed ${fixedCount} episode numbers, backfilled ${missingVideoIds.length} missing episodes.`);
}

main().catch(console.error);
