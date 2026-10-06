# The Manage Her® — Project Guide

## Overview
The Manage Her® is a women's leadership movement and media brand founded by Aimee Rickabus. This is the main website — a React + Vite + TypeScript app deploying to Cloudflare Pages.

## Commands
- `npm install` — Install dependencies
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check (`tsc --noEmit -p tsconfig.app.json`). **Required before
  every PR:** Vite strips types without checking them, so `npm run build` passes even with type
  errors. (Plain `npx tsc --noEmit` checks nothing — the root `tsconfig.json` only holds references.)

## n8n Workflows
Workflow JSON snapshots live in `n8n-workflows/`. The live n8n instance (`n8n.srv1075406.hstgr.cloud`) is the source of truth; the committed JSON is a version-controlled mirror. Edit via the n8n REST API using `N8N_API_KEY` from `.env.local` (gitignored). After every workflow change: re-export the patched body, copy to `n8n-workflows/<id>.json`, commit. Secrets must always reference an n8n credential by ID — never inline a bearer token in a node parameter, since the JSON is committed. See `n8n-workflows/README.md` for the full editing flow and the public-API settings whitelist. Auto Blog Publisher uses strict tool use; `quiz` is validated in Build Blog JSON and a bad payload fails the execution rather than publishing.

## Blog Post Data Shape
Post data is two-tier: `public/blog/posts.json` holds **index metadata only** (slug, title,
episodeNumber, guestName, publishedAt, duration, thumbnail, excerpt, topics, youtubeUrl) and drives
listing pages plus the related-episodes rail. The **full post** — including `quiz`, `guestQuiz`,
`transcript`, and `content` — lives in `public/blog/<slug>.json`, which is what `BlogPost.tsx`
fetches. Per-post fields must be edited in `<slug>.json`; adding them to `posts.json` is a no-op.

### Prerendered body (`scripts/prerender-meta.mjs`, runs as `postbuild`)
Besides per-route `<head>` meta/JSON-LD, the prerender step writes real page content into
`<div id="root">` so non-JS crawlers see more than an empty shell (44 posts sat in GSC as
"Crawled – currently not indexed" before this):
- **`dist/blog/<slug>/index.html`** — an `<article>` with `<h1>` title, byline (Aimee Rickabus ·
  date · guest), key takeaways `<ol>`, the body, pull quotes, "About the guest", and a YouTube link.
  Depends on these `<slug>.json` fields: `title`, `publishedAt`, `guestName`, `keyTakeaways`,
  `content` (HTML; CDATA wrapper stripped like `sanitizePostContent`), `pullQuotes`, `guestBio`,
  `guestLinks` (label trimmed, trailing `(` dropped), `youtubeUrl`. Quiz, transcript and the
  thumbnail image are deliberately not rendered (thumbnail stays JSON-LD only).
- **`dist/blog/index.html`** and **`dist/blog/topic/<topic>/index.html`** — `<h1>` plus a linked
  list of posts (title, guest, date, excerpt) from `posts.json`.
- The prerendered wrapper **must keep `id="tmh-boot"`** — that's the element the boot watchdog
  checks for (see `boot_failure` below). React replaces it on mount, same as the placeholder.
  It also carries `data-prerendered`, which drives the boot flag (see Performance → Prerendered
  boot).
- Only reuse classes Tailwind already emits from `src/` (`prose-tmh`, `tmh-speakable`); everything
  else is in the script's inline `PRERENDER_CSS`. Pull quotes carry `tmh-speakable` so the JSON-LD
  `speakable` selector resolves in both the static HTML and the React page.
- Post pages also embed the post minus `transcript`/`quiz` as
  `<script type="application/json" id="tmh-post-data">` (outside `#root`). On a direct load
  `BlogPost.tsx` uses it as initial state when its slug matches the route — no Loading screen —
  and still fetches `<slug>.json` in the background to fill in quiz and transcript. A bad embed
  falls back to the normal fetch; SPA navigation is unchanged.

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

### `quiz` must be a real object — never a JSON string
`quiz` is an object (`{ title, description, types, questions }`); `guestQuiz` likewise. A
**double-encoded** `quiz` — the whole object serialized into a JSON *string* — is the known
failure mode of the n8n Auto Blog Publisher (workflow `At5iovQ74qk4ki5B`). **Check it first when
an episode page renders the "This page didn't load" error boundary**: episodes 74–76 all shipped
this way, and the encoded strings were themselves malformed (mismatched `]`/`}`, unclosed `types`
objects), so they don't even round-trip through `JSON.parse`.

`normalizeBlogPost()` in `src/lib/normalizeBlogPost.ts` runs on every fetched post and contains
the blast radius: a stringified `quiz`/`guestQuiz` is parsed back into an object where possible,
and anything unparseable or missing the shape its component needs (`quiz.questions[]`,
`guestQuiz.url`) is dropped to `undefined`. Both sections render behind `post.quiz && …` guards,
so a bad field silently omits that one section instead of erroring the whole page. **This is a
safety net, not a license to ship bad data** — repair the underlying `<slug>.json`, or the quiz
just stops appearing. To audit every post:

```
node -e 'const fs=require("fs"),p="public/blog/";for(const f of fs.readdirSync(p)){const j=JSON.parse(fs.readFileSync(p+f,"utf8"));for(const k of ["quiz","guestQuiz"])if(j[k]!==undefined&&typeof j[k]!=="object")console.log("BAD",f,k,typeof j[k])}'
```

## Analytics & Monitoring

GA4 events go through `trackEvent()` in `src/lib/analytics.ts`, which no-ops safely when
`gtag` is absent (ad blockers, dev). A `dataLayer` + `gtag` stub is installed inline in
`index.html` before anything else, so events buffer with zero loss until `gtag.js` loads.
Cloudflare Web Analytics runs in **snippet mode** — the beacon tag lives in `index.html`
(automatic injection is off, so removing that tag silently stops all collection).

`public/llms.txt` — AI-crawler site summary (llmstxt.org spec); update when pages or key links change.

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
`social_click`, `guest_link_click`, `blog_topic_filter`, `chapter_download`, `popup_view`,
`popup_dismiss`.

### `chapter_download` — Cultivate Her Chapter 1 form
`ChapterOneForm` (`src/components/book/ChapterOneForm.tsx`) collects first name + email and
POSTs JSON to the **GHL inbound webhook** for workflow **"Cultivate Her – Chapter 1 + Waitlist"**.
GHL creates/updates the contact, tags it, and emails the chapter — nothing is stored
client-side. It's used in two placements, told apart by the `source` prop (sent to GHL and on
every event): `book-page-free-chapter` (inline in `/book#free-chapter`, light variant) and
`popup-cultivate-her` (the sitewide popup, `variant="dark"`). Only on a 2xx response does it
fire `chapter_download` (`{ book: "the_cultivate_her", chapter: 1, source }`) plus
`newsletter_signup` (`signup_location: <source>`). The webhook URL is public by design (it ships
in the bundle); submitting the live form creates a real GHL contact, so don't smoke-test it with
throwaway data.

### Cultivate Her popup — `popup_view` / `popup_dismiss`
`src/components/CultivateHerPopup.tsx` is a sitewide modal (cover, launch countdown via the
shared `src/hooks/useCountdown.ts` + `CULTIVATE_HER_LAUNCH`, dark `ChapterOneForm`). It's mounted
once in `AnimatedRoutes.tsx` as a sibling of the route `AnimatePresence` — it must stay inside
`BrowserRouter` because it uses `useLocation`, so never move it up into `App.tsx`.
- **Triggers** (first one wins, at most once per page load): 7s on page, 45% scroll depth, or
  exit intent (mouse leaving through the top edge, fine pointers only).
- **Suppressed routes:** any path starting with `/book` (the inline form lives there),
  `/blog/` (posts already gate the quiz behind email; this also covers `/blog/topic/*`), or
  `/links` (link-in-bio has its own inline Chapter 1 card). The `/blog` index is *not*
  suppressed.
- **Layout:** desktop (`md+`) shows the side cover panel; below `md` it's hidden and a small
  inline cover sits beside the eyebrow so the whole form fits a 375×740 screen without
  scrolling inside the dialog.
- **Suppression window:** `localStorage["tmh_cultivate_popup"]` holds an epoch-ms "quiet until"
  timestamp. Dismissing (X, ESC, backdrop click) sets 7 days; a successful signup sets 60 days,
  and closing the success card afterwards keeps the 60. Storage errors fail open (the popup
  just shows again). To re-test locally: `localStorage.removeItem("tmh_cultivate_popup")`.
- **Events:** `popup_view` (`{ popup: "cultivate_her_chapter1", trigger: "timer" | "scroll" |
  "exit_intent" }`) on open; `popup_dismiss` (`{ popup }`) on a non-signup close.

## Performance

### Hero video (`src/components/HeroVideo.tsx`)
- **Always a poster.** `public/hero-poster.webp` (+ `.jpg` fallback) renders as an `<img>`
  under the video and is the homepage LCP element; `prerender-meta.mjs` preloads it with
  `fetchpriority="high"` on `/` only.
- **Video loads lazily, on every viewport.** `preload="none"`, no `src` until the window
  `load` event, then `play()`; it fades in over the poster on `playing`. Source is chosen at
  mount with `matchMedia('(max-width: 767px)')` — `hero-video-640.*` on mobile, `hero-video-1280.*`
  on desktop — not `<source media>` (Safari ignores it for video). webm (VP9) when
  `canPlayType` allows, else mp4. The `muted` attribute is set via ref so iOS autoplays.
- **Budgets:** 1280 mp4 < 1.2 MB, 640 mp4 < 600 KB, each webm no bigger than its mp4.
  Re-encoding: trim to a loop that ends on a hard cut before raising CRF past 30; no audio,
  `-movflags +faststart`. Current files are a 12.8s trim, 24fps, x264 CRF 29 / 28.
- Hero eyebrow + h1 use `<TextReveal immediate>` (transform-only, no clip-path or
  IntersectionObserver wait) so they paint on first frame. Don't use the default clip-path
  reveal above the fold.

### Images
- Serve at ≤ 2× the largest displayed size and **always set `width`/`height`** (with CSS
  `width: auto` / `h-* w-auto` when only the height is fixed, or the attribute stretches it).
  Unsized lazy images below the fold report `src=""` in Lighthouse because they never load.
- Sized variants live beside the originals (`card-*-672.webp`, `card-*-900.webp`,
  `aimee-portrait-1-{400,800}.webp`, `M_Logo_*-256.png`); originals stay for other pages,
  JSON-LD and OG images. Use the 1080 logos only where displayed large (hero watermark).

### PageLoader
`src/components/animations/PageLoader.tsx` shows only on the first page load of a session
(`sessionStorage["tmh_loader_seen"]`, fails open if storage throws), fills in ~250ms, then the
0.8s wipe. It overlays — the page renders underneath; never gate route rendering on it.

### Home hero + nav prerender
`prerender-meta.mjs` writes a static copy of the announcement bar, sticky nav and home hero
(`renderHomeShell()`) into `dist/index.html`'s `#root`, in their **final rendered state** —
poster `<picture>`, eyebrow, h1, subhead, both CTAs, stats (episode count from the same formula
as `useEpisodeCount`, computed at build), scroll cue. FCP comes from HTML instead of waiting
for the bundle. **If hero/nav copy, classes or wrapper divs change in `Index.tsx`, `Navbar.tsx`
or `HeroVideo.tsx`, update `renderHomeShell()` too** — the TextReveal/FadeIn/Magnetic wrapper
divs are mirrored on purpose, since dropping them changes line boxes and shifts the hero (CLS)
when React mounts. The nav's menu button is inert until React replaces it.

### Prerendered boot (`src/lib/prerenderBoot.ts`)
`isPrerenderedBoot()` is true when the HTML had `#tmh-boot[data-prerendered]` (home, blog posts,
blog list, topic pages) and stays true until the first pathname change (`AnimatedRoutes`). On
that first render: `PageTransition` uses `initial={false}`, `Index`/`BlogPost` drop
`.page-enter`, above-the-fold `TextReveal`/`FadeIn`/`AnimatedCounter` get `instant`, and
`PageLoader` doesn't show. Mount is a silent swap, not a fade-out-and-back. SPA navigation
animates as before. Read it in a `useState` initializer, never on every render.

### SPA fallback: `/_shell/`
`dist/index.html` is now the prerendered homepage, so it can't be the SPA fallback (404s would
flash the home hero). `prerender-meta.mjs` writes the untouched Vite shell to
`dist/_shell/index.html`, and `public/_redirects` ends with `/* /_shell/index.html 200`.

### Fonts
Google Fonts CSS loads non-blocking (`media="print"` + `onload`, `<noscript>` fallback,
preconnects kept), so prerendered text first paints in metric-matched local fallbacks from
`src/index.css` (`"Playfair Display Fallback"`, `"DM Sans Fallback"`, `"DM Sans Caps Fallback"`
for `.font-sans.uppercase` labels, `"Cormorant Garamond Fallback"`, each with an Android
variant), wired into the Tailwind `fontFamily` stacks. The request loads only what `src/` uses:
Playfair 400/600/700 + italic 400/700, DM Sans 400/500/600/700, Cormorant italic 400/600.
**Never add a weight or style in `src/` without adding it to the fonts request in
`index.html`** (otherwise the browser synthesizes it), and if it renders above the fold, add a
tuned fallback `@font-face` for it too. Inline `font-family` strings above the fold must include
the fallback family name (see the hero subhead).

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
  - Book Two is **The Cultivate Her** ("Reclaiming Women's Seasons and Cultivating a New Way to
    Grow"), launching **2026-11-20** — the `useCountdown("2026-11-20T00:00:00")` target. Cover
    asset: `src/assets/the-cultivate-her-cover.webp`. Section anchor: `#the-cultivate-her`.
    Gold-accented (book/premium); pink only on the eyebrow and waitlist CTA.
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
