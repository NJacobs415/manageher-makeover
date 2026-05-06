import { useMemo } from "react";

export function useEpisodeCount() {
  return useMemo(() => {
    const baseCount = 60;
    const baseDate = new Date("2026-05-04T00:00:00");
    const now = new Date();
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const weeksPassed = Math.floor((now.getTime() - baseDate.getTime()) / msPerWeek);
    return baseCount + Math.max(0, weeksPassed);
  }, []);
}
