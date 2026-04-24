import { useState, useEffect, useCallback } from "react";
import { trackQuizStart, trackQuizComplete } from '@/lib/analytics';

interface QuizOption {
  text: string;
  type: string;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

interface QuizResult {
  type: string;
  title: string;
  description: string;
}

interface QuizData {
  title: string;
  description: string;
  questions: QuizQuestion[];
  results: QuizResult[];
}

interface EpisodeQuizProps {
  quiz: QuizData;
  slug: string;
  episodeNumber?: number;
  resourceUrl?: string;
}

const QUIZ_WEBHOOK = "https://services.leadconnectorhq.com/hooks/JzYUXEAehZEve2vuOdqM/webhook-trigger/f2de3459-6c4f-4b40-b9d5-c9f5843c38ec";

// Tiny sparkle burst
const Sparkles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * 360;
    const dist = 40 + Math.random() * 80;
    const size = 3 + Math.random() * 5;
    const dx = Math.cos((angle * Math.PI) / 180) * dist;
    const dy = Math.sin((angle * Math.PI) / 180) * dist;
    const color = i % 3 === 0 ? "#eb1887" : i % 3 === 1 ? "#c9a96e" : "#fff";
    return (
      <span
        key={i}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: color,
          left: "50%",
          top: "50%",
          opacity: 0,
          animation: `quiz-sparkle 0.8s ${i * 30}ms ease-out forwards`,
          // @ts-expect-error css custom properties
          "--dx": `${dx}px`,
          "--dy": `${dy}px`,
        }}
      />
    );
  });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles}
    </div>
  );
};

const sparkleKeyframes = `
@keyframes quiz-sparkle {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1); opacity: 0; }
}
`;

const EpisodeQuiz = ({
  quiz,
  slug,
  episodeNumber,
  resourceUrl,
}: EpisodeQuizProps) => {
  const [currentQ, setCurrentQ] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [slideDir, setSlideDir] = useState<"in" | "out">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const storageKey = `tmh-quiz-${slug}`;
  const totalQ = quiz.questions.length;

  // Check localStorage for returning users
  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey)) setRevealed(true);
    } catch {
      // storage unavailable
    }
  }, [storageKey]);

  const tallyResult = useCallback(
    (allAnswers: string[]) => {
      const counts: Record<string, number> = {};
      for (const t of allAnswers) counts[t] = (counts[t] || 0) + 1;
      let maxType = "";
      let maxCount = 0;
      for (const [t, c] of Object.entries(counts)) {
        if (c > maxCount) {
          maxCount = c;
          maxType = t;
        }
      }
      return quiz.results.find((r) => r.type === maxType) || quiz.results[0];
    },
    [quiz.results]
  );

  const handleSelect = (optionIdx: number, type: string) => {
    if (selected !== null) return;
    setSelected(optionIdx);

    if (answers.length === 0) {
      try {
        trackQuizStart(episodeNumber || 0, quiz.title);
      } catch (err) {
        console.warn('[analytics] quiz_start tracking failed:', err);
      }
    }

    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    setTimeout(() => {
      setSlideDir("out");
      setTimeout(() => {
        if (currentQ + 1 >= totalQ) {
          setResult(tallyResult(newAnswers));
        } else {
          setCurrentQ(currentQ + 1);
        }
        setSelected(null);
        setSlideDir("in");
      }, 250);
    }, 500);
  };

  const handleStart = () => {
    setSlideDir("out");
    setTimeout(() => {
      setCurrentQ(0);
      setSlideDir("in");
    }, 250);
  };

  const handleRetake = () => {
    setResult(null);
    setRevealed(false);
    setAnswers([]);
    setSelected(null);
    setCurrentQ(-1);
    setSlideDir("in");
    setName("");
    setEmail("");
    setFormError("");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Please enter your name");
      return;
    }
    if (!email || !email.includes("@")) {
      setFormError("Please enter a valid email");
      return;
    }
    setFormError("");
    setSubmitting(true);

    try {
      const webhookRes = await fetch(QUIZ_WEBHOOK, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email,
          episodeNumber: episodeNumber || 0,
          quizTitle: quiz.title,
          resultType: result?.type || "",
          resultName: result?.title || "",
          resultDescription: result?.description || "",
          slug,
          episodeUrl: `https://themanageher.com/blog/${slug}`,
          timestamp: new Date().toISOString(),
        }),
      });
      if (webhookRes.ok) {
        try {
          trackQuizComplete(episodeNumber || 0, quiz.title, result?.type || "");
        } catch (err) {
          console.warn('[analytics] quiz_complete tracking failed:', err);
        }
      }
    } catch {
      // Don't block UX on webhook failure
    }

    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // storage unavailable
    }

    setSubmitting(false);
    setRevealed(true);
  };

  const handleShare = async () => {
    if (!result) return;
    const text = `I'm "${result.title}"! Take the quiz: themanageher.com/blog/${slug}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  };

  useEffect(() => setCopied(false), [result]);

  const progress = result
    ? 100
    : currentQ >= 0
      ? ((currentQ + 1) / totalQ) * 100
      : 0;

  return (
    <>
      <style>{sparkleKeyframes}</style>
      <div
        className="my-12"
        style={{
          background: "#111",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Progress bar */}
        {currentQ >= 0 && (
          <div style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #eb1887, #c9a96e)",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        )}

        <div className="p-8 md:p-10">
          {/* ─── INTRO ─── */}
          {currentQ === -1 && !result && (
            <div
              className="text-center"
              style={{
                opacity: slideDir === "in" ? 1 : 0,
                transform:
                  slideDir === "in" ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.25s ease",
              }}
            >
              <p
                className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "#eb1887" }}
              >
                Interactive Quiz
              </p>
              <h3
                className="font-serif text-2xl md:text-3xl font-bold mb-3"
                style={{ color: "#fafafa" }}
              >
                {quiz.title}
              </h3>
              <p
                className="font-sans text-[14px] leading-relaxed mb-8 max-w-[500px] mx-auto"
                style={{ color: "#888" }}
              >
                {quiz.description}
              </p>
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 transition-all hover:scale-[1.02]"
                style={{
                  background: "#eb1887",
                  color: "#fff",
                  borderRadius: "50px",
                  boxShadow: "0 4px 20px rgba(235,24,135,0.3)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Take the Quiz
              </button>
              <p
                className="font-sans text-[11px] mt-4"
                style={{ color: "#555" }}
              >
                {totalQ} questions · 2 minutes
              </p>
            </div>
          )}

          {/* ─── QUESTION ─── */}
          {currentQ >= 0 && !result && (
            <div
              style={{
                opacity: slideDir === "in" ? 1 : 0,
                transform:
                  slideDir === "in" ? "translateX(0)" : "translateX(-20px)",
                transition: "all 0.25s ease",
              }}
            >
              <p
                className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                style={{ color: "#888" }}
              >
                Question {currentQ + 1}{" "}
                <span style={{ color: "#555" }}>of {totalQ}</span>
              </p>
              <h3
                className="font-serif text-xl md:text-2xl font-bold mb-8"
                style={{ color: "#fafafa", lineHeight: 1.3 }}
              >
                {quiz.questions[currentQ].question}
              </h3>
              <div className="space-y-3">
                {quiz.questions[currentQ].options.map((opt, i) => {
                  const isSelected = selected === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i, opt.type)}
                      disabled={selected !== null}
                      className="w-full text-left font-sans text-[14px] px-6 py-4 transition-all"
                      style={{
                        background: isSelected ? "#eb1887" : "#1a1a1a",
                        color: isSelected ? "#fff" : "#e0e0e0",
                        borderRadius: "16px",
                        border: isSelected
                          ? "1px solid #eb1887"
                          : "1px solid rgba(255,255,255,0.08)",
                        cursor: selected !== null ? "default" : "pointer",
                        transform: isSelected ? "scale(1.01)" : "scale(1)",
                        opacity: selected !== null && !isSelected ? 0.5 : 1,
                      }}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── RESULT (email-gated) ─── */}
          {result && (
            <div
              className="text-center relative"
              style={{
                opacity: slideDir === "in" ? 1 : 0,
                transform:
                  slideDir === "in" ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.4s ease",
              }}
            >
              {revealed && <Sparkles />}

              <p
                className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: "#c9a96e" }}
              >
                {revealed ? "Your Result" : "Results Ready!"}
              </p>
              <h3
                className="font-serif text-3xl md:text-4xl font-bold mb-2"
                style={{ color: "#eb1887" }}
              >
                {result.title}
              </h3>

              {/* Description — blurred until email submitted */}
              <div className="relative max-w-[550px] mx-auto mb-8">
                <p
                  className="font-sans text-[14px] leading-[1.8]"
                  style={{
                    color: "#ccc",
                    filter: revealed ? "blur(0px)" : "blur(8px)",
                    transition: "filter 0.8s ease",
                    userSelect: revealed ? "auto" : "none",
                  }}
                >
                  {result.description}
                </p>
                {!revealed && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(17,17,17,0.9) 80%)",
                    }}
                  />
                )}
              </div>

              {/* Email gate */}
              {!revealed && (
                <div className="max-w-[400px] mx-auto">
                  <p
                    className="font-sans text-[13px] mb-5"
                    style={{ color: "#aaa" }}
                  >
                    Enter your email to reveal your personalized result + get
                    the free episode cheat sheet
                  </p>
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full font-sans text-[14px] px-5 py-3.5 outline-none transition-all"
                      style={{
                        background: "#1a1a1a",
                        color: "#fff",
                        borderRadius: "14px",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#eb1887")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          "rgba(255,255,255,0.1)")
                      }
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full font-sans text-[14px] px-5 py-3.5 outline-none transition-all"
                      style={{
                        background: "#1a1a1a",
                        color: "#fff",
                        borderRadius: "14px",
                        border: formError
                          ? "1px solid #ff4444"
                          : "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#eb1887")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          "rgba(255,255,255,0.1)")
                      }
                    />
                    {formError && (
                      <p
                        className="font-sans text-[12px] text-left"
                        style={{ color: "#ff4444" }}
                      >
                        {formError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 transition-all hover:scale-[1.01]"
                      style={{
                        background: "#eb1887",
                        color: "#fff",
                        borderRadius: "50px",
                        boxShadow: "0 4px 20px rgba(235,24,135,0.3)",
                        border: "none",
                        cursor: submitting ? "wait" : "pointer",
                        opacity: submitting ? 0.7 : 1,
                      }}
                    >
                      {submitting ? "Revealing..." : "Reveal My Results"}
                    </button>
                  </form>
                  <p
                    className="font-sans text-[10px] mt-3"
                    style={{ color: "#555" }}
                  >
                    Join 5,000+ women. Unsubscribe anytime.
                  </p>
                </div>
              )}

              {/* Revealed actions */}
              {revealed && (
                <div
                  style={{
                    opacity: 1,
                    animation: "fadeIn 0.5s ease",
                  }}
                >
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href={`/blog/${slug}`}
                      className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-7 py-3.5 transition-all hover:scale-[1.02]"
                      style={{
                        background: "#eb1887",
                        color: "#fff",
                        borderRadius: "50px",
                        boxShadow: "0 4px 20px rgba(235,24,135,0.3)",
                        textDecoration: "none",
                      }}
                    >
                      Listen to the Episode
                    </a>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-7 py-3.5 transition-all"
                      style={{
                        background: "transparent",
                        color: "#fafafa",
                        borderRadius: "50px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        cursor: "pointer",
                      }}
                    >
                      {copied ? "Copied!" : "Share Your Result"}
                    </button>
                  </div>

                  {resourceUrl && (
                    <a
                      href={resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-[12px] mt-5 transition-colors"
                      style={{
                        color: "#c9a96e",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      Download your Episode Cheat Sheet
                    </a>
                  )}

                  <div>
                    <button
                      onClick={handleRetake}
                      className="font-sans text-[11px] mt-5 transition-colors"
                      style={{
                        color: "#555",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      Retake quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EpisodeQuiz;
