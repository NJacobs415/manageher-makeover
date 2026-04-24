/**
 * Backfill transcripts for existing blog posts.
 *
 * Uses the youtube-transcript npm package to scrape YouTube's built-in
 * captions for free (no API key needed).
 *
 * Usage:
 *   node scripts/backfill-transcripts.mjs                  # dry-run, prints stats
 *   node scripts/backfill-transcripts.mjs --write           # fetch raw + write
 *   node scripts/backfill-transcripts.mjs --write --format  # fetch, format via Claude, write
 *
 * --format requires ANTHROPIC_API_KEY env var. Uses claude-sonnet-4 to add
 * speaker labels, paragraphs, and clean up filler words.
 *
 * Skips posts that already have a non-empty transcript field (unless --format
 * is passed, in which case it re-formats existing raw transcripts too).
 * Waits 2s between YouTube fetches, 5s between Claude API calls.
 */

import fs from 'fs';
import path from 'path';
import { YoutubeTranscript } from 'youtube-transcript/dist/youtube-transcript.esm.js';

const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const WRITE = process.argv.includes('--write');
const FORMAT = process.argv.includes('--format');
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-sonnet-4-20250514';
const FETCH_DELAY_MS = 2000;
const FORMAT_DELAY_MS = 5000;

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

async function formatTranscript(rawTranscript, guestName) {
  const guestFirst = guestName ? guestName.replace(/^(Dr\.|Mrs?\.|Ms\.|Prof\.|Rev\.)\s*/i, '').split(' ')[0] : 'Guest';
  // Truncate to fit Claude context — keep first 60k chars of raw transcript
  const truncated = rawTranscript.length > 60000
    ? rawTranscript.substring(0, 60000) + '\n\n[transcript truncated for formatting]'
    : rawTranscript;

  const prompt = `Format this podcast transcript for readability. The podcast is The Manage Her® hosted by Aimee Rickabus. The guest is ${guestName || 'unknown'}.

Rules:
- Add speaker labels using Aimee and ${guestFirst}
- Break into natural paragraphs every 3-5 sentences or at topic changes
- Clean up filler words (um, uh, like, you know) but keep conversational tone
- Fix obvious transcription errors
- Do NOT add timestamps
- Do NOT add content that wasn't in the original
- Return ONLY the formatted transcript, no preamble

Raw transcript:
${truncated}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

async function main() {
  if (FORMAT && !ANTHROPIC_API_KEY) {
    console.error('--format requires ANTHROPIC_API_KEY env var');
    process.exit(1);
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'posts.json')
    .sort();

  const mode = FORMAT ? 'WRITE + FORMAT' : WRITE ? 'WRITE' : 'DRY RUN';
  console.log(`Found ${files.length} blog posts. Mode: ${mode}\n`);

  let fetched = 0;
  let formatted = 0;
  let skipped = 0;
  let failed = 0;
  let noVideo = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(BLOG_DIR, file);
    const post = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // In format mode, re-process everything. In non-format mode, skip existing.
    if (!FORMAT && post.transcript && post.transcript.length > 100) {
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
      // If we already have a raw transcript and just need to format, use existing
      let rawTranscript = post.transcript && post.transcript.length > 100
        ? post.transcript
        : await fetchTranscript(videoId);

      if (!rawTranscript) {
        failed++;
        console.log(`  ❌ no transcript available`);
        if (i < files.length - 1) await sleep(FETCH_DELAY_MS);
        continue;
      }

      const trimmed = rawTranscript.length > 80000
        ? rawTranscript.substring(0, 80000) + '... [truncated]'
        : rawTranscript;

      fetched++;
      console.log(`  ✅ raw: ${trimmed.length} chars`);

      let finalTranscript = trimmed;

      if (FORMAT) {
        try {
          console.log(`  🔄 formatting via Claude…`);
          finalTranscript = await formatTranscript(trimmed, post.guestName);
          formatted++;
          console.log(`  ✅ formatted: ${finalTranscript.length} chars`);
        } catch (e) {
          console.error(`  ⚠️  format failed, keeping raw: ${e.message.slice(0, 150)}`);
        }
      }

      if (WRITE || FORMAT) {
        post.transcript = finalTranscript;
        fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
        console.log(`  💾 written`);
      }
    } catch (e) {
      failed++;
      console.error(`  ❌ ${e.message.slice(0, 150)}`);
    }

    const delay = FORMAT ? FORMAT_DELAY_MS : FETCH_DELAY_MS;
    if (i < files.length - 1) await sleep(delay);
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Fetched: ${fetched}`);
  if (FORMAT) console.log(`  Formatted: ${formatted}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  No video ID: ${noVideo}`);
  console.log(`  Total: ${files.length}`);
  if (!WRITE && !FORMAT && fetched > 0) {
    console.log(`\n⚠️  Dry run — no files changed. Re-run with --write to save.`);
  }
}

main();
