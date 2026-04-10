

# The Manage Her — Ultimate Rebuild Plan
## Inspired by Amy Porterfield, Marie Forleo, and Jenna Kutcher

### What We're Taking From Each Inspiration

**Amy Porterfield** — Clean editorial layout, large serif headlines with italic emphasis, bright hero photo with text alongside (not overlaid), "As Featured In" logo bar, clear conversion funnel with lead magnets, podcast section with clean cards.

**Marie Forleo** — Full-viewport cinematic hero with huge serif typography over imagery, video integration, elegant scroll-down arrow, warm/sophisticated color palette, editorial photo layouts with overlapping text blocks.

**Jenna Kutcher** — Bold oversized name typography behind/around the hero photo (the "name as art" technique), warm gradient color transitions between sections, playful yet polished feel, prominent podcast and book sections, strong personal brand identity.

### Design System

- **Primary palette**: Near-black (#1A1A1A) backgrounds, warm gold (#D4A853), hot pink (#E91E8C), cream (#FFF8F0) for light sections
- **Typography**: Playfair Display (serif) for headlines with italic emphasis words, Inter for body text
- **Layout philosophy**: Full-bleed sections, generous whitespace, editorial asymmetry, large photography

---

## Implementation — 5 Pages, Built Incrementally

### Phase 1: Foundation + Homepage (first pass)

**Files created/modified:**
- `src/index.css` — New CSS variables for brand colors, fonts, animations
- `tailwind.config.ts` — Extended with brand colors, fonts, custom animations
- `index.html` — Google Fonts link (Playfair Display + Inter)
- `src/components/layout/Navbar.tsx` — Sticky nav: transparent over hero, solid on scroll, mobile full-screen overlay menu with staggered animations
- `src/components/layout/Footer.tsx` — Newsletter signup, sitemap, social icons
- `src/components/animations/ScrollReveal.tsx` — Intersection Observer wrapper for fade/slide animations
- `src/components/animations/AnimatedCounter.tsx` — Count-up numbers when visible
- `src/components/animations/ParallaxSection.tsx` — Parallax background wrapper

**Homepage sections (src/pages/Index.tsx):**
1. Full-viewport hero — Jenna Kutcher-style oversized "The ManageHer" text behind/around Aimee's photo, tagline with italic pink emphasis, "Listen Now" CTA, stat counters (30+ episodes, 5.0 rating, 50K+ downloads)
2. "As Featured In" logo marquee
3. Meet Aimee — Amy Porterfield-style split layout (large photo left, text card right with editorial pull quote)
4. 3 Pillars — Hover-reveal cards with editorial numbering
5. Latest Episodes — Album-art carousel cards with play buttons
6. Book teaser — 3D tilt book cover + excerpt + CTA
7. Testimonials — Auto-scrolling quote slider
8. Newsletter CTA — Full-width bold section
9. Footer

### Phase 2: About Aimee Page
- `src/pages/About.tsx`
- Full-bleed hero with editorial text overlay (Marie Forleo style)
- Journey timeline (mom -> CEO -> author -> podcast host)
- Magazine-style pull quotes
- Photo gallery section

### Phase 3: Podcast Hub
- `src/pages/Podcast.tsx`
- `src/components/podcast/EpisodeCard.tsx`
- `src/components/podcast/EpisodeFilters.tsx`
- Featured episode hero with waveform visual accent
- Searchable/filterable episode grid by topic
- Platform subscription links (Apple, Spotify, etc.)
- Category tabs

### Phase 4: Book Page
- `src/pages/Book.tsx`
- Cinematic hero with 3D book cover (CSS perspective transform on hover)
- Chapter preview accordion
- "Who This Book Is For" persona cards
- Reader reviews carousel
- Purchase CTAs

### Phase 5: Press & Speaking
- `src/pages/Press.tsx`
- Speaking topics as editorial cards
- Media logos grid
- Booking inquiry form
- Media kit download section
- Video reel embed

### Routing Update
- `src/App.tsx` — Add routes for `/about`, `/podcast`, `/book`, `/press`

---

## Key Interactive Elements (applied across all pages)
- Every section uses `ScrollReveal` for entrance animations
- Parallax on hero backgrounds
- Smooth scroll between sections
- Hover micro-interactions: scale, glow, underline reveals on cards/buttons
- Nav transforms from transparent to solid on scroll
- Mobile menu: full-screen overlay with staggered link animations
- Page transition fade effect via CSS

### Technical Notes
- All animations use CSS transitions + Intersection Observer (no heavy libraries)
- Images will use placeholder URLs initially (Unsplash or similar) — you'll swap in Aimee's real photos
- Podcast episodes use static data arrays initially (can connect to RSS/API later)
- Fonts loaded via Google Fonts CDN in index.html

