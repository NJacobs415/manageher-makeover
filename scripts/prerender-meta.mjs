/**
 * Post-build SEO meta injection for static crawler compatibility.
 *
 * Reads dist/index.html (the SPA shell) and creates route-specific copies
 * with page-specific <title>, <meta description>, Open Graph tags,
 * Twitter Card tags, canonical URL, and JSON-LD structured data.
 *
 * Run automatically via the "postbuild" npm script after `vite build`.
 *
 * ⚠️ Keep in sync with src/components/SEO.tsx and the <SEO> props in each
 *    page component. If you change a page's title/description in the React
 *    component, update the matching entry here.
 */

import fs from 'fs';
import path from 'path';

const DIST = path.join(process.cwd(), 'dist');
const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const SITE_URL = 'https://themanageher.com';
const DEFAULT_IMAGE = `${SITE_URL}/M_Logo_Pink.png`;

// ─── Static page metadata ───────────────────────────────────────
// Keep in sync with src/components/SEO.tsx defaults and the <SEO>
// props in each page component (src/pages/*.tsx).

const STATIC_ROUTES = [
  {
    path: '/',
    title: 'The Manage Her® — Redefining Women\'s Leadership',
    description: 'Leadership movement for women — redefining how women lead in life, at home, and in business. Founded by Aimee Rickabus.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'The Manage Her',
      url: SITE_URL,
      logo: `${SITE_URL}/M_Logo_Pink.png`,
      founder: { '@type': 'Person', name: 'Aimee Rickabus' },
      sameAs: [
        'https://www.instagram.com/themanageher/',
        'https://www.youtube.com/@TheManageHer',
        'https://www.tiktok.com/@themanageher',
        'https://www.linkedin.com/company/themanageher',
      ],
    },
  },
  {
    path: '/about',
    title: 'About Aimee Rickabus | The Manage Her®',
    description: 'CEO of a nine-figure tech company, bestselling author, podcast host, and mother of six.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Aimee Rickabus',
      jobTitle: 'CEO & Founder',
      worksFor: { '@type': 'Organization', name: 'The Manage Her' },
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/aimee-portrait-1.jpg`,
      sameAs: [
        'https://www.instagram.com/themanageher/',
        'https://www.youtube.com/@TheManageHer',
        'https://www.tiktok.com/@themanageher',
        'https://www.linkedin.com/company/themanageher',
      ],
      description: 'CEO of a nine-figure technology company, bestselling author, podcast host, and mother of six. Founder of The Manage Her — a leadership movement redefining how women lead.',
    },
  },
  {
    path: '/podcast',
    title: 'The Manage Her® Podcast',
    description: 'Real conversations on leadership, motherhood, financial literacy & purpose. New episodes every Monday.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'PodcastSeries',
      name: 'The Manage Her Podcast',
      url: `${SITE_URL}/podcast`,
      author: { '@type': 'Person', name: 'Aimee Rickabus' },
    },
  },
  {
    path: '/book',
    title: 'The Manage Her® Book',
    description: 'Unveiling Invisible Labor & Sparking a Leadership Revolution by Aimee Rickabus.',
    image: 'https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a714ae8e39698a8fbfa2bb.png',
    type: 'book',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'The Manage Her: Unveiling Invisible Labor & Sparking a Leadership Revolution',
      author: { '@type': 'Person', name: 'Aimee Rickabus' },
      url: 'https://a.co/d/by5X0fV',
      image: 'https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a714ae8e39698a8fbfa2bb.png',
    },
  },
  {
    path: '/press',
    title: 'Press & Speaking | The Manage Her®',
    description: 'Book Aimee Rickabus to speak. Keynotes on women\'s leadership, invisible labor, and financial confidence.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Aimee Rickabus',
      jobTitle: 'CEO & Founder',
      worksFor: { '@type': 'Organization', name: 'The Manage Her' },
      url: `${SITE_URL}/press`,
      image: `${SITE_URL}/aimee-portrait-1.jpg`,
      sameAs: [
        'https://www.instagram.com/themanageher/',
        'https://www.youtube.com/@TheManageHer',
        'https://www.tiktok.com/@themanageher',
        'https://www.linkedin.com/company/themanageher',
      ],
      knowsAbout: ['Women\'s Leadership', 'Invisible Labor', 'Financial Literacy', 'Entrepreneurship', 'Motherhood'],
      description: 'CEO of a nine-figure technology company, bestselling author, podcast host, and mother of six. Founder of The Manage Her — a leadership movement redefining how women lead.',
    },
  },
  {
    path: '/blog',
    title: 'Blog | The Manage Her®',
    description: 'Key takeaways, quotes, and insights from every episode of The Manage Her® Podcast.',
  },
  {
    path: '/links',
    title: 'Links | The Manage Her®',
    description: 'All the links for The Manage Her® — podcast, book, social media, and more.',
  },
  {
    path: '/legal',
    title: 'Privacy & Terms | The Manage Her®',
    description: 'Privacy policy and terms of service for The Manage Her®.',
    noindex: true,
  },
];

// ─── HTML injection helpers ─────────────────────────────────────

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function injectMeta(template, { title, description, url, image, type, jsonLd, noindex }) {
  let html = template;

  // Title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  // Meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // Canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeHtml(url)}" />`
  );

  // Open Graph
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,       `$1${escapeHtml(title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,  `$1${escapeHtml(description)}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/,        `$1${escapeHtml(image || DEFAULT_IMAGE)}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,          `$1${escapeHtml(url)}$2`);
  html = html.replace(/(<meta property="og:type" content=")[^"]*(")/,         `$1${escapeHtml(type || 'website')}$2`);

  // Twitter Card
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,       `$1${escapeHtml(title)}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,  `$1${escapeHtml(description)}$2`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/,        `$1${escapeHtml(image || DEFAULT_IMAGE)}$2`);

  // Noindex
  if (noindex) {
    html = html.replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>');
  }

  // JSON-LD — inject before </head>. Remove any existing JSON-LD first.
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
  if (jsonLd) {
    const ldTag = `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  `;
    html = html.replace('</head>', `${ldTag}</head>`);
  }

  return html;
}

// ─── Main ───────────────────────────────────────────────────────

function main() {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found — run vite build first');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  let count = 0;

  // Static routes
  for (const route of STATIC_ROUTES) {
    const url = `${SITE_URL}${route.path}`;
    const html = injectMeta(template, { ...route, url });

    if (route.path === '/') {
      // Overwrite dist/index.html with homepage-specific meta
      fs.writeFileSync(templatePath, html);
    } else {
      const dir = path.join(DIST, route.path);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
    }
    count++;
  }

  // Blog post routes
  const postsFile = path.join(BLOG_DIR, 'posts.json');
  if (fs.existsSync(postsFile)) {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8')).posts || [];

    for (const meta of posts) {
      const postFile = path.join(BLOG_DIR, `${meta.slug}.json`);
      if (!fs.existsSync(postFile)) continue;

      const post = JSON.parse(fs.readFileSync(postFile, 'utf-8'));
      const url = `${SITE_URL}/blog/${post.slug}`;

      const html = injectMeta(template, {
        title: `${post.title} | The Manage Her® Podcast`,
        description: post.metaDescription || post.excerpt || '',
        url,
        image: post.thumbnail || DEFAULT_IMAGE,
        type: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          image: post.thumbnail,
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: 'Aimee Rickabus',
            url: `${SITE_URL}/about`,
          },
          publisher: {
            '@type': 'Organization',
            name: 'The Manage Her',
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/M_Logo_Pink.png`,
            },
          },
          description: post.metaDescription || post.excerpt || '',
          mainEntityOfPage: url,
        },
      });

      const dir = path.join(DIST, 'blog', post.slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      count++;
    }
  }

  console.log(`Pre-rendered meta tags for ${count} routes`);
}

main();
