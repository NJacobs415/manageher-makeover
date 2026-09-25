import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ChapterOneForm from "@/components/book/ChapterOneForm";
import useCountdown, { CULTIVATE_HER_LAUNCH } from "@/hooks/useCountdown";
import { trackEvent } from "@/lib/analytics";
import cultivateCover from "@/assets/the-cultivate-her-cover.webp";

/**
 * Sitewide launch popup for The Cultivate Her.
 *
 * Opens once per visitor on the first of: 7s on page, 45% scroll, or exit intent
 * (desktop mouse leaving via the top edge). Suppressed on /book (inline form lives
 * there) and on blog posts (quiz gate already asks for email). Dismiss = quiet for
 * 7 days; signup = quiet for 60 days. Storage failures never break the page.
 */
const STORAGE_KEY = "tmh_cultivate_popup";
const DISMISS_DAYS = 7;
const SIGNUP_DAYS = 60;
const DELAY_MS = 7000;
const SCROLL_PCT = 0.45;
const SUPPRESSED_PREFIXES = ["/book", "/blog/"];

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
  const countdown = useCountdown(CULTIVATE_HER_LAUNCH);

  const suppressedRoute = SUPPRESSED_PREFIXES.some((p) => pathname.startsWith(p));

  const show = useCallback((trigger: string) => {
    if (firedRef.current) return;
    firedRef.current = true;
    setOpen(true);
    try { trackEvent("popup_view", { popup: "cultivate_her_chapter1", trigger }); } catch { /* noop */ }
  }, []);

  // Closing after a successful signup (X / ESC / backdrop on the success card)
  // must keep the 60-day window, not downgrade it to a 7-day dismiss.
  const close = useCallback((reason: "dismiss" | "signup") => {
    setOpen(false);
    const signedUp = reason === "signup" || signedUpRef.current;
    suppressFor(signedUp ? SIGNUP_DAYS : DISMISS_DAYS);
    if (!signedUp) {
      try { trackEvent("popup_dismiss", { popup: "cultivate_her_chapter1" }); } catch { /* noop */ }
    }
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
              className="relative flex items-center justify-center p-8 md:p-10 overflow-hidden"
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
                  width={800}
                  height={1200}
                  className="w-36 md:w-52 block"
                  style={{ borderRadius: "3px 8px 8px 3px", boxShadow: "0 30px 70px rgba(0,0,0,0.65)" }}
                />
              </div>
            </div>

            {/* ── Content panel ── */}
            <div className="p-7 sm:p-9 md:p-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: "#c9a96e" }}>
                Book Two · November 20, 2026
              </p>
              <h2
                id="tmh-popup-title"
                className="font-serif text-2xl sm:text-3xl md:text-[34px] font-bold leading-tight mb-3"
                style={{ color: "#fafafa" }}
              >
                Read Chapter 1 of The Cultivate Her <em style={{ color: "#c9a96e", fontStyle: "italic" }}>before anyone</em>.
              </h2>
              <p className="font-sans text-[14px] leading-relaxed mb-5" style={{ color: "#888" }}>
                Aimee's second book puts the ladder down. Get the opening chapter now and hold your place for launch day.
              </p>

              {/* countdown */}
              <div className="grid grid-cols-4 gap-2 mb-6 max-w-[360px]">
                {[
                  { val: countdown.days, label: "Days" },
                  { val: countdown.hours, label: "Hrs" },
                  { val: countdown.mins, label: "Min" },
                  { val: countdown.secs, label: "Sec" },
                ].map((u) => (
                  <div
                    key={u.label}
                    className="text-center py-3"
                    style={{ background: "#161616", borderRadius: 12, border: "1px solid rgba(201,169,110,0.12)" }}
                  >
                    <div className="font-serif text-xl sm:text-2xl font-bold tabular-nums" style={{ color: "#c9a96e" }}>
                      {u.val}
                    </div>
                    <div className="font-sans text-[9px] uppercase tracking-[0.15em]" style={{ color: "#777" }}>
                      {u.label}
                    </div>
                  </div>
                ))}
              </div>

              <ChapterOneForm variant="dark" source="popup-cultivate-her" onSuccess={() => { signedUpRef.current = true; suppressFor(SIGNUP_DAYS); }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
