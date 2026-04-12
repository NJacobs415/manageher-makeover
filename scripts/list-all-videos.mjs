import fs from 'fs';

const YT_API_KEY = 'AIzaSyB-Rmqu5gDjguyh-nqy1nXiiAPzVt_FCAA';
const CHANNEL_ID = 'UCh_rcAX1A5l1fJFalHXqtKQ';

function getDurationSeconds(iso) {
  const match = (iso || '').match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (parseInt(match[1]||0) * 3600) + (parseInt(match[2]||0) * 60) + parseInt(match[3]||0);
}

function formatDuration(iso) {
  const match = (iso || '').match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '?? min';
  const h = parseInt(match[1]||0);
  const m = parseInt(match[2]||0);
  if (h > 0) return `${h}h ${String(m).padStart(2,'0')}m`;
  return `${m} min`;
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
  console.log('Fetching all video IDs...');
  const allIds = await getAllVideoIds();
  console.log(`Found ${allIds.length} total videos`);

  console.log('Getting video details...');
  const allVideos = await getVideoDetails(allIds);

  // Filter: 20+ min, no buzzsprout
  const episodes = allVideos.filter(v => {
    const desc = v.snippet.description || '';
    if (desc.includes('buzzsprout.com')) return false;
    if (desc.startsWith('Send us Fan Mail')) return false;
    if (getDurationSeconds(v.contentDetails.duration) < 1200) return false;
    return true;
  });

  // Sort oldest first
  episodes.sort((a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt));

  console.log(`\n${episodes.length} full video episodes (20+ min, no RSS audio):\n`);

  const lines = [];
  const header = `${'#'.padStart(4)}  | ${'Date'.padEnd(10)} | ${'Dur'.padEnd(6)} | ${'Video ID'.padEnd(11)} | Title`;
  lines.push(header);
  lines.push('-'.repeat(header.length + 40));

  for (let i = 0; i < episodes.length; i++) {
    const v = episodes[i];
    const date = v.snippet.publishedAt.substring(0, 10);
    const dur = formatDuration(v.contentDetails.duration).padEnd(6);
    const line = `#${String(i + 1).padStart(3)}  | ${date} | ${dur} | ${v.id} | ${v.snippet.title}`;
    lines.push(line);
  }

  const output = lines.join('\n');
  console.log(output);

  fs.writeFileSync('scripts/episode-list.txt', output + '\n');
  console.log(`\nSaved to scripts/episode-list.txt`);
}

main().catch(console.error);
