import { useState, useEffect } from "react";

interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailMax: string;
  publishedAt: string;
  duration: string;
  episodeNumber?: number;
}

interface EpisodeData {
  episodes: Episode[];
  count: number;
}

interface CachedEpisodes {
  data: EpisodeData;
  fetchedAt: number;
}

const CACHE_KEY = "tmh-episodes-v2";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function readCache(): CachedEpisodes | null {
  const raw = sessionStorage.getItem(CACHE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CachedEpisodes;
    // Ignore legacy entries written without the {data, fetchedAt} envelope.
    if (!parsed || typeof parsed.fetchedAt !== "number" || !parsed.data) return null;
    return parsed;
  } catch {
    return null;
  }
}

function youtubeIdFromUrl(url: unknown): string | null {
  if (typeof url !== "string") return null;
  try {
    return new URL(url).searchParams.get("v");
  } catch {
    return null;
  }
}

// Webhook titles carry no "Ep N" prefix, so the number comes from the blog
// index. Never rejects: on any failure the episodes come back unchanged.
async function attachEpisodeNumbers(data: EpisodeData): Promise<EpisodeData> {
  try {
    const res = await fetch("/blog/posts.json");
    if (!res.ok) return data;
    const index = (await res.json()) as {
      posts?: { youtubeUrl?: unknown; episodeNumber?: unknown }[];
    };
    const numbers = new Map<string, number>();
    for (const post of index.posts ?? []) {
      const id = youtubeIdFromUrl(post.youtubeUrl);
      if (id && typeof post.episodeNumber === "number") numbers.set(id, post.episodeNumber);
    }
    return {
      ...data,
      episodes: (data.episodes ?? []).map((ep) =>
        numbers.has(ep.id) ? { ...ep, episodeNumber: numbers.get(ep.id) } : ep
      ),
    };
  } catch {
    return data;
  }
}

export function useEpisodes(limit = 3) {
  const [data, setData] = useState<EpisodeData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const enrich = (base: EpisodeData) =>
      attachEpisodeNumbers(base).then((enriched) => {
        if (!cancelled) setData(enriched);
        return enriched;
      });

    const cached = readCache();
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      setData(cached.data);
      enrich(cached.data);
      return () => {
        cancelled = true;
      };
    }

    fetch("https://n8n.srv1075406.hstgr.cloud/webhook/tmh-youtube-episodes")
      .then((res) => res.json())
      .then((result: EpisodeData) => {
        if (!cancelled) setData(result);
        return enrich(result);
      })
      .then((result) => {
        // Persist separately so a storage failure (e.g. QuotaExceededError)
        // can't reach the fetch .catch() and clobber the fresh data.
        try {
          const entry: CachedEpisodes = { data: result, fetchedAt: Date.now() };
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
        } catch {
          /* cache write is best-effort */
        }
      })
      .catch(() => {
        // Webhook (or parse) failed — fall back to stale cache if we have any.
        if (cached && !cancelled) {
          setData(cached.data);
          enrich(cached.data);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    episodes: data?.episodes?.slice(0, limit) || [],
    count: data?.count || 0,
    loaded: data !== null,
  };
}
