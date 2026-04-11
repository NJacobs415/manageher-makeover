// ——— Press & Speaking Page ———
// src/pages/Press.tsx
// Premium editorial design with real speaking photos and full press copy

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Magnetic from "@/components/animations/Magnetic";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Copy,
  Check,
  Mail,
  Phone,
  Download,
  CheckCircle2,
  Users,
  Briefcase,
  Heart,
  Shield,
  Flame,
  Crown,
  MessageSquareQuote,
} from "lucide-react";

const SPEAKING_CONFERENCE = "/aimee-speaking-conference.png";
const SPEAKING_CLOSE = "/aimee-speaking-close.png";
const BOOK_COVER =
  "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a714ae8e39698a8fbfa2bb.png";

const SHORT_BIO = `Aimee Rickabus is the CEO of a nine-figure technology company serving Fortune 500 brands, and the founder of The Manage Her® — a leadership movement redefining how women lead in life, at home, and in business. She is an award-winning entrepreneur, bestselling author of The Manage Her, and host of The Manage Her® Podcast. Aimee is passionate about helping women recognize and leverage the executive-level skills they already practice daily. She brings strategic clarity, humor, and heart to every stage she steps onto.`;

const LONG_BIO = `Aimee Rickabus is a dynamic entrepreneur, mother of six, and CEO of a nine-figure IT and cybersecurity firm. Through The Manage Her® movement, she is revolutionizing the narrative around women's leadership by spotlighting the intelligence, strategy, and emotional labor women have historically performed without recognition.

She is the author of The Manage Her: Unveiling Invisible Labor & Sparking a Leadership Revolution and host of The Manage Her® Podcast, where she shares real conversations with women navigating purpose, motherhood, ambition, and wellbeing. Aimee brings a grounded yet electrifying presence to every stage, helping audiences shift from overwhelmed to unstoppable.

Aimee has been honored with the NAWBO Orange County "Remarkable Woman Award for Innovation" and speaks regularly at leadership conferences, women's summits, and corporate events nationwide.`;

const THEMES = [
  {
    num: "01",
    title: "Invisible Labor → Visible Leadership",
    desc: "Revealing how home-management skills translate directly to executive influence and strategic success.",
    accent: "pink" as const,
  },
  {
    num: "02",
    title: "Women, Money & The Power of Self-Trust",
    desc: "What happens when women finally believe they can own wealth, not just manage it.",
    accent: "gold" as const,
  },
  {
    num: "03",
    title: "Burnout-Proofing The Next Generation of Women Leaders",
    desc: "Leadership that honors the emotional, physical, spiritual, and professional realities of modern womanhood.",
    accent: "pink" as const,
  },
  {
    num: "04",
    title: "Leading from the Homefront",
    desc: "Stories and strategies for mothers who balance high-level leadership with being present for their families.",
    accent: "gold" as const,
  },
  {
    num: "05",
    title: "Revolutionizing Workplace Culture",
    desc: "How organizations can recognize and reward the full leadership capacity of women.",
    accent: "pink" as const,
  },
];

const PLANNER_CHECKS = [
  "High-energy, relatable speaker with national credibility",
  "Customizable topics for corporate audiences",
  "Equally impactful for women's conferences and intimate community events",
  "Professional, prepared, and delightful to collaborate with",
  "Speaks from real experience as a nine-figure tech CEO and mother of six",
];

const TAKEAWAYS = [
  { icon: Crown, title: "A New Identity as Leaders", desc: "They leave the room seeing themselves differently — and believing it." },
  { icon: Shield, title: "Confidence in Existing Skills", desc: "Recognition that they already possess what they've been searching for." },
  { icon: MessageSquareQuote, title: "Language to Self-Advocate", desc: "Words and frameworks to claim their worth in any room." },
  { icon: Heart, title: "Tools to Lead Sustainably", desc: "Practical systems that prevent burnout while accelerating growth." },
  { icon: Flame, title: "Renewed Belief", desc: "A deep, unshakeable knowing that they can thrive — not just survive." },
];

const IMPACT_AUDIENCES = [
  "CEOs and founders",
  "Corporate leaders",
  "Military spouses",
  "Working mothers",
  "Homeschooling families",
  "Women returning to the workforce",
];

const Press = () => {
  const [copiedBio, setCopiedBio] = useState<"short" | "long" | null>(null);

  const copyBio = (text: string, type: "short" | "long") => {
    navigator.clipboard.writeText(text);
    setCopiedBio(type);
    setTimeout(() => setCopiedBio(null), 2000);
  };

  return (
    <div className="overflow-x-hidden page-enter">
      <SEO
        title="Press & Speaking | The Manage Her®"
        description="Book Aimee Rickabus to speak. Keynotes on women's leadership, invisible labor, and financial confidence."
        url="https://www.themanageher.com/press"
      />
      <Navbar />

      {/* ═══════ HERO — Full-width conference photo ═══════ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={SPEAKING_CONFERENCE}
            alt="Aimee Rickabus speaking at The Manage Her conference"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.92) 100%)",
            }}
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 pb-16 md:pb-24">
          <TextReveal>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: "#c9a96e" }}
            >
              Press & Speaking
            </p>
          </TextReveal>
          <TextReveal delay={200}>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] mb-6">
              Book Aimee Rickabus
              <br />
              to <em className="text-brand-pink italic">Speak</em>
            </h1>
          </TextReveal>
          <FadeIn delay={400} y={20}>
            <p
              className="max-w-[550px] mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.15rem",
                lineHeight: "1.8",
              }}
            >
              Where leadership meets real-life womanhood. Every audience leaves
              with the same revelation: Women aren't aspiring leaders.{" "}
              <span className="text-white font-semibold">
                We're already leading.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={600} y={20}>
            <div className="flex flex-wrap gap-3">
              <Magnetic strength={0.15}>
                <a
                  href="#booking"
                  className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 transition-colors"
                  style={{ borderRadius: "50px" }}
                >
                  Request Aimee for Your Event
                </a>
              </Magnetic>
              <a
                href="#media-kit"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white border border-white/20 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all"
                style={{ borderRadius: "50px" }}
              >
                Download Media Kit
              </a>
            </div>
          </FadeIn>

          {/* Stats strip */}
          <FadeIn delay={800} y={20}>
            <div
              className="flex flex-wrap gap-8 mt-12 pt-8"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {[
                { num: "9-Figure", label: "Company" },
                { num: "6", label: "Children" },
                { num: "Fortune 500", label: "Clients Served" },
                { num: "NAWBO ★", label: "Remarkable Woman" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-serif text-xl md:text-2xl font-bold"
                    style={{ color: "#c9a96e" }}
                  >
                    {stat.num}
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/50 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ GOLD MARQUEE ═══════ */}
      <div
        className="py-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, #c9a96e, #dfc08a, #c9a96e)",
        }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[
            "Women's Leadership",
            "Invisible Labor",
            "Keynote Speaker",
            "Financial Confidence",
            "Corporate Events",
            "Entrepreneurship",
            "Motherhood & Leadership",
            "Women's Leadership",
            "Invisible Labor",
            "Keynote Speaker",
            "Financial Confidence",
            "Corporate Events",
          ].map((item, i) => (
            <span
              key={i}
              className="mx-8 font-serif text-sm md:text-base font-semibold"
              style={{ color: "#1a1a1a" }}
            >
              {item} ✦
            </span>
          ))}
        </div>
      </div>

      {/* ═══════ SPEAKING THEMES — Warm cream ═══════ */}
      <section
        className="py-20 md:py-28 px-6"
        style={{ background: "#faf8f5" }}
      >
        <div className="max-w-[1000px] mx-auto">
          <TextReveal>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4 text-center"
              style={{ color: "#c9a96e" }}
            >
              Signature Themes
            </p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight mb-16"
              style={{ color: "#1a1a1a" }}
            >
              Aimee's Speaking{" "}
              <em className="text-brand-pink italic">Themes</em>
            </h2>
          </TextReveal>

          <div className="space-y-4">
            {THEMES.map((theme, i) => (
              <FadeIn key={theme.num} delay={i * 80} y={20}>
                <div
                  className="group p-6 md:p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "#fff",
                    borderRadius: "20px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.accent === "pink"
                        ? "rgba(235,24,135,0.15)"
                        : "rgba(201,169,110,0.2)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 40px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 20px rgba(0,0,0,0.03)";
                  }}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="font-serif text-2xl md:text-3xl font-bold shrink-0"
                      style={{
                        color:
                          theme.accent === "gold" ? "#c9a96e" : "#eb1887",
                      }}
                    >
                      {theme.num}
                    </span>
                    <div>
                      <h3
                        className="font-serif text-lg md:text-xl font-bold mb-2"
                        style={{ color: "#1a1a1a" }}
                      >
                        {theme.title}
                      </h3>
                      <p
                        className="font-sans text-[14px] leading-relaxed"
                        style={{ color: "#666" }}
                      >
                        {theme.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ IMPACT — Dark section with close-up photo ═══════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <FadeIn y={30}>
              <div
                className="overflow-hidden"
                style={{ borderRadius: "24px" }}
              >
                <img
                  src={SPEAKING_CLOSE}
                  alt="Aimee Rickabus speaking on stage"
                  className="w-full"
                  style={{ aspectRatio: "4/3", objectFit: "cover" }}
                />
              </div>
            </FadeIn>

            {/* Content */}
            <div>
              <TextReveal>
                <p
                  className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4"
                  style={{ color: "#c9a96e" }}
                >
                  Impact
                </p>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  Aimee has helped women at every stage of life{" "}
                  <em className="text-brand-pink italic">
                    step into their power
                  </em>
                </h2>
              </TextReveal>
              <FadeIn delay={200} y={20}>
                <div className="space-y-3 mb-8">
                  {IMPACT_AUDIENCES.map((audience) => (
                    <div
                      key={audience}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-brand-pink shrink-0"
                      />
                      <span className="font-sans text-[14px] text-foreground/80">
                        {audience}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={400} y={20}>
                <p
                  className="font-sans text-[14px] leading-[1.9]"
                  style={{ color: "#888" }}
                >
                  Her message reshapes the way companies and communities
                  talk about women's leadership. Aimee illuminates the
                  hidden leadership women practice every day, bringing
                  humor, strategy, and lived wisdom to stages, corporate
                  events, and podcast interviews around the country.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EVENT PLANNERS — Warm cream ═══════ */}
      <section
        className="py-20 md:py-28 px-6"
        style={{ background: "#faf8f5" }}
      >
        <div className="max-w-[800px] mx-auto text-center">
          <TextReveal>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: "#c9a96e" }}
            >
              For Event Planners
            </p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-12"
              style={{ color: "#1a1a1a" }}
            >
              Why Planners{" "}
              <em className="text-brand-pink italic">Love</em> Working
              With Aimee
            </h2>
          </TextReveal>
          <div className="space-y-4 text-left max-w-[600px] mx-auto">
            {PLANNER_CHECKS.map((item, i) => (
              <FadeIn key={i} delay={i * 80} y={15}>
                <div
                  className="flex items-start gap-4 p-4"
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: "rgba(235,24,135,0.08)",
                      borderRadius: "8px",
                    }}
                  >
                    <Check size={14} className="text-brand-pink" />
                  </div>
                  <p
                    className="font-sans text-[14px] leading-relaxed"
                    style={{ color: "#3a3a3a" }}
                  >
                    {item}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SPEAKER BIOS — Dark ═══════ */}
      <section
        className="py-20 md:py-28 px-6"
        style={{ background: "#0a0a0a" }}
      >
        <div className="max-w-[900px] mx-auto">
          <TextReveal>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4 text-center"
              style={{ color: "#c9a96e" }}
            >
              Copy-Ready
            </p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-12 text-center">
              Speaker <em className="text-brand-pink italic">Bios</em>
            </h2>
          </TextReveal>

          {/* Short Bio */}
          <FadeIn delay={200} y={20}>
            <div
              className="mb-6 p-6 md:p-8 relative overflow-hidden"
              style={{
                background: "#111",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, #eb1887, #c9a96e, transparent)",
                }}
              />
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1"
                  style={{
                    background: "rgba(235,24,135,0.08)",
                    color: "#eb1887",
                    borderRadius: "50px",
                  }}
                >
                  Short Bio
                </span>
                <button
                  onClick={() => copyBio(SHORT_BIO, "short")}
                  className="flex items-center gap-1.5 font-sans text-[11px] text-muted-foreground hover:text-brand-pink transition-colors cursor-pointer"
                >
                  {copiedBio === "short" ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Bio
                    </>
                  )}
                </button>
              </div>
              <p className="font-sans text-[14px] text-foreground/70 leading-[2]">
                {SHORT_BIO}
              </p>
            </div>
          </FadeIn>

          {/* Long Bio */}
          <FadeIn delay={300} y={20}>
            <div
              className="p-6 md:p-8 relative overflow-hidden"
              style={{
                background: "#111",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, #c9a96e, #dfc08a, transparent)",
                }}
              />
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1"
                  style={{
                    background: "rgba(201,169,110,0.08)",
                    color: "#c9a96e",
                    borderRadius: "50px",
                  }}
                >
                  Full Bio
                </span>
                <button
                  onClick={() => copyBio(LONG_BIO, "long")}
                  className="flex items-center gap-1.5 font-sans text-[11px] text-muted-foreground hover:text-brand-pink transition-colors cursor-pointer"
                >
                  {copiedBio === "long" ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Bio
                    </>
                  )}
                </button>
              </div>
              {LONG_BIO.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-[14px] text-foreground/70 leading-[2] mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={400} y={10}>
            <p
              className="text-center mt-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                color: "#888",
                fontSize: "1rem",
              }}
            >
              Media inquiries? Reach out at{" "}
              <a
                href="mailto:info@themanageher.com"
                className="text-brand-pink hover:underline"
              >
                info@themanageher.com
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ AUDIENCE TAKEAWAYS — Warm cream ═══════ */}
      <section
        className="py-20 md:py-28 px-6"
        style={{ background: "#faf8f5" }}
      >
        <div className="max-w-[1000px] mx-auto">
          <TextReveal>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4 text-center"
              style={{ color: "#c9a96e" }}
            >
              What Your Audience Gets
            </p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold text-center leading-tight mb-14"
              style={{ color: "#1a1a1a" }}
            >
              Women Walk Away{" "}
              <em className="text-brand-pink italic">Transformed</em>
            </h2>
          </TextReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TAKEAWAYS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 80} y={20}>
                <div
                  className="p-6 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "#fff",
                    borderRadius: "20px",
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.03)",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(235,24,135,0.06)",
                      borderRadius: "12px",
                    }}
                  >
                    <item.icon size={20} className="text-brand-pink" />
                  </div>
                  <h3
                    className="font-serif text-base font-bold mb-2"
                    style={{ color: "#1a1a1a" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sans text-[13px] leading-relaxed"
                    style={{ color: "#666" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MEDIA KIT — Dark ═══════ */}
      <section
        id="media-kit"
        className="py-20 md:py-28 px-6"
        style={{ background: "#111" }}
      >
        <div className="max-w-[900px] mx-auto">
          <FadeIn y={30}>
            <div
              className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              style={{
                background: "#0a0a0a",
                borderRadius: "28px",
                border: "1px solid rgba(201,169,110,0.12)",
              }}
            >
              {/* Book + visual */}
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={BOOK_COVER}
                    alt="The Manage Her by Aimee Rickabus"
                    className="w-48 md:w-56"
                    style={{
                      borderRadius: "8px",
                      boxShadow:
                        "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(201,169,110,0.1)",
                    }}
                  />
                  <div
                    className="absolute -top-3 -right-3 w-48 md:w-56 h-full"
                    style={{
                      border: "1px solid rgba(201,169,110,0.15)",
                      borderRadius: "8px",
                      zIndex: -1,
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Download Aimee's{" "}
                  <em style={{ color: "#c9a96e", fontStyle: "italic" }}>
                    Media Kit
                  </em>
                </h3>
                <p className="font-sans text-[14px] text-muted-foreground leading-[1.9] mb-6">
                  Everything you need to feature, introduce, or promote
                  Aimee — from approved bios and headshots to brand
                  guidelines and speaking topics.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Short & Full Bios",
                    "High-Res Headshots",
                    "Speaking Topics",
                    "Book Cover Assets",
                    "Brand Logos",
                    "Contact Information",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                    >
                      <span style={{ color: "#c9a96e", fontSize: "0.6rem" }}>
                        ✦
                      </span>
                      <span className="font-sans text-[13px] text-foreground/60">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {/* TODO: Replace with actual media kit PDF link */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-3 transition-all"
                    style={{
                      background:
                        "linear-gradient(135deg, #c9a96e, #dfc08a)",
                      color: "#1a1a1a",
                      borderRadius: "50px",
                      boxShadow: "0 0 30px rgba(201,169,110,0.25)",
                    }}
                  >
                    <Download size={14} /> Download Media Kit
                  </a>
                  <a
                    href="mailto:info@themanageher.com?subject=Media%20Inquiry"
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-6 py-3 hover:border-brand-pink hover:text-brand-pink transition-all"
                    style={{ borderRadius: "50px" }}
                  >
                    Media Inquiry
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ BOOKING CTA — Dark with photo bg ═══════ */}
      <section
        id="booking"
        className="relative py-24 md:py-32 px-6 overflow-hidden"
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(235,24,135,0.08) 0%, rgba(10,10,10,1) 40%, rgba(10,10,10,1) 60%, rgba(201,169,110,0.06) 100%)",
          }}
        />

        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <TextReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Let's Create Something{" "}
              <em className="text-brand-pink italic">Powerful</em> Together
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p
              className="max-w-[500px] mx-auto mb-10"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                color: "#888",
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              Ready to book Aimee for your next event? Tell us about your
              audience and goals — and we'll make magic happen.
            </p>
          </FadeIn>
          <FadeIn delay={400} y={20}>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Magnetic strength={0.15}>
                <a
                  href="https://tmh.themanageher.com/widget/bookings/book-aimee-as-a-podcast-guest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 transition-colors"
                  style={{ borderRadius: "50px" }}
                >
                  Book Aimee as a Podcast Guest
                </a>
              </Magnetic>
              <Magnetic strength={0.15}>
                <a
                  href="https://tmh.themanageher.com/widget/bookings/book-with-aimee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all"
                  style={{ borderRadius: "50px" }}
                >
                  Book a 1:1 with Aimee
                </a>
              </Magnetic>
            </div>
          </FadeIn>
          <FadeIn delay={600} y={15}>
            <div
              className="flex flex-wrap justify-center gap-6"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "2rem",
              }}
            >
              <a
                href="mailto:info@themanageher.com"
                className="flex items-center gap-2 font-sans text-[12px] text-muted-foreground hover:text-brand-pink transition-colors"
              >
                <Mail size={14} /> info@themanageher.com
              </a>
              <a
                href="tel:9498680444"
                className="flex items-center gap-2 font-sans text-[12px] text-muted-foreground hover:text-brand-pink transition-colors"
              >
                <Phone size={14} /> (949) 868-0444
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Press;
