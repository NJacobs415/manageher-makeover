# The Manage Her® — Project Guide

## Overview
The Manage Her® is a women's leadership movement and media brand founded by Aimee Rickabus. This is the main website — a React + Vite + TypeScript app deploying to Cloudflare Pages.

## Commands
- `npm install` — Install dependencies
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check

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
- Website: https://www.themanageher.com
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
