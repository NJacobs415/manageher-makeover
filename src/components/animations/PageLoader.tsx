import { useState, useEffect } from "react";
import { isPrerenderedBoot } from "@/lib/prerenderBoot";

// Shown only on the first page load of a session — after that it would just
// cover an already-painted page. Storage errors fail open (loader shows).
// Also skipped when the HTML was prerendered: the real content is already
// on screen, and covering it would be a step backwards.
const SEEN_KEY = "tmh_loader_seen";

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(() => isPrerenderedBoot() || alreadySeen());

  useEffect(() => {
    if (hidden) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* nothing to remember — it shows again next load */
    }
    // ~250ms to fill (4 ticks), then straight into the 0.8s wipe.
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setDone(true);
          setTimeout(() => setHidden(true), 850);
          return 100;
        }
        return p + Math.random() * 10 + 25;
      });
    }, 60);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
        transition: "clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    >
      <img
        src="/M_Logo_Pink-256.png"
        alt=""
        width={256}
        height={256}
        style={{
          height: "50px",
          width: "auto",
          marginBottom: "20px",
          borderRadius: "12px",
        }}
      />
      <p
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          color: "#fafafa",
          letterSpacing: "0.02em",
          marginBottom: "8px",
        }}
      >
        The Manage<em style={{ color: "#eb1887", fontStyle: "italic" }}>Her</em>
        <span
          style={{
            fontSize: "0.45em",
            verticalAlign: "super",
            fontStyle: "normal",
            color: "#eb1887",
          }}
        >
          ®
        </span>
      </p>
      <div
        style={{
          width: "180px",
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.1)",
          marginTop: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#eb1887",
            width: `${Math.min(progress, 100)}%`,
            transition: "width 0.2s ease-out",
          }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
