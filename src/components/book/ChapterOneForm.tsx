import { useState, type FormEvent } from "react";
import { trackNewsletterSignup, trackEvent } from "@/lib/analytics";

/**
 * Chapter 1 + waitlist capture for The Cultivate Her.
 * Posts to the GHL inbound-webhook trigger on workflow
 * "Cultivate Her – Chapter 1 + Waitlist" (b05a6be2…). GHL creates/updates the
 * contact, tags it, and sends the chapter by email. Nothing is stored client-side.
 */
const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/JzYUXEAehZEve2vuOdqM/webhook-trigger/tuUn3HS9CxHYRFIKI09h";

type Status = "idle" | "submitting" | "success" | "error";

const inputStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "50px",
  color: "#1a1a1a",
  outline: "none",
  height: "52px",
} as const;

export default function ChapterOneForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!firstName.trim() || !isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim().toLowerCase(),
          source: "book-page-free-chapter",
          page: typeof window !== "undefined" ? window.location.pathname : "/book",
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      setStatus("success");
      try {
        trackNewsletterSignup("cultivate_her_chapter1");
        trackEvent("chapter_download", { book: "the_cultivate_her", chapter: 1 });
      } catch {
        /* analytics must never break the page */
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="max-w-md mx-auto text-center px-8 py-8"
        style={{ background: "#fff", border: "1px solid rgba(201,169,110,0.35)", borderRadius: "24px" }}
      >
        <p className="font-serif text-2xl font-bold mb-2" style={{ color: "#1a1a1a" }}>
          Check your inbox, {firstName.trim()}.
        </p>
        <p className="font-sans text-[14px] leading-relaxed" style={{ color: "#666" }}>
          Chapter One is on its way. You're on the launch list too — you'll hear from Aimee first on November 20.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          name="firstName"
          autoComplete="given-name"
          placeholder="First name"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value); if (status === "error") setStatus("idle"); }}
          aria-label="First name"
          required
          className="sm:w-[38%] px-6 font-sans text-sm"
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
          aria-label="Email address"
          required
          className="sm:flex-1 px-6 font-sans text-sm"
          style={inputStyle}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-glow mt-3 w-full sm:w-auto sm:min-w-[220px] mx-auto block px-8 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] bg-brand-pink text-primary-foreground hover:bg-brand-pink/90 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-wait"
        style={{ borderRadius: "50px", height: "52px" }}
      >
        {status === "submitting" ? "Sending…" : "Send Me Chapter 1 →"}
      </button>
      <p
        className="font-sans text-[12px] mt-4 min-h-[18px]"
        style={{ color: status === "error" ? "#eb1887" : "#999" }}
        aria-live="polite"
      >
        {status === "error"
          ? "Please enter your first name and a valid email, then try again."
          : "No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}
