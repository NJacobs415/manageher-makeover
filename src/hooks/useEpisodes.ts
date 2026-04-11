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

export function useEpisodes(limit = 3) {
  const [data, setData] = useState<EpisodeData | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem("tmh-episodes");
    if (cached) {
      setData(JSON.parse(cached));
      return;
    }

    fetch("https://n8n.srv1075406.hstgr.cloud/webhook/tmh-youtube-episodes")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        sessionStorage.setItem("tmh-episodes", JSON.stringify(result));
      })
      .catch(() => null);
  }, []);

  return {
    episodes: data?.episodes?.slice(0, limit) || [],
    count: data?.count || 0,
    loaded: data !== null,
  };
}
