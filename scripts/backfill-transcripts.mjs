/**
 * Backfill transcripts for existing blog posts.
 *
 * Uses the youtube-transcript npm package to scrape YouTube's built-in
 * captions for free (no API key needed).
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
import { YoutubeTranscript } from 'youtube-transcript/dist/youtube-transcript.esm.js';

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
  const items = await YoutubeTranscript.fetchTranscript(videoId);
  if (!items || items.length === 0) return null;
  return items.map((i) => i.text).join(' ').replace(/\s+/g, ' ').trim();
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
        const trimmed =
          transcript.length > 80000
            ? transcript.substring(0, 80000) + '... [truncated]'
            : transcript;
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
    console.log(
      `\n⚠️  Dry run — no files changed. Re-run with --write to save transcripts.`
    );
  }
}

main();
