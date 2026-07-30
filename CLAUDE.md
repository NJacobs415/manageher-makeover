# The Manage Her® — Project Guide

## Overview
The Manage Her® is a women's leadership movement and media brand founded by Aimee Rickabus. This is the main website — a React + Vite + TypeScript app deploying to Cloudflare Pages.

## Commands
- `npm install` — Install dependencies
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check

## n8n Workflows
Workflow JSON snapshots live in `n8n-workflows/`. The live n8n instance (`n8n.srv1075406.hstgr.cloud`) is the source of truth; the committed JSON is a version-controlled mirror. Edit via the n8n REST API using `N8N_API_KEY` from `.env.local` (gitignored). After every workflow change: re-export the patched body, copy to `n8n-workflows/<id>.json`, commit. Secrets must always reference an n8n credential by ID — never inline a bearer token in a node parameter, since the JSON is committed. See `n8n-workflows/README.md` for the full editing flow and the public-API settings whitelist.

## Blog Post Data Shape
Post data is two-tier: `public/blog/posts.json` holds **index metadata only** (slug, title,
episodeNumber, guestName, publishedAt, duration, thumbnail, excerpt, topics, youtubeUrl) and drives
listing pages plus the related-episodes rail. The **full post** — including `quiz`, `guestQuiz`,
`transcript`, and `content` — lives in `public/blog/<slug>.json`, which is what `BlogPost.tsx`
fetches. Per-post fields must be edited in `<slug>.json`; adding them to `posts.json` is a no-op.

### `quiz` vs `guestQuiz` (both optional, independent)
- `quiz` — the interactive TMH self-discovery quiz (`EpisodeQuiz`). Default for most episodes.
- `guestQuiz` — optional per-post override that **replaces** the TMH quiz with a link out to a
  guest's own external quiz, rendered by `GuestQuizCTA`. Shape:
  `{ eyebrow, title, description, url, buttonLabel }`. Use when the guest has their own assessment
  that serves the episode better than ours. To apply it, delete `quiz` and add `guestQuiz`.
- The two render conditions are independent siblings — a post may have either, both, or neither.
- `GuestQuizCTA` is **gold**-accented, not pink: it's a third-party/authority CTA, and per the design
  rules pink and gold are never both primary in one section. It opens in a new tab and fires a
  `guest_quiz_click` GA4 event.

## Analytics & Monitoring

GA4 events go through `trackEvent()` in `src/lib/analytics.ts`, which no-ops safely when
`gtag` is absent (ad blockers, dev). A `dataLayer` + `gtag` stub is installed inline in
`index.html` before anything else, so events buffer with zero loss until `gtag.js` loads.
Cloudflare Web Analytics runs in **snippet mode** — the beacon tag lives in `index.html`
(automatic injection is off, so removing that tag silently stops all collection).

### `boot_failure` — the front-end outage alarm
**This is the only signal that the site is down for real users. Treat a rise in it as an
outage, not a metrics blip.**

Emitted from a **classic inline `<script>` in `index.html`** — deliberately not
`type="module"` and with no dependency on any bundle, because it must fire in the one
situation nothing else can report: the entry module never executes, so React never runs,
`#root` stays empty, and the page is a black screen (`#0a0a0a`) with **no console error and
no failed-chunk request**. Fires when the boot placeholder is still present 8s after load,
and carries `route`, `failed_count`, `first_failed_url`, and the negotiated `protocol`.

Why it exists: during the July 2026 outage, `curl` returned **HTTP 200 with byte-correct,
CORS-valid content for the HTML and every asset** through the entire incident — 32
consecutive server-side samples showed nothing wrong while the site was blank in a browser.
Server-side monitoring is provably blind to this class of failure. `boot_failure` and the
`first_failed_url` it reports are the only instrumentation that sees it.

Companion recovery, same script: one cache-busted reload, guarded by a `tmh-boot-reload`
sessionStorage flag that is written-then-read-back and fails closed, so it can never loop.

### `route_error`
Fired by `RouteErrorBoundary` when a route throws or a lazy chunk fails **after** React has
mounted. Narrower than `boot_failure` — it needs a running app, so it cannot report a
boot failure.

### Other events
`quiz_start`, `quiz_complete`, `guest_quiz_click`, `newsletter_signup`, `book_click`,
`booking_click`, `podcast_platform_click`, `episode_play`, `transcript_expand`,
`social_click`, `guest_link_click`, `blog_topic_filter`.

## Brand Design System

### Colors (update CSS variables to match)
- Background: `#0a0a0a` (dark editorial, NOT white)
- Surface: `#111111`, `#161616`
- Pink (primary accent): `#eb1887`
- Gold (secondary accent): `#c9a96e`
- White: `#fafafa`
- Cream: `#f5f0eb`
- Body text: `#e0e0e0`
- Muted text: `#888888`

### Typography
- Headlines: `Playfair Display` (serif)
- Body: `DM Sans` (NOT Inter)
- Accent/Italic: `Cormorant Garamond`

### Trademark
- Always use ® (not ™) after "The Manage Her"
- Style with: `font-size: .45em; vertical-align: super; font-style: normal`

### Logo
- "The Manage" in soft gold, "Her" in pink italic

### Design Rules
- Pink = primary CTAs, emphasis, italic highlights
- Gold = premium/authority elements (book, speaking, numbered items)
- Never use both pink AND gold as primary on the same section
- Dark sections for hero, marquee, quote, newsletter, footer
- Warm cream sections (#faf8f5, #f5f0eb) for content sections
- Hover lifts: translateY(-4px) to (-6px) with accent border glow
- Scroll animations via IntersectionObserver, not scroll-linked

### Buttons
- Primary: Pink bg, white text, 50px radius, pink glow shadow
- Outline: Transparent, white border 20% opacity, hover turns pink
- Gold: Gold gradient bg, dark text, gold glow (book/speaking CTAs)

## Key Links
- Website: https://themanageher.com
- YouTube: https://www.youtube.com/@TheManageHer
- Instagram: https://www.instagram.com/themanageher/
- TikTok: https://www.tiktok.com/@themanageher
- LinkedIn: https://www.linkedin.com/company/themanageher
- Apple Podcasts: https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475
- Spotify: https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ
- Amazon Music: https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her
- Book: https://a.co/d/by5X0fV
- Contact: info@themanageher.com
- Phone: (949) 868-0444

## Page Structure
- **Homepage** (`src/pages/Index.tsx`) — Hero, stats, about, pillars, episodes, book, testimonials, newsletter
- **About** (`src/pages/About.tsx`) — Story, mission, credentials, beliefs, fun facts
- **Podcast** (`src/pages/Podcast.tsx`) — Listen CTAs, episode cards, topics, reviews, host bio
- **Book** (`src/pages/Book.tsx`) — 3D book mockup, what you'll discover, reviews, free chapter, Book #2
- **Press & Speaking** (`src/pages/Press.tsx`) — Speaker hero, keynote topics, bios, media kit, booking CTA

## Shared Components
- `src/components/layout/Navbar.tsx` — Sticky nav with scroll state
- `src/components/layout/Footer.tsx` — Newsletter CTA + 4-column footer
- `src/components/animations/` — FadeIn, TextReveal, Parallax, Magnetic, ScrollReveal, etc.

## Conventions
- Mobile-first responsive (768px, 1024px breakpoints)
- Use `em` tags with pink color for emphasis words in headlines
- Copy speaks directly to women — bold, warm, permission-giving
- No placeholder image URLs — use styled divs or commented-out img tags
- All commits: imperative mood, under 72 chars

## Founder
Aimee Rickabus — CEO of a nine-figure technology company, bestselling author of "The Manage Her: Unveiling Invisible Labor & Sparking a Leadership Revolution", host of The Manage Her Podcast, mother of six, NAWBO Orange County "Remarkable Woman Award for Innovation" recipient.
