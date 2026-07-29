// GuestQuizCTA — presentational CTA pointing at a guest's own external quiz.
// Used in place of EpisodeQuiz when a post carries a `guestQuiz` override.
// Gold accent (not pink): this is a third-party/authority CTA, and per the
// brand rules pink and gold are never both primary in one section.

import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export interface GuestQuiz {
  eyebrow: string;
  title: string;
  description: string;
  url: string;
  buttonLabel: string;
}

interface GuestQuizCTAProps {
  guestQuiz: GuestQuiz;
  guestName?: string;
  episodeNumber?: number;
}

export default function GuestQuizCTA({
  guestQuiz,
  guestName,
  episodeNumber,
}: GuestQuizCTAProps) {
  // Analytics must never break the outbound click.
  const handleClick = () => {
    try {
      trackEvent("guest_quiz_click", {
        guest_name: guestName,
        episode_number: episodeNumber,
        quiz_url: guestQuiz.url,
      });
    } catch {
      /* no-op — never block navigation on analytics */
    }
  };

  return (
    <div
      className="my-12"
      style={{
        background: "#111",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <div className="p-8 md:p-10 text-center">
        <p
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] mb-3"
          style={{ color: "#c9a96e" }}
        >
          {guestQuiz.eyebrow}
        </p>

        <h3
          className="font-serif text-2xl md:text-3xl font-bold mb-4"
          style={{ color: "#fafafa" }}
        >
          {guestQuiz.title}
        </h3>

        <p
          className="font-sans text-[15px] leading-relaxed mx-auto mb-8 max-w-[52ch]"
          style={{ color: "#e0e0e0" }}
        >
          {guestQuiz.description}
        </p>

        <a
          href={guestQuiz.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold px-8 py-4 transition-all hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, #c9a96e, #dfc08a)",
            color: "#0a0a0a",
            borderRadius: "50px",
            boxShadow: "0 4px 24px rgba(201,169,110,0.3)",
          }}
        >
          {guestQuiz.buttonLabel}
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
