// lazyWithRecovery — React.lazy() that survives a stale index.html.
//
// After a deploy, a client holding the previous index.html requests chunk
// filenames whose hashes no longer exist (or hits a cold/inconsistent edge).
// The dynamic import rejects, React unmounts the tree, and the user sees a
// blank #root — a black screen on this site's #0a0a0a background.
//
// Recovery: on a chunk-load rejection, reload ONCE to pick up fresh HTML.
// A sessionStorage flag makes the reload strictly one-shot, so a genuinely
// missing chunk surfaces to the error boundary instead of reload-looping.

import { lazy, type ComponentType } from "react";

const RELOAD_FLAG = "tmh-chunk-reload";

// Per-engine phrasings for a failed module script fetch:
//   Chrome/Edge — "Failed to fetch dynamically imported module"
//   Safari      — "Importing a module script failed"
//   Firefox     — "error loading dynamically imported module"
const CHUNK_ERROR =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i;

// If the reload does not take effect within this window, surface the error to
// the boundary instead of staying suspended forever.
const RELOAD_GRACE_MS = 8000;

function alreadyReloaded(): boolean {
  try {
    return sessionStorage.getItem(RELOAD_FLAG) === "1";
  } catch {
    // Private mode / storage disabled — treat as "already tried" so we never
    // reload without a working guard.
    return true;
  }
}

// Arms the one-shot guard. Returns true ONLY if the flag was written AND read
// back, so a failed write (e.g. storage full) can never let us reload
// unguarded — that would loop indefinitely.
function armGuard(): boolean {
  try {
    sessionStorage.setItem(RELOAD_FLAG, "1");
    return sessionStorage.getItem(RELOAD_FLAG) === "1";
  } catch {
    return false;
  }
}

function clearGuard() {
  try {
    sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    /* nothing to clear if storage is unavailable */
  }
}

export default function lazyWithRecovery<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() => {
    // Where this import started. If the user has navigated away by the time it
    // rejects, the route was abandoned — reloading would blow away a healthy
    // page the user is now looking at.
    const startedAt = typeof window === "undefined" ? null : window.location.pathname;

    return factory()
      .then((mod) => {
        // Loaded fine — re-arm recovery for future navigations/deploys.
        clearGuard();
        return mod;
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        const stillOnRoute =
          startedAt === null || window.location.pathname === startedAt;

        // Only reload once the guard is confirmed written; otherwise fall
        // through and let the boundary render.
        if (CHUNK_ERROR.test(message) && stillOnRoute && !alreadyReloaded() && armGuard()) {
          window.location.reload();
          // Don't render an error while the reload is in flight, but don't
          // suspend forever either: React.lazy caches this thenable, so a
          // cancelled reload would otherwise strand the route permanently.
          return new Promise<{ default: T }>((_resolve, reject) => {
            window.setTimeout(() => reject(err), RELOAD_GRACE_MS);
          });
        }

        // Not a chunk error, the route was abandoned, we already spent our one
        // reload, or the guard could not be armed.
        throw err;
      });
  });
}
