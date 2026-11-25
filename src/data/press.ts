// ——— Press coverage ———
// Typed wrapper around src/data/press.json — the ONE place press items live.
// That JSON drives PressCard on /press (#in-the-press, newest first), the
// /book Cultivate Her press strip (book === "cultivate-her"), the homepage
// "As featured in" line (featured items), and Aimee's Person JSON-LD
// `subjectOf` — here for React, and in scripts/prerender-meta.mjs, which reads
// the same JSON. We always link out to the publication — never host or
// republish their pages. Images (optional, rich feature cards only) live in
// public/press/, sized ≤ 2× display.

import pressData from "./press.json";

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

export const PRESS_ITEMS: PressItem[] = pressData as PressItem[];

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

/**
 * schema.org `subjectOf` entries for Aimee's Person JSON-LD. Same mapping as
 * pressSubjectOf() in scripts/prerender-meta.mjs — keep the two in step.
 */
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
