import fs from 'fs';
import path from 'path';

const TOKEN = process.env.YT_TRANSCRIPT_TOKEN;
if (!TOKEN) { console.error('Set YT_TRANSCRIPT_TOKEN'); process.exit(1); }
const BLOG_DIR = 'public/blog';
const DRY = process.argv.includes('--dry');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function extractTranscript(node, parts = []) {
  if (node == null) return parts;
  if (Array.isArray(node)) { node.forEach(n => extractTranscript(n, parts)); return parts; }
  if (typeof node === 'object') {
    if (typeof node.text === 'string') parts.push(node.text);
    else if (typeof node.snippet === 'string') parts.push(node.snippet);
    for (const k in node) if (node[k] && typeof node[k] === 'object') extractTranscript(node[k], parts);
  }
  return parts;
}

const index = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, 'posts.json'), 'utf8'));
const targets = [];
for (const entry of index.posts) {
  const file = path.join(BLOG_DIR, entry.slug + '.json');
  if (!fs.existsSync(file)) continue;
  const post = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!post.transcript || post.transcript.trim().length < 200) {
    const m = (post.youtubeUrl || '').match(/[?&]v=([\w-]{11})/);
    if (m) targets.push({ file, post, videoId: m[1], ep: post.episodeNumber });
  }
}
console.log('Missing transcript:', targets.map(t => `EP ${t.ep} (${t.videoId})`).join(', ') || 'none');
if (DRY) process.exit(0);

for (const t of targets) {
  const res = await fetch('https://www.youtube-transcript.io/api/transcripts', {
    method: 'POST',
    headers: { 'Authorization': `Basic ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: [t.videoId] })
  });
  if (!res.ok) { console.error(`EP ${t.ep}: HTTP ${res.status} — skipping`); await sleep(2500); continue; }
  const transcript = extractTranscript(await res.json()).join(' ').replace(/\s+/g, ' ').trim();
  if (transcript.length < 200) { console.error(`EP ${t.ep}: only ${transcript.length} chars — skipping`); await sleep(2500); continue; }
  t.post.transcript = transcript;
  fs.writeFileSync(t.file, JSON.stringify(t.post, null, 2));
  console.log(`EP ${t.ep}: wrote ${transcript.length} chars`);
  await sleep(2500);
}
