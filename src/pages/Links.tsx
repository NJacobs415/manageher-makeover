// ——— Link in Bio Page ———
// src/pages/Links.tsx
// Mobile-first social link hub — no Navbar/Footer, standalone experience

import { useEpisodeCount } from "@/hooks/useEpisodeCount";
import SEO from "@/components/SEO";
import SPOTIFY_LOGO from "@/assets/logo-spotify.png";
import APPLE_LOGO from "@/assets/logo-apple-podcasts.svg";
import AMAZON_LOGO from "@/assets/logo-amazon-music.png";
import YOUTUBE_LOGO from "@/assets/logo-youtube.png";

const M_LOGO = "/M_Logo_Pink.png";
const BOOK_COVER =
  "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a714ae8e39698a8fbfa2bb.png";
const PODCAST_COVER =
  "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69cd4eb42a8b88b665e50461.png";

const Links = () => {
  const episodeCount = useEpisodeCount();

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: "#0a0a0a",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
      }}
    >
      <SEO
        title="Links | The Manage Her®"
        description="All the links for The Manage Her® — podcast, book, social media, and more."
        url="https://themanageher.com/links"
      />
      <style>{`
        @keyframes tmhPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(235,24,135,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(235,24,135,0); }
        }
        @keyframes tmhFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tmh-link-fade { opacity: 0; animation: tmhFadeUp 0.6s ease forwards; }
        .tmh-link-d1 { animation-delay: 0.1s; }
        .tmh-link-d2 { animation-delay: 0.2s; }
        .tmh-link-d3 { animation-delay: 0.3s; }
        .tmh-link-d4 { animation-delay: 0.4s; }
        .tmh-link-d5 { animation-delay: 0.5s; }
        .tmh-link-d6 { animation-delay: 0.6s; }
        .tmh-link-d7 { animation-delay: 0.7s; }
        .tmh-link-d8 { animation-delay: 0.8s; }
      `}</style>

      <div className="w-full max-w-[420px] mx-auto px-5 py-10">
        {/* ── Avatar + Brand ── */}
        <div className="text-center mb-6 tmh-link-fade tmh-link-d1">
          <div
            className="w-20 h-20 mx-auto mb-4 flex items-center justify-center"
            style={{
              borderRadius: "50%",
              border: "2px solid #eb1887",
              padding: "3px",
              animation: "tmhPulse 3s ease-in-out infinite",
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                borderRadius: "50%",
                background: "#111",
              }}
            >
              <img
                src={M_LOGO}
                alt="The Manage Her"
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
          <h1
            className="text-xl font-bold mb-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#fafafa",
            }}
          >
            The Manage Her<span style={{ fontSize: "0.45em", verticalAlign: "super", color: "#eb1887" }}>®</span>
          </h1>
          <p
            className="text-sm mb-1"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              color: "#c9a96e",
            }}
          >
            Aimee Rickabus
          </p>
          <p
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "#888" }}
          >
            CEO · Bestselling Author · Podcast Host · Mother of Six
          </p>
        </div>

        {/* ── Stats Strip ── */}
        <div
          className="flex justify-center gap-0 mb-6 tmh-link-fade tmh-link-d2"
          style={{
            background: "#111",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.04)",
            overflow: "hidden",
          }}
        >
          {[
            { num: "9-Figure", label: "Company" },
            { num: "6 Kids", label: "Mom Life" },
            { num: `${episodeCount}+`, label: "Episodes" },
            { num: "★ 5.0", label: "Apple Rating" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex-1 text-center py-3 relative"
            >
              <p
                className="text-sm font-bold"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#fafafa",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {stat.num}
              </p>
              <p
                className="text-[8px] uppercase tracking-[0.15em] mt-1"
                style={{ color: "#888", whiteSpace: "nowrap" }}
              >
                {stat.label}
              </p>
              {i < 3 && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-6"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(255,255,255,0.06), transparent)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Social Icons ── */}
        <div className="flex justify-center gap-2.5 mb-6 tmh-link-fade tmh-link-d3">
          {[
            {
              href: "https://www.instagram.com/themanageher/",
              label: "Instagram",
              path: "M7.8 2h8.4C19 2 22 5 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C5 22 2 19 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
            },
            {
              href: "https://www.youtube.com/@TheManageHer",
              label: "YouTube",
              path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58M9.75 15.02V8.98L15.5 12l-5.75 3.02",
            },
            {
              href: "https://www.tiktok.com/@themanageher",
              label: "TikTok",
              path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.11V9a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.33 6.34 6.34 6.34 0 0 0 6.33 6.34A6.34 6.34 0 0 0 15.8 15.3V8.73a8.19 8.19 0 0 0 4.79 1.54V6.82a4.84 4.84 0 0 1-1-.13",
            },
            {
              href: "https://www.linkedin.com/company/themanageher",
              label: "LinkedIn",
              path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4",
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.015)",
                color: "#888",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(235,24,135,0.25)";
                e.currentTarget.style.color = "#eb1887";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#888";
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          className="w-full h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(235,24,135,0.15), rgba(201,169,110,0.1), transparent)",
          }}
        />

        {/* ── Featured: Book ── */}
        <div className="mb-4 tmh-link-fade tmh-link-d4">
          <p
            className="text-[9px] uppercase tracking-[0.35em] text-center mb-3 font-semibold"
            style={{ color: "#eb1887" }}
          >
            ✦ Featured ✦
          </p>
          <a
            href="https://a.co/d/by5X0fV"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(235,24,135,0.04))",
              borderRadius: "16px",
              border: "1px solid rgba(201,169,110,0.12)",
            }}
          >
            <img
              src={BOOK_COVER}
              alt="The Manage Her Book"
              className="w-16 h-20 object-cover"
              style={{ borderRadius: "8px" }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-[9px] uppercase tracking-[0.15em] mb-1"
                style={{ color: "#c9a96e" }}
              >
                Bestselling Book
              </p>
              <p
                className="text-sm font-bold mb-1"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#fafafa",
                }}
              >
                The Manage Her<span style={{ fontSize: "0.5em", verticalAlign: "super" }}>®</span>
              </p>
              <p className="text-[11px]" style={{ color: "#888" }}>
                Unveiling Invisible Labor & Sparking a Leadership Revolution
              </p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>

        {/* ── Featured: Podcast ── */}
        <div className="mb-6 tmh-link-fade tmh-link-d5">
          <a
            href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, rgba(235,24,135,0.06), rgba(201,169,110,0.03))",
              borderRadius: "16px",
              border: "1px solid rgba(235,24,135,0.1)",
            }}
          >
            <img
              src={PODCAST_COVER}
              alt="The Manage Her Podcast"
              className="w-16 h-16 object-cover"
              style={{ borderRadius: "12px" }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-[9px] uppercase tracking-[0.15em] mb-1"
                style={{ color: "#eb1887" }}
              >
                New Episodes Weekly
              </p>
              <p
                className="text-sm font-bold mb-1"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#fafafa",
                }}
              >
                The Manage Her<span style={{ fontSize: "0.5em", verticalAlign: "super" }}>®</span> Podcast
              </p>
              <p className="text-[11px]" style={{ color: "#888" }}>
                Real conversations on leadership, motherhood & purpose
              </p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>

        {/* ── Listen & Follow ── */}
        <div className="mb-6 tmh-link-fade tmh-link-d6">
          <p
            className="text-[9px] uppercase tracking-[0.25em] text-center mb-3 font-semibold"
            style={{ color: "#888" }}
          >
            Listen & Follow
          </p>
          <div className="space-y-2.5">
            {[
              {
                href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ",
                logo: SPOTIFY_LOGO,
                name: "Spotify",
                desc: "Stream new episodes weekly",
              },
              {
                href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475",
                logo: APPLE_LOGO,
                name: "Apple Podcasts",
                desc: "Rate, review & subscribe",
              },
              {
                href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her",
                logo: AMAZON_LOGO,
                name: "Amazon Music",
                desc: "Listen on Alexa & more",
              },
              {
                href: "https://www.youtube.com/@TheManageHer",
                logo: YOUTUBE_LOGO,
                name: "YouTube",
                desc: "Watch full video episodes",
              },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "#111",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(235,24,135,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] font-semibold"
                    style={{ color: "#fafafa" }}
                  >
                    {platform.name}
                  </p>
                  <p className="text-[10px]" style={{ color: "#888" }}>
                    {platform.desc}
                  </p>
                </div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#888"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Explore ── */}
        <div className="mb-6 tmh-link-fade tmh-link-d7">
          <p
            className="text-[9px] uppercase tracking-[0.25em] text-center mb-3 font-semibold"
            style={{ color: "#888" }}
          >
            Explore
          </p>
          <div className="space-y-2.5">
            {[
              {
                href: "https://themanageher.com",
                name: "TheManageHer.com",
                desc: "The full experience",
              },
              {
                href: "https://themanageher.com/about",
                name: "About Aimee",
                desc: "The story behind the movement",
              },
              {
                href: "https://themanageher.com/press",
                name: "Press & Speaking",
                desc: "Book Aimee for your event",
              },
              {
                href: "mailto:info@themanageher.com",
                name: "Contact",
                desc: "info@themanageher.com",
              },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "#111",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                }}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] font-semibold"
                    style={{ color: "#fafafa" }}
                  >
                    {link.name}
                  </p>
                  <p className="text-[10px]" style={{ color: "#888" }}>
                    {link.desc}
                  </p>
                </div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#888"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Quote ── */}
        <div className="text-center py-6 mb-6 tmh-link-fade tmh-link-d8 relative">
          <div
            className="absolute top-0 left-[10%] right-[10%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(235,24,135,0.1), transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-[10%] right-[10%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,169,110,0.08), transparent)",
            }}
          />
          <p
            className="text-3xl leading-none mb-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#eb1887",
              opacity: 0.15,
            }}
          >
            "
          </p>
          <p
            className="text-base leading-relaxed max-w-[300px] mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Women aren't becoming leaders. They{" "}
            <em style={{ color: "#eb1887" }}>already are</em>.
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.2em] mt-3"
            style={{ color: "#888" }}
          >
            — Aimee Rickabus
          </p>
        </div>

        {/* ── Newsletter CTA ── */}
        <div className="text-center mb-8">
          <h3
            className="text-lg font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#fafafa",
            }}
          >
            Join the <em style={{ color: "#eb1887", fontStyle: "italic" }}>movement</em>
          </h3>
          <p
            className="text-[12px] mb-4"
            style={{ color: "#888" }}
          >
            Get weekly insights on leadership, invisible labor & building the life you deserve.
          </p>
          <a
            href="https://themanageher.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-3.5 transition-all duration-300 hover:shadow-lg"
            style={{
              background: "#eb1887",
              color: "#fff",
              borderRadius: "50px",
              boxShadow: "0 0 30px rgba(235,24,135,0.3)",
            }}
          >
            Subscribe
          </a>
        </div>

        {/* ── Footer ── */}
        <div className="text-center pb-6">
          <p
            className="text-xs font-bold mb-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#fafafa",
            }}
          >
            The Manage Her<span style={{ fontSize: "0.5em", verticalAlign: "super", color: "#eb1887" }}>®</span>
          </p>
          <p className="text-[10px]" style={{ color: "#888" }}>
            © 2026 The Manage Her®. Be Bold, Take Chances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Links;
