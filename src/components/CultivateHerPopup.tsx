import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { trackBookClick, trackEvent } from "@/lib/analytics";
import cultivateCover from "@/assets/the-cultivate-her-cover-preorder.webp";

/**
 * Sitewide launch announcement for The Cultivate Her (out Nov 20, 2026).
 *
 * Cover, "out now" copy, and two CTAs: buy on Amazon (gold primary) and the free
 * Companion Workbook (outline). Opens once per visitor on the first of: 7s on page,
 * 45% scroll, or exit intent (desktop mouse leaving via the top edge). Suppressed on
 * /book, blog posts and /links, which carry their own Cultivate Her CTAs.
 * Dismiss = quiet for 7 days; clicking either CTA counts as a conversion = quiet for
 * 60 days (the popup stays open). Storage failures never break the page.
 */
// New key (was "tmh_cultivate_popup" pre-launch) so visitors who dismissed the
// pre-launch popup still see the launch announcement once.
const STORAGE_KEY = "tmh_cultivate_popup_launch";
const POPUP_ID = "cultivate_her_launch";
const DISMISS_DAYS = 7;
const SIGNUP_DAYS = 60;
const DELAY_MS = 7000;
const SCROLL_PCT = 0.45;
const SUPPRESSED_PREFIXES = ["/book", "/blog/", "/links"];

function readSuppressedUntil(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? Number(raw) || 0 : 0;
  } catch {
    return 0;
  }
}
function suppressFor(days: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + days * 86400000));
  } catch {
    /* private mode etc. — fine, it'll just show again */
  }
}

export default function CultivateHerPopup() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const firedRef = useRef(false);
  const signedUpRef = useRef(false);

  const suppressedRoute = SUPPRESSED_PREFIXES.some((p) => pathname.startsWith(p));

  const show = useCallback((trigger: string) => {
    if (firedRef.current) return;
    firedRef.current = true;
    setOpen(true);
    try { trackEvent("popup_view", { popup: POPUP_ID, trigger }); } catch { /* noop */ }
  }, []);

  // Closing after a CTA click (X / ESC / backdrop) must keep the 60-day window,
  // not downgrade it to a 7-day dismiss.
  const close = useCallback((reason: "dismiss" | "signup") => {
    setOpen(false);
    const signedUp = reason === "signup" || signedUpRef.current;
    suppressFor(signedUp ? SIGNUP_DAYS : DISMISS_DAYS);
    if (!signedUp) {
      try { trackEvent("popup_dismiss", { popup: POPUP_ID }); } catch { /* noop */ }
    }
  }, []);

  // A click on either CTA is a conversion; the popup stays open (links open in a new tab).
  const convert = useCallback(() => {
    signedUpRef.current = true;
    suppressFor(SIGNUP_DAYS);
  }, []);

  // Arm triggers
  useEffect(() => {
    if (suppressedRoute || firedRef.current) return;
    if (readSuppressedUntil() > Date.now()) return;

    const timer = window.setTimeout(() => show("timer"), DELAY_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_PCT) show("scroll");
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.matchMedia("(pointer: fine)").matches) show("exit_intent");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [suppressedRoute, show]);

  // ESC + scroll lock while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close("dismiss");
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  if (suppressedRoute) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => close("dismiss")}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tmh-popup-title"
            className="relative w-full max-w-[880px] max-h-[92vh] overflow-y-auto grid grid-cols-1 md:grid-cols-[300px_1fr]"
            style={{
              background: "#0a0a0a",
              border: "1px solid rgba(201,169,110,0.22)",
              borderRadius: "24px",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(201,169,110,0.08)",
            }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => close("dismiss")}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
              style={{ color: "#888" }}
            >
              <X size={18} />
            </button>

            {/* ── Cover panel ── */}
            <div
              className="hidden md:flex relative items-center justify-center p-8 md:p-10 overflow-hidden"
              style={{ background: "#111", borderRadius: "24px 24px 0 0" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(201,169,110,0.16) 0%, transparent 65%)" }}
              />
              <div className="relative" style={{ padding: 8, border: "1px solid rgba(201,169,110,0.4)", borderRadius: 6 }}>
                <img
                  src={cultivateCover}
                  alt="The Cultivate Her — Book Two by Aimee Rickabus"
                  width={360}
                  height={576}
                  className="w-36 md:w-52 block"
                  style={{ borderRadius: "3px 8px 8px 3px", boxShadow: "0 30px 70px rgba(0,0,0,0.65)" }}
                />
              </div>
            </div>

            {/* ── Content panel ── */}
            <div className="p-6 sm:p-9 md:p-10">
              {/* mobile-only: small cover + eyebrow replace the side cover panel */}
              <div className="flex items-center gap-4 mb-4 md:hidden">
                <img src={cultivateCover} alt="" width={360} height={576} className="w-14 h-[84px] object-cover flex-shrink-0" style={{ borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }} />
                <p className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: "#c9a96e" }}>Book Two · Out Now</p>
              </div>
              <p className="hidden md:block font-sans text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: "#c9a96e" }}>
                Book Two · Out Now
              </p>
              <h2
                id="tmh-popup-title"
                className="font-serif text-2xl sm:text-3xl md:text-[34px] font-bold leading-tight mb-3"
                style={{ color: "#fafafa" }}
              >
                The Cultivate Her is <em style={{ color: "#c9a96e", fontStyle: "italic" }}>here</em>.
              </h2>
              <p className="font-sans text-[14px] leading-relaxed mb-5" style={{ color: "#888" }}>
                You've built a full life. Is there room for you in it? Aimee's second book puts the ladder down — and it's available now.
              </p>

              <div className="flex flex-col gap-2.5 max-w-[420px]">
                <a
                  href="https://www.amazon.com/dp/B0HMZB6YSR"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    convert();
                    try { trackBookClick("popup_cultivate_her_buy"); } catch { /* analytics must never break the page */ }
                  }}
                  className="btn-glow w-full flex items-center justify-center px-4 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] transition-all whitespace-nowrap"
                  style={{ height: "52px", background: "linear-gradient(135deg, #c9a96e, #dfc08a)", color: "#0a0a0a", borderRadius: "50px", boxShadow: "0 4px 24px rgba(201,169,110,0.3)" }}
                >
                  Get it on Amazon →
                </a>
                <a
                  href="https://thecultivateher.com/#workbook"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={convert}
                  className="w-full flex items-center justify-center px-4 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 whitespace-nowrap"
                  style={{ height: "48px", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.2)", color: "#fafafa" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#eb1887";
                    e.currentTarget.style.color = "#eb1887";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.color = "#fafafa";
                  }}
                >
                  Get the free Companion Workbook
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
