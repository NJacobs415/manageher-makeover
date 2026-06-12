// YouTube thumbnail variant helper.
//
// posts.json stores maxresdefault.jpg (1280×720, ~150 KB) which is right
// for OG images, RSS, schema, and the per-episode hero. For grid cards
// we only render the image at ~400×225, so maxres is mostly thrown away
// after decode and the wire weight hurts mobile LCP.
//
// hqdefault is 480×360 (~25 KB) — sharp enough for card-sized rendering,
// 6× lighter on the wire, and supports retina via 2× CSS scaling.

type YtVariant = "max" | "hq" | "mq" | "sd";

const SUFFIX: Record<YtVariant, string> = {
  max: "maxresdefault",
  hq: "hqdefault",
  mq: "mqdefault",
  sd: "sddefault",
};

export function getYouTubeThumb(url: string | undefined, variant: YtVariant = "hq"): string {
  if (!url) return "";
  return url.replace(/(maxresdefault|hqdefault|mqdefault|sddefault)/, SUFFIX[variant]);
}
