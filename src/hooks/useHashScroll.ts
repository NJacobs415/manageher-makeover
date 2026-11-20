import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Smooth-scrolls to `location.hash` on mount and on every in-app hash navigation
 * (Router doesn't do this). Targets should carry a `scroll-mt-*` class so the
 * sticky navbar doesn't cover them.
 *
 * Runs twice: once right after render, then again once PageTransition's enter
 * animation (0.5s, translateY) and above-the-fold images have settled, only if
 * the target drifted. Same idea as the inline effects in Press.tsx / Legal.tsx.
 */
export default function useHashScroll() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    const first = window.setTimeout(scroll, 120);
    const settle = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const marginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      if (Math.abs(el.getBoundingClientRect().top - marginTop) > 4) scroll();
    }, 900);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(settle);
    };
  }, [hash, key]);
}
