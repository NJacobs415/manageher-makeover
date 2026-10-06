// Shared by generate-sitemap.mjs and prerender-meta.mjs so topic handling
// can't drift between the sitemap and the prerendered pages.

// A topic needs at least this many posts to be indexable: below it, the
// topic page is left out of the sitemap and prerendered with
// `noindex, follow` (it still exists, so its URL never 404s).
// The app's topic links (useTopicCounts, Blog.tsx, BlogTopic.tsx) use the
// same threshold of 2 — keep them in step if this changes.
export const TOPIC_INDEX_MIN_POSTS = 2;

// Mirror of topicToSlug() in src/lib/topicSlug.ts (scripts can't import TS).
export function topicSlug(topic) {
  return topic
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
