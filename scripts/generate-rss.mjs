/**
 * Generates a podcast-flavored RSS 2.0 feed at public/feed.xml from
 * public/blog/posts.json + per-episode blog JSONs.
 *
 * This is a show-notes feed, not the canonical audio RSS that hosts
 * Apple/Spotify — those are served by the podcast host (Buzzsprout /
 * Anchor / etc). This feed exists so readers can subscribe to new
 * episode show notes in any RSS reader, and so the iTunes/Atom
 * namespaces are wired for future audio enclosures if the host ever
 * stops serving its own.
 *
 * Run as a prebuild step alongside scripts/generate-sitemap.mjs.
 */

import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://themanageher.com';
const POSTS_JSON = path.join(process.cwd(), 'public/blog/posts.json');
const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const OUT = path.join(process.cwd(), 'public/feed.xml');

const FEED_TITLE = 'The Manage Her® — Episode Show Notes';
const FEED_DESC =
  'Show-notes companion feed for The Manage Her® Podcast. Each item links to the full episode page with transcript, key takeaways, and guest links. Subscribe in Apple Podcasts/Spotify for audio.';
const FEED_AUTHOR = 'Aimee Rickabus';
const FEED_IMAGE = `${SITE_URL}/M_Logo_Pink.png`;

function xmlEscape(s) {
  return String(s ?? '').replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]),
  );
}

function toRfc822(iso) {
  if (!iso) return new Date().toUTCString();
  return new Date(iso).toUTCString();
}

// "44 min" / "1h 5m" / "1h" → "HH:MM:SS" (itunes:duration)
function toItunesDuration(s) {
  if (!s || typeof s !== 'string') return undefined;
  const hours = s.match(/(\d+)\s*h/i);
  const mins = s.match(/(\d+)\s*(?:m|min)/i);
  if (!hours && !mins) return undefined;
  const h = hours ? parseInt(hours[1], 10) : 0;
  const m = mins ? parseInt(mins[1], 10) : 0;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;
}

function main() {
  const index = JSON.parse(fs.readFileSync(POSTS_JSON, 'utf-8')).posts || [];
  const items = [];

  // Sort newest-first by publishedAt so feed readers display in
  // expected chronological order regardless of posts.json ordering.
  const sorted = [...index].sort((a, b) => {
    const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return tb - ta;
  });

  for (const meta of sorted) {
    const file = path.join(BLOG_DIR, `${meta.slug}.json`);
    if (!fs.existsSync(file)) continue;
    const post = JSON.parse(fs.readFileSync(file, 'utf-8'));

    const url = `${SITE_URL}/blog/${post.slug}/`;
    const duration = toItunesDuration(post.duration);
    const summary = post.metaDescription || post.excerpt || '';

    items.push(
      `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <pubDate>${toRfc822(post.publishedAt)}</pubDate>
      <description>${xmlEscape(summary)}</description>
      <itunes:title>${xmlEscape(post.title)}</itunes:title>
      <itunes:summary>${xmlEscape(summary)}</itunes:summary>
      <itunes:author>${xmlEscape(FEED_AUTHOR)}</itunes:author>
      <itunes:explicit>false</itunes:explicit>
      ${typeof post.episodeNumber === 'number' ? `<itunes:episode>${post.episodeNumber}</itunes:episode>` : ''}
      ${duration ? `<itunes:duration>${duration}</itunes:duration>` : ''}
      ${post.thumbnail ? `<itunes:image href="${xmlEscape(post.thumbnail)}"/>` : ''}
    </item>`,
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${xmlEscape(FEED_TITLE)}</title>
    <link>${SITE_URL}/podcast/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${xmlEscape(FEED_DESC)}</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} The Manage Her®</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${FEED_IMAGE}</url>
      <title>${xmlEscape(FEED_TITLE)}</title>
      <link>${SITE_URL}/podcast/</link>
    </image>
    <managingEditor>${xmlEscape(FEED_AUTHOR)}</managingEditor>
${items.join('\n')}
  </channel>
</rss>
`;

  fs.writeFileSync(OUT, xml);
  console.log(`feed.xml written with ${items.length} episodes`);
}

main();
