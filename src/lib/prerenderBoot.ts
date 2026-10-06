// Whether this page load started from prerendered HTML.
//
// scripts/prerender-meta.mjs marks its static #root content with
// <… id="tmh-boot" data-prerendered>. When that's present, the first route
// React renders should match it — no entrance animations, no PageLoader —
// so mounting is a silent swap, not a fade-out-and-back. Any later route
// (SPA navigation) animates as usual.
//
// Read once at module load, which runs before main.tsx renders and so
// before React replaces #root.
let active =
  typeof document !== "undefined" &&
  document.querySelector("#tmh-boot[data-prerendered]") !== null;

/** True while still on the first, prerendered route. Read it in a useState
 *  initializer so an already-mounted component keeps its first answer. */
export function isPrerenderedBoot(): boolean {
  return active;
}

/** Called by AnimatedRoutes on the first pathname change. */
export function endPrerenderedBoot(): void {
  active = false;
}
