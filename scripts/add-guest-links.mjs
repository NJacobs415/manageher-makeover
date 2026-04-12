import fs from 'fs';
import path from 'path';

const YT_API_KEY = 'AIzaSyB-Rmqu5gDjguyh-nqy1nXiiAPzVt_FCAA';
const BLOG_DIR = path.join(process.cwd(), 'public/blog');

// Links to filter out (The Manage Her's own + generic podcast links)
const FILTER_PATTERNS = [
  'themanageher.com',
  'youtube.com/@TheManageHer',
  'youtube.com/channel/',
  'instagram.com/themanageher',
  'tiktok.com/@themanageher',
  'linkedin.com/company/themanageher',
  'podcasts.apple.com/us/podcast/the-manage-her',
  'open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ',
  'music.amazon.com/podcasts/91c217a5',
  'buzzsprout.com',
  'fan.mail',
  'fanmail',
  'podcasters.spotify.com',
  'a.co/d/by5X0fV',
];

function shouldFilter(url) {
  const lower = url.toLowerCase();
  return FILTER_PATTERNS.some(p => lower.includes(p.toLowerCase()));
}

function extractLinksFromDescription(desc) {
  if (!desc) return [];
  const links = [];
  const lines = desc.split('\n');

  for (const line of lines) {
    // Match URLs in the line
    const urlMatch = line.match(/(https?:\/\/[^\s)\]>]+)/);
    if (!urlMatch) continue;

    const url = urlMatch[1].replace(/[.,;:!?]+$/, ''); // trim trailing punctuation
    if (shouldFilter(url)) continue;

    // Extract label from text before the URL
    const beforeUrl = line.substring(0, line.indexOf(urlMatch[1])).trim();
    let label = beforeUrl.replace(/[:：\-–—•·▸►→|]+$/, '').trim();

    // If no label, infer from URL
    if (!label) {
      if (url.includes('instagram.com')) label = 'Instagram';
      else if (url.includes('linkedin.com')) label = 'LinkedIn';
      else if (url.includes('tiktok.com')) label = 'TikTok';
      else if (url.includes('twitter.com') || url.includes('x.com')) label = 'X (Twitter)';
      else if (url.includes('facebook.com')) label = 'Facebook';
      else if (url.includes('youtube.com') || url.includes('youtu.be')) label = 'YouTube';
      else if (url.includes('pinterest.com')) label = 'Pinterest';
      else label = 'Website';
    }

    // Clean up common label prefixes
    label = label.replace(/^(follow|connect|find|visit|check out)\s+(me\s+)?(on\s+)?/i, '').trim();
    if (!label) label = 'Website';

    // Capitalize first letter
    label = label.charAt(0).toUpperCase() + label.slice(1);

    links.push({ label, url });
  }

  return links;
}

async function getVideoDescriptions(videoIds) {
  const results = {};
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${YT_API_KEY}&id=${batch.join(',')}&part=snippet`;
    const res = await fetch(url);
    const data = await res.json();
    for (const item of (data.items || [])) {
      results[item.id] = item.snippet.description || '';
    }
  }
  return results;
}

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  console.log(`Found ${files.length} blog posts\n`);

  // Collect all video IDs
  const postsByVideoId = {};
  for (const file of files) {
    const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'));
    const videoId = (post.youtubeUrl || '').match(/[?&]v=([^&]+)/)?.[1];
    if (videoId) {
      postsByVideoId[videoId] = { file, post };
    }
  }

  const videoIds = Object.keys(postsByVideoId);
  console.log(`Fetching descriptions for ${videoIds.length} videos...`);
  const descriptions = await getVideoDescriptions(videoIds);

  let updated = 0;
  let withLinks = 0;

  for (const [videoId, { file, post }] of Object.entries(postsByVideoId)) {
    const desc = descriptions[videoId];
    const links = extractLinksFromDescription(desc);

    post.guestLinks = links;
    fs.writeFileSync(path.join(BLOG_DIR, file), JSON.stringify(post, null, 2));

    if (links.length > 0) {
      withLinks++;
      console.log(`  ${post.slug}: ${links.length} links → ${links.map(l => l.label).join(', ')}`);
    }
    updated++;
  }

  console.log(`\n✅ Updated ${updated} posts. ${withLinks} posts have guest links.`);
}

main().catch(console.error);
