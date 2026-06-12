import { useEffect, useState } from "react";

export interface TopicCount {
  name: string;
  count: number;
}

interface PostsIndex {
  posts: Array<{ topics?: string[] }>;
}

// Fetches /blog/posts.json and returns the top N topics by post count,
// excluding singletons so the chip strip doesn't surface long-tail noise.
// Returns the seed (a few common topics with 0 counts) on first render so
// the UI doesn't collapse before fetch resolves.
const SEED: TopicCount[] = [
  { name: "Leadership", count: 0 },
  { name: "Entrepreneurship", count: 0 },
  { name: "Motherhood", count: 0 },
  { name: "Identity", count: 0 },
  { name: "Wellness", count: 0 },
];

export function useTopicCounts(top = 10, minCount = 2): TopicCount[] {
  const [counts, setCounts] = useState<TopicCount[]>(SEED);

  useEffect(() => {
    fetch("/blog/posts.json")
      .then((res) => res.json() as Promise<PostsIndex>)
      .then((data) => {
        const tally = new Map<string, number>();
        for (const p of data.posts || []) {
          for (const t of p.topics || []) {
            tally.set(t, (tally.get(t) || 0) + 1);
          }
        }
        const ranked = [...tally.entries()]
          .map(([name, count]) => ({ name, count }))
          .filter((t) => t.count >= minCount)
          .sort((a, b) => b.count - a.count)
          .slice(0, top);
        setCounts(ranked);
      })
      .catch(() => {
        /* leave SEED in place on fetch failure */
      });
  }, [top, minCount]);

  return counts;
}
