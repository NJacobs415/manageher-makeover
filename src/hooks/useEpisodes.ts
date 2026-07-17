import { useState, useEffect } from "react";

interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailMax: string;
  publishedAt: string;
  duration: string;
}

interface EpisodeData {
  episodes: Episode[];
  count: number;
}

interface CachedEpisodes {
  data: EpisodeData;
  fetchedAt: number;
}

const CACHE_KEY = "tmh-episodes";
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

export function useEpisodes(limit = 3) {
  const [data, setData] = useState<EpisodeData | null>(null);

  useEffect(() => {
    const cached = readCache();
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      setData(cached.data);
      return;
    }

    fetch("https://n8n.srv1075406.hstgr.cloud/webhook/tmh-youtube-episodes")
      .then((res) => res.json())
      .then((result: EpisodeData) => {
        setData(result);
        const entry: CachedEpisodes = { data: result, fetchedAt: Date.now() };
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
      })
      .catch(() => {
        // Webhook failed — fall back to stale cache if we have any.
        if (cached) setData(cached.data);
      });
  }, []);

  return {
    episodes: data?.episodes?.slice(0, limit) || [],
    count: data?.count || 0,
    loaded: data !== null,
  };
}
