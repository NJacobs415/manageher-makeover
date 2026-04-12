import fs from 'fs';
import path from 'path';

const YT_API_KEY = 'AIzaSyB-Rmqu5gDjguyh-nqy1nXiiAPzVt_FCAA';
const CHANNEL_ID = 'UCh_rcAX1A5l1fJFalHXqtKQ';
const BLOG_DIR = path.join(process.cwd(), 'public/blog');

function getDurationSeconds(iso) {
  const match = (iso || '').match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (parseInt(match[1]||0) * 3600) + (parseInt(match[2]||0) * 60) + parseInt(match[3]||0);
}

function extractEpNumber(text) {
  const match = (text || '').match(/[Ee]p(?:isode)?\.?\s*(\d+)/);
  return match ? parseInt(match[1]) : null;
}

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
  } while (nextPageToken);
  return videoIds;
}

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

async function main() {
  console.log('🔍 Fetching all video IDs from channel...');
  const allIds = await getAllVideoIds();
  console.log(`Found ${allIds.length} total videos`);

  console.log('📋 Getting video details...');
  const allVideos = await getVideoDetails(allIds);

  // Filter to real video episodes (not RSS/audio, 20+ min)
  const videoEpisodes = allVideos.filter(v => {
    const desc = v.snippet.description || '';
    if (desc.includes('buzzsprout.com')) return false;
    if (desc.startsWith('Send us Fan Mail')) return false;
    if (getDurationSeconds(v.contentDetails.duration) < 1200) return false;
    return true;
  });

  // Deduplicate by episode number
  const seen = new Map();
  for (const ep of videoEpisodes) {
    const epNum = (ep.snippet.title.match(/[Ee]p\.?\s*(\d+)/)||[])[1] || ep.id;
    if (!seen.has(epNum)) {
      seen.set(epNum, ep);
    } else {
      const existing = seen.get(epNum);
      if ((existing.snippet.description||'').includes('buzzsprout') && !(ep.snippet.description||'').includes('buzzsprout')) {
        seen.set(epNum, ep);
      }
    }
  }
  const dedupedVideos = [...seen.values()];

  // Sort by publishedAt ascending (oldest first) for positional numbering
  dedupedVideos.sort((a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt));
  console.log(`Found ${dedupedVideos.length} real video episodes (sorted oldest→newest)`);

  // Build videoId → episode number mapping
  const videoIdToEpNum = new Map();
  let positionalCounter = 0;

  for (const v of dedupedVideos) {
    positionalCounter++;
    const title = v.snippet.title || '';
    const desc = v.snippet.description || '';

    // Try extracting from title first, then description
    let epNum = extractEpNumber(title) || extractEpNumber(desc);

    // Fallback: use chronological position
    if (!epNum) {
      epNum = positionalCounter;
      console.log(`  ⚠️  No ep number found for "${title.substring(0, 60)}..." → using position ${positionalCounter}`);
    }

    videoIdToEpNum.set(v.id, epNum);
  }

  console.log(`\nEpisode number mapping (${videoIdToEpNum.size} videos):`);
  for (const v of dedupedVideos) {
    const epNum = videoIdToEpNum.get(v.id);
    console.log(`  Ep ${String(epNum).padStart(3)} → ${v.snippet.title.substring(0, 70)}`);
  }

  // Read all blog post files
  console.log('\n📝 Updating blog post episode numbers...');
  const files = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  let fixed = 0;
  const blogVideoIds = new Set();

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    try {
      const post = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const ytUrl = post.youtubeUrl || '';
      const videoId = (ytUrl.match(/[?&]v=([^&]+)/) || [])[1];

      if (!videoId) {
        console.log(`  ⚠️  No videoId in ${file}`);
        continue;
      }

      blogVideoIds.add(videoId);
      const correctEpNum = videoIdToEpNum.get(videoId);

      if (correctEpNum && post.episodeNumber !== correctEpNum) {
        console.log(`  Fixed: ${post.slug} from Ep ${post.episodeNumber} → Ep ${correctEpNum}`);
        post.episodeNumber = correctEpNum;
        fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
        fixed++;
      }
    } catch (e) {
      console.error(`  Skipping malformed: ${file}`);
    }
  }

  console.log(`\nFixed ${fixed} episode numbers`);

  // Find missing episodes (on YouTube but no blog post)
  const missingEpisodes = [];
  for (const v of dedupedVideos) {
    if (!blogVideoIds.has(v.id)) {
      const epNum = videoIdToEpNum.get(v.id);
      missingEpisodes.push({ epNum, title: v.snippet.title, videoId: v.id });
    }
  }

  if (missingEpisodes.length > 0) {
    missingEpisodes.sort((a, b) => a.epNum - b.epNum);
    console.log(`\n⚠️  Missing episodes that need backfill (${missingEpisodes.length}):`);
    for (const m of missingEpisodes) {
      console.log(`  Ep ${m.epNum}: ${m.title}`);
      console.log(`    https://www.youtube.com/watch?v=${m.videoId}`);
    }
    console.log(`\nMissing episode numbers: ${missingEpisodes.map(m => m.epNum).join(', ')}`);
  } else {
    console.log('\n✅ No missing episodes — all video episodes have blog posts!');
  }

  // Rebuild posts.json index
  console.log('\n📝 Rebuilding posts.json index...');
  const remaining = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  const allPosts = [];

  for (const file of remaining) {
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

  console.log(`\n🎉 Done! Fixed ${fixed} episode numbers. ${allPosts.length} posts in index. ${missingEpisodes.length} missing.`);
}

main().catch(console.error);
