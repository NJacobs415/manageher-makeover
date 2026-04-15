import fs from 'fs';
import path from 'path';

const DRAFTS_DIR = path.join(process.cwd(), 'public/substack-drafts');
const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const OUTPUT = path.join(process.cwd(), 'scripts/substack-import.xml');

function cdata(s) {
  // CDATA sections must not contain ']]>' — split and re-open
  return `<![CDATA[${String(s ?? '').replace(/\]\]>/g, ']]]]><![CDATA[>')}]]>`;
}

function formatPostDate(iso) {
  const d = iso ? new Date(iso) : new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

function extractBetween(html, startRe, endRe) {
  const start = html.search(startRe);
  if (start === -1) return null;
  const tail = html.slice(start).replace(startRe, '');
  const end = tail.search(endRe);
  if (end === -1) return null;
  return tail.slice(0, end);
}

function parseDraft(html) {
  const titleMatch = html.match(/<!--\s*SUBSTACK TITLE:\s*([\s\S]*?)\s*-->/);
  const subtitleMatch = html.match(/<!--\s*SUBSTACK SUBTITLE:\s*([\s\S]*?)\s*-->/);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return null;
  let body = bodyMatch[1];
  // Strip the SUBSTACK title/subtitle comment lines from the body
  body = body.replace(/<!--\s*SUBSTACK (?:TITLE|SUBTITLE):[\s\S]*?-->\s*/g, '');
  body = body.trim();
  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    subtitle: subtitleMatch ? subtitleMatch[1].trim() : '',
    body,
  };
}

function main() {
  const files = fs
    .readdirSync(DRAFTS_DIR)
    .filter((f) => f.endsWith('.html'))
    .sort();

  const posts = [];
  for (const file of files) {
    const slug = file.replace(/\.html$/, '');
    const html = fs.readFileSync(path.join(DRAFTS_DIR, file), 'utf-8');
    const parsed = parseDraft(html);
    if (!parsed) {
      console.warn(`  ⚠️  could not parse body: ${file}`);
      continue;
    }
    const blogPath = path.join(BLOG_DIR, `${slug}.json`);
    let publishedAt = null;
    if (fs.existsSync(blogPath)) {
      try {
        publishedAt = JSON.parse(fs.readFileSync(blogPath, 'utf-8')).publishedAt || null;
      } catch {}
    }
    posts.push({ slug, publishedAt, ...parsed });
  }

  // Oldest first
  posts.sort((a, b) => {
    const da = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const db = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return da - db;
  });

  const items = posts.map((p) => `    <item>
      <title>${cdata(p.title)}</title>
      <description>${cdata(p.subtitle)}</description>
      <content:encoded>${cdata(p.body)}</content:encoded>
      <wp:post_date>${formatPostDate(p.publishedAt)}</wp:post_date>
      <wp:status>draft</wp:status>
      <wp:post_type>post</wp:post_type>
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wp="http://wordpress.org/export/1.2/">
  <channel>
    <title>The Manage Her</title>
    <link>https://themanageher.com</link>
    <wp:wxr_version>1.2</wp:wxr_version>

${items}

  </channel>
</rss>
`;

  fs.writeFileSync(OUTPUT, xml);
  console.log(`Generated WXR import with ${posts.length} posts`);
  console.log(`→ ${OUTPUT}`);
}

main();
