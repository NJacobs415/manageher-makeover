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

// ─── Duration parsing ───────────────────────────────────────────
// Converts the human-readable `duration` field on posts ("44 min",
// "1h 5m", "1h", "59 min") to ISO 8601 (`PT44M`, `PT1H5M`).
// Returns `undefined` when nothing parseable is found so the schema
// field is omitted rather than emitting an invalid duration.
function toIsoDuration(s) {
  if (!s || typeof s !== 'string') return undefined;
  const hours = s.match(/(\d+)\s*h/i);
  const mins = s.match(/(\d+)\s*(?:m|min)/i);
  if (!hours && !mins) return undefined;
  let out = 'PT';
  if (hours) out += `${hours[1]}H`;
  if (mins) out += `${mins[1]}M`;
  return out;
}

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
      url: `${SITE_URL}/about/`,
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
      url: `${SITE_URL}/podcast/`,
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
      url: `${SITE_URL}/press/`,
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

// ─── Body prerender ─────────────────────────────────────────────
// Crawlers that don't run JS (and Google's first-pass indexer) saw an empty
// #root on every blog page. These helpers render a static, semantic version
// of the page into #root. React replaces it on mount.
//
// ⚠️ The wrapper MUST carry id="tmh-boot": the boot watchdog in index.html
//    treats that element's presence 8s after load as "app never mounted" and
//    fires boot_failure. Keeping the id preserves that alarm on these pages.
//
// Only classes BlogPost.tsx already uses are safe here — Tailwind scans src/,
// not scripts/, so anything else needs PRERENDER_CSS below.

// Mirror of src/lib/sanitizePostContent.ts (can't import TS from a build script).
function stripCdata(value) {
  let out = String(value || '').trim();
  if (out.startsWith('<![CDATA[')) out = out.slice('<![CDATA['.length);
  if (out.endsWith(']]>')) out = out.slice(0, -']]>'.length);
  return out.trim();
}

function safeHref(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim()) ? url.trim() : null;
}

function formatDate(iso, month = 'long') {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

// .prose-tmh mirrors proseCss in BlogPost.tsx; the rest styles the prerender
// shell itself (light cream article, matching the post's content section).
const PRERENDER_CSS = `
.tmh-pre{min-height:100vh;background:#faf8f5;color:#3a3a3a;font-family:'DM Sans',system-ui,sans-serif;padding:112px 24px 64px}
.tmh-pre-inner{max-width:900px;margin:0 auto}
.tmh-pre h1{font-family:'Playfair Display',Georgia,serif;color:#1a1a1a;font-weight:700;line-height:1.1;font-size:clamp(30px,5vw,48px);margin:0 0 16px}
.tmh-pre h2{font-family:'Playfair Display',Georgia,serif;color:#1a1a1a;font-weight:700;font-size:1.5rem;margin:2.5rem 0 1rem}
.tmh-pre a{color:#eb1887}
.tmh-pre-byline{font-size:13px;color:#888;margin:0 0 32px}
.tmh-pre-byline .tmh-pre-guest{color:#c9a96e}
.tmh-pre-takeaways{font-size:14px;line-height:1.7;padding-left:1.5rem;margin:0 0 2rem}
.tmh-pre-takeaways li{margin-bottom:.5rem}
.tmh-pre blockquote{margin:2.5rem 0;padding-left:1.5rem;border-left:3px solid #eb1887}
.tmh-pre blockquote p{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:1.25rem;line-height:1.4;color:#1a1a1a;margin:0}
.tmh-pre-guest-links{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:12px;font-size:13px}
.tmh-pre-list{list-style:none;padding:0;margin:0}
.tmh-pre-list li{padding:20px 0;border-bottom:1px solid rgba(0,0,0,.08)}
.tmh-pre-list h2{font-size:1.25rem;margin:0 0 6px}
.tmh-pre-list h2 a{color:#1a1a1a;text-decoration:none}
.tmh-pre-list p{margin:0;font-size:14px;line-height:1.7}
.tmh-pre-meta{font-size:12px;color:#888;margin-bottom:6px!important}
.prose-tmh h3{font-family:'Playfair Display',Georgia,serif;font-size:1.5rem;color:#1a1a1a;margin-top:2.5rem;margin-bottom:1rem;font-weight:700;line-height:1.25}
.prose-tmh p{font-family:'DM Sans',system-ui,sans-serif;font-size:15px;line-height:2;color:#3a3a3a;margin-bottom:1.5rem}
.prose-tmh strong{color:#1a1a1a;font-weight:600}
.prose-tmh em{color:#eb1887;font-style:italic}
.prose-tmh a{color:#eb1887;text-decoration:underline}
.prose-tmh ul,.prose-tmh ol{color:#3a3a3a;font-size:15px;line-height:2;margin-bottom:1.5rem;padding-left:1.5rem}
.prose-tmh li{margin-bottom:.5rem}
`;

function wrapPrerender(inner) {
  return `<article id="tmh-boot" class="tmh-pre"><style>${PRERENDER_CSS}</style><div class="tmh-pre-inner">${inner}</div></article>`;
}

// Fields: title, publishedAt, guestName, keyTakeaways, content, pullQuotes,
// guestBio, guestLinks, youtubeUrl. Quiz, transcript and the YouTube
// thumbnail are deliberately left out (interactive / bloat / JSON-LD only).
function renderPostArticle(post) {
  const parts = [];
  parts.push(`<h1>${escapeHtml(post.title || '')}</h1>`);

  const byline = ['Aimee Rickabus'];
  const date = formatDate(post.publishedAt);
  if (date) byline.push(`<time datetime="${escapeHtml(post.publishedAt)}">${date}</time>`);
  if (post.guestName) byline.push(`with <span class="tmh-pre-guest">${escapeHtml(post.guestName)}</span>`);
  parts.push(`<p class="tmh-pre-byline">${byline.join(' · ')}</p>`);

  const takeaways = (post.keyTakeaways || []).filter((t) => typeof t === 'string' && t.trim());
  if (takeaways.length > 0) {
    parts.push('<h2>Key <em>Takeaways</em></h2>');
    parts.push(`<ol class="tmh-pre-takeaways">${takeaways.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ol>`);
  }

  // Body HTML is trusted publisher output — React injects it verbatim too.
  // Newline after block closers so the source is line-diffable/greppable.
  const body = stripCdata(post.content).replace(/(<\/(?:p|h2|h3|ul|ol)>)(?!\n)/g, '$1\n');
  if (body) parts.push(`<div class="prose-tmh">${body}</div>`);

  for (const q of post.pullQuotes || []) {
    if (!q || typeof q.text !== 'string' || !q.text.trim()) continue;
    parts.push(`<blockquote><p class="tmh-speakable">"${escapeHtml(q.text)}"</p></blockquote>`);
  }

  if (post.guestBio || (post.guestLinks || []).length > 0) {
    parts.push('<section><h2>About the guest</h2>');
    if (post.guestName) parts.push(`<h3>${escapeHtml(post.guestName)}</h3>`);
    if (post.guestBio) parts.push(`<p>${escapeHtml(post.guestBio)}</p>`);
    const links = (post.guestLinks || [])
      .map((l) => ({ href: safeHref(l && l.url), label: String((l && l.label) || '').trim().replace(/\s*\($/, '').trim() }))
      .filter((l) => l.href && l.label);
    if (links.length > 0) {
      parts.push(
        `<ul class="tmh-pre-guest-links">${links
          .map((l) => `<li><a href="${escapeHtml(l.href)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a></li>`)
          .join('')}</ul>`,
      );
    }
    parts.push('</section>');
  }

  const yt = safeHref(post.youtubeUrl);
  if (yt) parts.push(`<p><a href="${escapeHtml(yt)}" target="_blank" rel="noopener">Watch the full episode on YouTube</a></p>`);

  return wrapPrerender(parts.join('\n'));
}

// Fields (from posts.json): slug, title, guestName, publishedAt, excerpt.
function renderPostList(heading, intro, posts) {
  const items = posts
    .map((p) => {
      const meta = [p.guestName && escapeHtml(p.guestName), formatDate(p.publishedAt, 'short')].filter(Boolean).join(' · ');
      return `<li><h2><a href="/blog/${escapeHtml(p.slug)}/">${escapeHtml(p.title || '')}</a></h2>${
        meta ? `<p class="tmh-pre-meta">${meta}</p>` : ''
      }${p.excerpt ? `<p>${escapeHtml(p.excerpt)}</p>` : ''}</li>`;
    })
    .join('\n');
  return wrapPrerender(`<h1>${escapeHtml(heading)}</h1><p>${escapeHtml(intro)}</p><ul class="tmh-pre-list">${items}</ul>`);
}

// Replace the contents of <div id="root"> (the boot placeholder) by walking
// nested <div> depth — the placeholder contains its own divs.
function replaceRoot(html, inner) {
  const open = '<div id="root">';
  const start = html.indexOf(open);
  if (start === -1) throw new Error('prerender: <div id="root"> not found in template');
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = start + open.length;
  let depth = 1;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (depth === 0) {
      return html.slice(0, start + open.length) + inner + html.slice(m.index);
    }
  }
  throw new Error('prerender: unbalanced <div id="root">');
}

// Embed data for BlogPost.tsx to read on direct load (skips the Loading
// screen). Placed outside #root so it survives React's mount. `<` is escaped
// so content can never close the script tag early.
function embedJson(html, id, data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return html.replace('</body>', `<script type="application/json" id="${id}">${json}</script>\n  </body>`);
}

function injectMeta(template, { title, description, url, image, type, jsonLd, noindex, linkRels, preloadImages }) {
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

  // Robots — replace the default rich-SERP meta with noindex when set.
  // Otherwise leave the template default in place.
  if (noindex) {
    html = html.replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/,
      '<meta name="robots" content="noindex, nofollow" />'
    );
  }

  // JSON-LD — inject before </head>. Remove any existing JSON-LD first.
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
  if (jsonLd) {
    const ldTag = `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  `;
    html = html.replace('</head>', `${ldTag}</head>`);
  }

  // Extra <link rel> tags (prev/next). Inject just before </head>.
  if (linkRels && linkRels.length > 0) {
    const linkTags = linkRels
      .map((l) => `    <link rel="${escapeHtml(l.rel)}" href="${escapeHtml(l.href)}" />`)
      .join('\n');
    html = html.replace('</head>', `${linkTags}\n  </head>`);
  }

  // Image preload hints — start fetching above-the-fold thumbnails in
  // parallel with JS download so they're decoded by the time React mounts.
  if (preloadImages && preloadImages.length > 0) {
    const preloadTags = preloadImages
      .map((href) => `    <link rel="preload" as="image" href="${escapeHtml(href)}" fetchpriority="high" />`)
      .join('\n');
    html = html.replace('</head>', `${preloadTags}\n  </head>`);
  }

  return html;
}

// Convert posts.json maxresdefault.jpg → hqdefault.jpg for grid card use.
function toHqThumb(url) {
  if (!url) return '';
  return url.replace(/(maxresdefault|hqdefault|mqdefault|sddefault)/, 'hqdefault');
}

// ─── Main ───────────────────────────────────────────────────────

function main() {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found — run vite build first');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Load posts once and compute "top 6 by date desc" for /blog/ preload hints.
  const postsFile = path.join(BLOG_DIR, 'posts.json');
  const posts = fs.existsSync(postsFile)
    ? JSON.parse(fs.readFileSync(postsFile, 'utf-8')).posts || []
    : [];
  const sortedDesc = [...posts].sort(
    (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime(),
  );
  const blogPreload = sortedDesc.slice(0, 6).map((p) => toHqThumb(p.thumbnail)).filter(Boolean);

  let count = 0;

  // Static routes
  for (const route of STATIC_ROUTES) {
    // CF Pages serves all directory routes with a trailing slash and 308s the
    // no-slash form. Canonical/og:url must match the served URL.
    const url = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}/`;
    const preloadImages = route.path === '/blog' ? blogPreload : undefined;
    let html = injectMeta(template, { ...route, url, preloadImages });
    if (route.path === '/blog') {
      html = replaceRoot(
        html,
        renderPostList('The Manage Her® Podcast Blog', route.description, sortedDesc),
      );
    }

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

  // Blog post routes — reuse the posts array loaded above for /blog/ preload.
  if (posts.length > 0) {
    // Sort ascending by date so we can compute prev/next neighbors.
    const sortedByDate = [...posts].sort(
      (a, b) => new Date(a.publishedAt || 0).getTime() - new Date(b.publishedAt || 0).getTime(),
    );
    const slugOrder = sortedByDate.map((p) => p.slug);

    for (const meta of posts) {
      const postFile = path.join(BLOG_DIR, `${meta.slug}.json`);
      if (!fs.existsSync(postFile)) continue;

      const post = JSON.parse(fs.readFileSync(postFile, 'utf-8'));
      const url = `${SITE_URL}/blog/${post.slug}/`;

      const idx = slugOrder.indexOf(post.slug);
      const prevSlug = idx > 0 ? slugOrder[idx - 1] : null;
      const nextSlug = idx >= 0 && idx < slugOrder.length - 1 ? slugOrder[idx + 1] : null;
      const linkRels = [];
      if (prevSlug) linkRels.push({ rel: 'prev', href: `${SITE_URL}/blog/${prevSlug}/` });
      if (nextSlug) linkRels.push({ rel: 'next', href: `${SITE_URL}/blog/${nextSlug}/` });

      let html = injectMeta(template, {
        title: `${post.title} | The Manage Her® Podcast`,
        description: post.metaDescription || post.excerpt || '',
        url,
        image: post.thumbnail || DEFAULT_IMAGE,
        type: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: post.title,
              image: post.thumbnail,
              datePublished: post.publishedAt,
              author: {
                '@type': 'Person',
                name: 'Aimee Rickabus',
                url: `${SITE_URL}/about/`,
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
              ...(Array.isArray(post.pullQuotes) && post.pullQuotes.length > 0 && {
                speakable: {
                  '@type': 'SpeakableSpecification',
                  cssSelector: ['.tmh-speakable'],
                },
              }),
            },
            {
              '@type': 'PodcastEpisode',
              name: post.title,
              url,
              datePublished: post.publishedAt,
              ...(toIsoDuration(post.duration) && { duration: toIsoDuration(post.duration) }),
              ...(typeof post.episodeNumber === 'number' && { episodeNumber: post.episodeNumber }),
              image: post.thumbnail,
              description: post.metaDescription || post.excerpt || '',
              ...(post.youtubeUrl && {
                associatedMedia: {
                  '@type': 'VideoObject',
                  name: post.title,
                  description: post.metaDescription || post.excerpt || '',
                  thumbnailUrl: post.thumbnail,
                  uploadDate: post.publishedAt,
                  embedUrl: post.youtubeUrl.replace('watch?v=', 'embed/'),
                },
              }),
              partOfSeries: {
                '@type': 'PodcastSeries',
                name: 'The Manage Her Podcast',
                url: `${SITE_URL}/podcast/`,
                author: { '@type': 'Person', name: 'Aimee Rickabus' },
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
                { '@type': 'ListItem', position: 3, name: post.title, item: url },
              ],
            },
          ],
        },
        linkRels,
      });
      html = replaceRoot(html, renderPostArticle(post));
      // Transcript and quiz are the bulk of the JSON; BlogPost.tsx fetches
      // the full post in the background to fill them in.
      const { transcript: _t, quiz: _q, ...embedded } = post;
      html = embedJson(html, 'tmh-post-data', embedded);

      const dir = path.join(DIST, 'blog', post.slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      count++;
    }
  }

  // Topic category pages — one per topic with ≥2 posts. Reuse the
  // posts array loaded at top of main().
  if (posts.length > 0) {
    const tally = new Map();
    for (const p of posts) for (const t of p.topics || []) tally.set(t, (tally.get(t) || 0) + 1);
    const topicSlug = (s) =>
      s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    for (const [topic, n] of tally) {
      if (n < 2) continue;
      const slug = topicSlug(topic);
      const url = `${SITE_URL}/blog/topic/${slug}/`;
      const title = `${topic} Episodes | The Manage Her® Podcast`;
      const description = `${n} podcast episodes on ${topic.toLowerCase()} from The Manage Her® — real conversations with women redefining leadership, hosted by Aimee Rickabus.`;
      const topicPreload = posts
        .filter((p) => (p.topics || []).includes(topic))
        .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
        .slice(0, 6)
        .map((p) => toHqThumb(p.thumbnail))
        .filter(Boolean);
      let html = injectMeta(template, {
        title,
        description,
        url,
        image: DEFAULT_IMAGE,
        type: 'website',
        preloadImages: topicPreload,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${topic} — The Manage Her® Podcast`,
          url,
          description,
          isPartOf: {
            '@type': 'PodcastSeries',
            name: 'The Manage Her Podcast',
            url: `${SITE_URL}/podcast/`,
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
              { '@type': 'ListItem', position: 3, name: topic, item: url },
            ],
          },
        },
      });
      const topicPosts = sortedDesc.filter((p) => (p.topics || []).includes(topic));
      html = replaceRoot(html, renderPostList(`${topic} Episodes`, description, topicPosts));
      const dir = path.join(DIST, 'blog', 'topic', slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      count++;
    }
  }

  console.log(`Pre-rendered meta tags for ${count} routes`);
}

main();
