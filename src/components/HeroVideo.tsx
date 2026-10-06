import { useEffect, useRef, useState } from "react";

// Homepage hero background.
//
// The poster <img> is the LCP element: it paints immediately (preloaded with
// fetchpriority=high by scripts/prerender-meta.mjs for "/"). The video has
// preload="none" and no src until the window load event, so it never competes
// with first paint, then fades in over the poster once it is actually playing.
//
// Source is picked once at mount with matchMedia — <source media> is ignored
// for <video> by Safari. Keep the files small: see CLAUDE.md "Performance".
const MOBILE_QUERY = "(max-width: 767px)";
const POSTER = "/hero-poster.webp";
const POSTER_JPG = "/hero-poster.jpg";

const mediaStyle = { filter: "brightness(0.35)" } as const;

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React sets `muted` only as a property; iOS autoplay also wants the
    // attribute and defaultMuted.
    video.setAttribute("muted", "");
    video.defaultMuted = true;
    video.muted = true;

    const base = window.matchMedia(MOBILE_QUERY).matches ? "/hero-video-640" : "/hero-video-1280";

    const start = () => {
      const webm = video.canPlayType('video/webm; codecs="vp9"') !== "";
      video.src = `${base}.${webm ? "webm" : "mp4"}`;
      // Rejected autoplay (e.g. iOS Low Power Mode) just leaves the poster up.
      video.play().catch(() => {});
    };

    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <>
      <picture>
        <source srcSet={POSTER} type="image/webp" />
        <img
          src={POSTER_JPG}
          alt=""
          aria-hidden="true"
          width={1280}
          height={720}
          // Lowercase: React 18 doesn't know the camelCase prop.
          {...{ fetchpriority: "high" }}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={mediaStyle}
        />
      </picture>
      <video
        ref={videoRef}
        poster={POSTER}
        preload="none"
        muted
        loop
        playsInline
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          ...mediaStyle,
          opacity: playing ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />
    </>
  );
};

export default HeroVideo;
