// RouteErrorBoundary — catches render/lazy-load failures in the router outlet.
//
// Without this, a rejected lazy() import unmounts the whole tree and leaves an
// empty #root. Because the app background is #0a0a0a that presents as a black
// screen with no clue anything failed. This guarantees a visible fallback.

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

interface Props {
  children: ReactNode;
}

interface State {
  // Separate from `error` on purpose: a route may throw a falsy value
  // (`throw null`, `""`), which must still trip the boundary.
  hasError: boolean;
  error: unknown;
}

class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    // Always surface the real error — this is the diagnostic that was missing.
    console.error("[RouteErrorBoundary] route failed to render:", error, info.componentStack);
    try {
      const message = error instanceof Error ? error.message : String(error);
      trackEvent("route_error", {
        error_message: message.slice(0, 300),
        route: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
    } catch {
      /* analytics must never mask the original error */
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="flex flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: "100vh", background: "#0a0a0a" }}
      >
        <p
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] mb-4"
          style={{ color: "#c9a96e" }}
        >
          Something Went Wrong
        </p>

        <h1
          className="font-serif text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "#fafafa" }}
        >
          This page didn't load
        </h1>

        <p
          className="font-sans text-[15px] leading-relaxed mb-8 max-w-[46ch]"
          style={{ color: "#e0e0e0" }}
        >
          Something broke on our end, not yours. Reloading usually fixes it — and the
          rest of the site is still right here.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/blog"
            className="font-sans text-[13px] font-semibold px-8 py-4 transition-all hover:-translate-y-1"
            style={{
              background: "#eb1887",
              color: "#fff",
              borderRadius: "50px",
              boxShadow: "0 4px 24px rgba(235,24,135,0.3)",
            }}
          >
            Back to the Blog
          </Link>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="font-sans text-[13px] font-semibold px-8 py-4 transition-all hover:-translate-y-1"
            style={{
              background: "transparent",
              color: "#fafafa",
              borderRadius: "50px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            Reload the page
          </button>
        </div>
      </div>
    );
  }
}

export default RouteErrorBoundary;
