// ─── 404 Not Found Page ───
// src/pages/NotFound.tsx
// Dark editorial 404 with floating particles, gradient-filled "404" background element,
// and quick navigation pills.

import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import SEO from "@/components/SEO";
import { ArrowRight } from "lucide-react";

// Keyframes for floating particles. 3 distinct drift paths are reused across 6 particles
// to vary the motion without duplicating identical animations.
const particleCss = `
@keyframes tmh-particle-drift-1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -22px); }
}
@keyframes tmh-particle-drift-2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, -12px); }
}
@keyframes tmh-particle-drift-3 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(8px, -28px); }
}
.tmh-particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(0.5px);
}
`;

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Podcast", to: "/podcast" },
  { label: "Book", to: "/book" },
  { label: "Blog", to: "/blog" },
  { label: "Press & Speaking", to: "/press" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    document.title = "Page Not Found | The Manage Her® Podcast";
  }, [location.pathname]);

  return (
    <div className="overflow-x-hidden page-enter">
      <SEO
        title="Page Not Found | The Manage Her®"
        description="The page you're looking for has wandered off. Explore our podcast, book, and blog instead."
        noindex
      />
      <style>{particleCss}</style>
      <Navbar />

      <section
        className="relative flex items-center justify-center px-6 overflow-hidden"
        style={{
          background: "#0a0a0a",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        {/* Pink radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(235,24,135,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Floating particles — subtle drifting accents */}
        <div
          className="tmh-particle"
          style={{
            width: "8px",
            height: "8px",
            top: "18%",
            left: "14%",
            background: "#eb1887",
            opacity: 0.5,
            animation: "tmh-particle-drift-1 7s ease-in-out infinite",
          }}
        />
        <div
          className="tmh-particle"
          style={{
            width: "12px",
            height: "12px",
            top: "26%",
            right: "16%",
            background: "#c9a96e",
            opacity: 0.35,
            animation: "tmh-particle-drift-2 9s ease-in-out infinite",
          }}
        />
        <div
          className="tmh-particle"
          style={{
            width: "6px",
            height: "6px",
            bottom: "28%",
            left: "22%",
            background: "#eb1887",
            opacity: 0.45,
            animation: "tmh-particle-drift-3 11s ease-in-out infinite",
          }}
        />
        <div
          className="tmh-particle"
          style={{
            width: "10px",
            height: "10px",
            bottom: "22%",
            right: "18%",
            background: "#c9a96e",
            opacity: 0.4,
            animation: "tmh-particle-drift-1 8s ease-in-out infinite",
          }}
        />
        <div
          className="tmh-particle"
          style={{
            width: "5px",
            height: "5px",
            top: "52%",
            left: "8%",
            background: "#eb1887",
            opacity: 0.4,
            animation: "tmh-particle-drift-2 10s ease-in-out infinite",
          }}
        />
        <div
          className="tmh-particle"
          style={{
            width: "14px",
            height: "14px",
            top: "62%",
            right: "10%",
            background: "#c9a96e",
            opacity: 0.25,
            animation: "tmh-particle-drift-3 12s ease-in-out infinite",
          }}
        />

        {/* Giant 404 background element — gradient-filled text at 15% opacity */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="font-serif font-bold"
            style={{
              fontSize: "clamp(8rem, 20vw, 15rem)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              background:
                "linear-gradient(135deg, #eb1887 0%, #c9a96e 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              opacity: 0.15,
            }}
          >
            404
          </span>
        </div>

        {/* Foreground content */}
        <div className="relative z-10 max-w-[700px] mx-auto text-center py-20">
          <TextReveal delay={100}>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-6"
              style={{ color: "#c9a96e" }}
            >
              Lost, Not Forgotten
            </p>
          </TextReveal>

          <TextReveal delay={200}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              This page wandered{" "}
              <em className="text-brand-pink italic">off</em>.
            </h1>
          </TextReveal>

          <FadeIn delay={400} y={20}>
            <p
              className="text-lg md:text-xl mb-10 max-w-md mx-auto"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                color: "#999",
                lineHeight: "1.8",
              }}
            >
              Even the best leaders take a wrong turn sometimes. Let's get you
              back on track.
            </p>
          </FadeIn>

          {/* Primary CTA */}
          <FadeIn delay={600} y={20}>
            <Link
              to="/"
              className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 transition-colors mb-12"
              style={{ borderRadius: "50px" }}
            >
              Go Home <ArrowRight size={14} />
            </Link>
          </FadeIn>

          {/* Quick nav pills */}
          <FadeIn delay={700} y={15}>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.2em] mb-4"
              style={{ color: "#666" }}
            >
              Or explore
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] px-5 py-2.5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "#111",
                    borderRadius: "50px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#999",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(235,24,135,0.3)";
                    e.currentTarget.style.color = "#eb1887";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#999";
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound;
