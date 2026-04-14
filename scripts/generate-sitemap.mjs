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
    urls.push(`  <url>\n    <loc>${SITE_URL}${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`);
  }

  for (const post of posts) {
    urls.push(`  <url>\n    <loc>${SITE_URL}/blog/${xmlEscape(post.slug)}</loc>\n    <lastmod>${toDate(post.publishedAt)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  fs.writeFileSync(OUT, xml);
  console.log(`Wrote ${OUT} with ${STATIC_PAGES.length} static + ${posts.length} post URLs (${STATIC_PAGES.length + posts.length} total)`);
}

main();
