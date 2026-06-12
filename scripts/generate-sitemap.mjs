import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://themanageher.com';
const POSTS_JSON = path.join(process.cwd(), 'public/blog/posts.json');
const OUT = path.join(process.cwd(), 'public/sitemap.xml');

const STATIC_PAGES = [
  { loc: '/',        priority: '1.0', changefreq: 'weekly'  },
  { loc: '/about',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/podcast', priority: '0.8', changefreq: 'weekly'  },
  { loc: '/book',    priority: '0.8', changefreq: 'monthly' },
  { loc: '/blog',    priority: '0.9', changefreq: 'weekly'  },
  { loc: '/press',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/links',   priority: '0.5', changefreq: 'monthly' },
  { loc: '/legal',   priority: '0.3', changefreq: 'yearly'  },
];

function xmlEscape(s) {
  return String(s).replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

function toDate(iso) {
  if (!iso) return new Date().toISOString().slice(0, 10);
  return new Date(iso).toISOString().slice(0, 10);
}

function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_JSON, 'utf-8')).posts || [];
  const today = new Date().toISOString().slice(0, 10);

  const urls = [];

  for (const p of STATIC_PAGES) {
    // CF Pages 308s no-slash → trailing slash for directory routes; keep
    // sitemap URLs aligned with the served URL + canonical.
    const loc = p.loc === '/' ? '/' : `${p.loc}/`;
    urls.push(`  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`);
  }

  for (const post of posts) {
    urls.push(`  <url>\n    <loc>${SITE_URL}/blog/${xmlEscape(post.slug)}/</loc>\n    <lastmod>${toDate(post.publishedAt)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`);
  }

  // Topic category pages: only emit for topics with ≥2 posts so we don't
  // burn crawl budget on long-tail singletons.
  const topicTally = new Map();
  for (const p of posts) for (const t of p.topics || []) topicTally.set(t, (topicTally.get(t) || 0) + 1);
  const topicSlug = (s) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  let topicCount = 0;
  for (const [topic, count] of topicTally) {
    if (count < 2) continue;
    urls.push(`  <url>\n    <loc>${SITE_URL}/blog/topic/${topicSlug(topic)}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
    topicCount++;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  fs.writeFileSync(OUT, xml);
  console.log(`Wrote ${OUT} with ${STATIC_PAGES.length} static + ${posts.length} posts + ${topicCount} topics (${STATIC_PAGES.length + posts.length + topicCount} total)`);
}

main();
