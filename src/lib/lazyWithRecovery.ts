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

// Chrome / Firefox / Safari phrasings for a failed module script fetch.
const CHUNK_ERROR = /Failed to fetch dynamically imported module|Importing a module script failed/i;

function readFlag(): boolean {
  try {
    return sessionStorage.getItem(RELOAD_FLAG) === "1";
  } catch {
    // Private mode / storage disabled — treat as "already tried" so we never
    // reload without a working guard.
    return true;
  }
}

function setFlag() {
  try {
    sessionStorage.setItem(RELOAD_FLAG, "1");
  } catch {
    /* storage unavailable — the read path already fails closed */
  }
}

function clearFlag() {
  try {
    sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    /* nothing to clear if storage is unavailable */
  }
}

export default function lazyWithRecovery<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() =>
    factory()
      .then((mod) => {
        // Loaded fine — re-arm recovery for future navigations/deploys.
        clearFlag();
        return mod;
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);

        if (CHUNK_ERROR.test(message) && !readFlag()) {
          setFlag();
          window.location.reload();
          // Never settles: the reload is in flight, so don't let React render
          // an error state during teardown.
          return new Promise<{ default: T }>(() => undefined);
        }

        // Not a chunk error, or we already spent our one reload.
        throw err;
      })
  );
}
