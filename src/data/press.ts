// ——— Press coverage ———
// Single source for every press mention. Rendered by PressCard on /press
// (#in-the-press, newest first), the /book Cultivate Her press strip
// (book === "cultivate-her"), and the homepage "As featured in" link
// (featured items). We always link out to the publication — never host or
// republish their pages. Images (optional, rich feature cards only) live in
// public/press/, sized ≤ 2× display.
//
// scripts/prerender-meta.mjs can't import this file: when an item with a real
// article URL is added, mirror it into PRESS_SUBJECT_OF there too.

export type PressBook = "manage-her" | "cultivate-her";

export interface PressItem {
  id: string;
  publication: string;
  title: string;
  url: string;
  /** ISO date (YYYY-MM-DD) of publication; drives newest-first ordering. */
  date: string;
  summary: string;
  book?: PressBook;
  featured?: boolean;
  /**
   * `url` is a placeholder (e.g. the outlet homepage) until the real article
   * link arrives. Excluded from Person JSON-LD `subjectOf`.
   */
  urlPending?: boolean;
  // Optional rich feature-card fields (print features with art). When `image`
  // is set, the featured PressCard renders the portrait + cover-badge layout;
  // otherwise it's text-only.
  issue?: string;
  pages?: string;
  quote?: string;
  cover?: string;
  image?: string;
  imageAlt?: string;
}

export const PRESS_ITEMS: PressItem[] = [
  {
    id: "leadher-2026-10",
    publication: "LeadHer Magazine",
    title: "What Strength Asked of Her",
    // TODO: swap for the digital-issue link once Aimee forwards it
    url: "https://leadhermagazine.com",
    urlPending: true,
    date: "2026-10-01",
    summary:
      "For years, strength meant building more, carrying more, and holding everything together. Aimee Rickabus eventually learned it could also mean knowing when to let go.",
    book: "cultivate-her",
    featured: true,
    issue: "October 2026 · Feature Story",
    pages: "Pages 68 – 71",
    quote:
      "I had to learn how to stop climbing, and how to start cultivating myself.",
    cover: "/press/leadher-cover-oct-2026-240.webp",
    image: "/press/leadher-feature-portrait-800.webp",
    imageAlt: "Aimee Rickabus, LeadHer Magazine feature portrait",
  },
  {
    id: "womens-mag-2026-11",
    publication: "Women's Mag",
    title:
      "Life Is a Garden, Not a Ladder: Aimee Rickabus on What Women Are Really Growing",
    url: "https://womenmag.com/life-is-a-garden-not-a-ladder-aimee-rickabus-on-what-women-are-really-growing/",
    date: "2026-11-26",
    summary:
      "Why Aimee stopped climbing — and what she's teaching women to grow instead.",
    book: "cultivate-her",
    featured: true,
  },
];

/** All press items, newest first. */
export const pressNewestFirst = (items: PressItem[] = PRESS_ITEMS): PressItem[] =>
  [...items].sort((a, b) => b.date.localeCompare(a.date));

/** "November 2026" — formatted in UTC so an ISO date never shifts a day. */
export const formatPressDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/** schema.org `subjectOf` entries for Aimee's Person JSON-LD. */
export const pressSubjectOf = () =>
  pressNewestFirst()
    .filter((item) => !item.urlPending)
    .map((item) => ({
      "@type": "Article",
      headline: item.title,
      url: item.url,
      datePublished: item.date,
      publisher: { "@type": "Organization", name: item.publication },
    }));
