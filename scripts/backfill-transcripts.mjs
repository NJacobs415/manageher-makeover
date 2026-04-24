/**
 * Backfill transcripts for existing blog posts.
 *
 * Fetches YouTube transcripts via the free SearchAPI transcript endpoint
 * (same one the n8n pipeline uses) and writes them into each blog post JSON.
 *
 * Usage:
 *   node scripts/backfill-transcripts.mjs            # dry-run, prints stats
 *   node scripts/backfill-transcripts.mjs --write     # actually writes to files
 *
 * Skips posts that already have a non-empty transcript field.
 * Waits 2 seconds between requests to avoid rate limits.
 */

import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const WRITE = process.argv.includes('--write');
const DELAY_MS = 2000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getVideoId(url) {
  if (!url) return null;
  const m = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

async function fetchTranscript(videoId) {
  // Use the free SearchAPI transcript endpoint (same as n8n "Fetch Transcript" node)
  const url = `https://www.searchapi.io/api/v1/search?engine=youtube_transcripts&video_id=${videoId}`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  let text = '';

  if (data.transcripts) {
    text = data.transcripts.map((t) => t.text || t.snippet || '').join(' ');
  } else if (data.transcript) {
    if (Array.isArray(data.transcript)) {
      text = data.transcript.map((t) => t.text || t.snippet || '').join(' ');
    } else {
      text = data.transcript;
    }
  } else if (Array.isArray(data)) {
    text = data.map((t) => t.text || t.snippet || '').join(' ');
  }

  return text.replace(/\s+/g, ' ').trim() || null;
}

async function main() {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'posts.json')
    .sort();

  console.log(`Found ${files.length} blog posts. Mode: ${WRITE ? 'WRITE' : 'DRY RUN'}\n`);

  let fetched = 0;
  let skipped = 0;
  let failed = 0;
  let noVideo = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(BLOG_DIR, file);
    const post = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Skip if transcript already present
    if (post.transcript && post.transcript.length > 100) {
      skipped++;
      console.log(`[${i + 1}/${files.length}] Ep ${post.episodeNumber}: ⏭️  already has transcript (${post.transcript.length} chars)`);
      continue;
    }

    const videoId = getVideoId(post.youtubeUrl);
    if (!videoId) {
      noVideo++;
      console.log(`[${i + 1}/${files.length}] Ep ${post.episodeNumber}: ⚠️  no YouTube video ID`);
      continue;
    }

    console.log(`[${i + 1}/${files.length}] Ep ${post.episodeNumber}: fetching transcript for ${videoId}…`);

    try {
      const transcript = await fetchTranscript(videoId);
      if (!transcript) {
        failed++;
        console.log(`  ❌ no transcript available`);
      } else {
        fetched++;
        const trimmed = transcript.length > 80000 ? transcript.substring(0, 80000) + '... [truncated]' : transcript;
        console.log(`  ✅ ${trimmed.length} chars`);

        if (WRITE) {
          post.transcript = trimmed;
          fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
          console.log(`  💾 written`);
        }
      }
    } catch (e) {
      failed++;
      console.error(`  ❌ ${e.message.slice(0, 150)}`);
    }

    if (i < files.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Fetched: ${fetched}`);
  console.log(`  Skipped (already have transcript): ${skipped}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  No video ID: ${noVideo}`);
  console.log(`  Total: ${files.length}`);
  if (!WRITE && fetched > 0) {
    console.log(`\n⚠️  Dry run — no files changed. Re-run with --write to save transcripts.`);
  }
}

main();
