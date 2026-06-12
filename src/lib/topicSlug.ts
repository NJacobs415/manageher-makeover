// Topic name <-> URL slug conversion. Used by /blog/topic/<slug> routing,
// /podcast chip linking, prerender, and sitemap so all four agree on the
// canonical slug form.

export function topicToSlug(topic: string): string {
  return topic
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Inverse lookup against a known list of topics. Returns the original
// case-preserved label (e.g. "Financial Literacy") or null if no match.
export function slugToTopic(slug: string, topics: string[]): string | null {
  const target = slug.toLowerCase();
  for (const t of topics) if (topicToSlug(t) === target) return t;
  return null;
}
