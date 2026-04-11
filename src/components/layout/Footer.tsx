import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import FadeIn from "@/components/animations/FadeIn";

// Gold gradient hairline used for top + bottom-bar dividers
const goldDivider =
  "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)";

// Minimal filled TikTok glyph (lucide doesn't ship one)
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.971-1.166-1.956-1.282-2.645h.004C16.366 1.182 16.4 1 16.4 1h-3.353v12.976c0 .174 0 .345-.007.515 0 .02-.002.04-.004.06-.002.023 0 .046-.003.07v.005a2.844 2.844 0 0 1-1.43 2.255 2.79 2.79 0 0 1-1.383.362c-1.545 0-2.798-1.261-2.798-2.818 0-1.557 1.253-2.818 2.798-2.818.293 0 .575.045.84.13l.005-3.415a6.232 6.232 0 0 0-.845-.05c-3.432 0-6.218 2.804-6.218 6.253 0 2.117 1.042 3.993 2.641 5.148a6.196 6.196 0 0 0 3.577 1.105c3.433 0 6.218-2.804 6.218-6.253V7.69a9.64 9.64 0 0 0 2.13 1.303 9.61 9.61 0 0 0 3.152.768V6.37a5.11 5.11 0 0 1-2.303-.808z" />
  </svg>
);

const Footer = () => (
  <footer>
    {/* ═══════ NEWSLETTER ═══════ */}
    <section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Oversized background wordmark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-serif text-[20vw] font-bold italic whitespace-nowrap"
          style={{ color: "rgba(255,255,255,0.02)" }}
        >
          ManageHer
        </span>
      </div>

      <FadeIn className="relative z-10 max-w-lg mx-auto text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-pink mb-4">
          Join the Movement
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
          Leadership insights, delivered{" "}
          <em className="text-brand-pink italic">weekly.</em>
        </h2>
        <p
          className="font-sans text-sm mb-8 leading-relaxed"
          style={{ color: "#888" }}
        >
          No fluff. Just the strategies, stories, and permission slips you need
          to lead boldly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Your email"
            className="h-12 px-5 font-sans text-sm flex-1 text-white placeholder:text-white/40 focus-visible:ring-brand-pink"
            style={{
              background: "#161616",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          />
          <button
            className="btn-glow bg-brand-pink text-white h-12 px-8 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-brand-pink/90 transition-colors whitespace-nowrap"
            style={{ borderRadius: "50px" }}
          >
            Subscribe
          </button>
        </div>
      </FadeIn>
    </section>

    {/* ═══════ FOOTER GRID ═══════ */}
    <div
      className="relative py-16 px-6"
      style={{ background: "#0a0a0a" }}
    >
      {/* Gold gradient top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: goldDivider }}
      />

      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <img
              src="/M_Logo_White.png"
              alt=""
              aria-hidden="true"
              style={{
                height: "28px",
                width: "auto",
                mixBlendMode: "screen",
              }}
            />
            <span className="font-serif text-lg">
              <span style={{ color: "#c9a96e" }}>The Manage</span>
              <em className="text-brand-pink italic">Her</em>
              <span className="text-brand-pink text-[8px] align-super">®</span>
            </span>
          </div>
          <p
            className="font-sans text-xs mt-3 leading-relaxed max-w-xs"
            style={{ color: "#666" }}
          >
            The leadership revolution starts here.
          </p>
          <div className="flex gap-4 mt-5">
            {[
              {
                Icon: Instagram,
                href: "https://www.instagram.com/themanageher/",
                label: "Instagram",
              },
              {
                Icon: Youtube,
                href: "https://www.youtube.com/@TheManageHer",
                label: "YouTube",
              },
              {
                Icon: TikTokIcon,
                href: "https://www.tiktok.com/@themanageher",
                label: "TikTok",
              },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/company/themanageher",
                label: "LinkedIn",
              },
              {
                Icon: Mail,
                href: "mailto:info@themanageher.com",
                label: "Email",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors hover:text-brand-pink"
                style={{ color: "#888" }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <p
            className="font-sans text-[10px] uppercase tracking-[0.2em] mb-4"
            style={{ color: "#c9a96e" }}
          >
            Navigate
          </p>
          {[
            { label: "About", path: "/about" },
            { label: "Podcast", path: "/podcast" },
            { label: "Book", path: "/book" },
            { label: "Press & Speaking", path: "/press" },
          ].map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="block font-sans text-sm mb-2.5 transition-colors hover:text-white"
              style={{ color: "#888" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Listen */}
        <div>
          <p
            className="font-sans text-[10px] uppercase tracking-[0.2em] mb-4"
            style={{ color: "#c9a96e" }}
          >
            Listen
          </p>
          {[
            {
              label: "Apple Podcasts",
              href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475",
            },
            {
              label: "Spotify",
              href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ",
            },
            {
              label: "Amazon Music",
              href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her",
            },
            { label: "YouTube", href: "https://www.youtube.com/@TheManageHer" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-sans text-sm mb-2.5 transition-colors hover:text-white"
              style={{ color: "#888" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Connect */}
        <div>
          <p
            className="font-sans text-[10px] uppercase tracking-[0.2em] mb-4"
            style={{ color: "#c9a96e" }}
          >
            Connect
          </p>
          <a
            href="mailto:info@themanageher.com"
            className="block font-sans text-sm mb-2.5 transition-colors hover:text-white"
            style={{ color: "#888" }}
          >
            info@themanageher.com
          </a>
          <a
            href="tel:+13103656368"
            className="block font-sans text-sm transition-colors hover:text-white"
            style={{ color: "#888" }}
          >
            (310) 365-6368
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative max-w-[1400px] mx-auto mt-12 pt-6">
        {/* Gold gradient divider */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: goldDivider }}
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="font-sans text-[10px] tracking-wide"
            style={{ color: "#555" }}
          >
            © {new Date().getFullYear()} The Manage Her
            <span className="text-[8px] align-super">®</span> — Be Bold, Take
            Chances.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-sans text-[10px] tracking-wide transition-colors hover:text-white"
              style={{ color: "#555" }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-sans text-[10px] tracking-wide transition-colors hover:text-white"
              style={{ color: "#555" }}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
