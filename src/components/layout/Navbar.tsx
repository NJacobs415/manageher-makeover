// ─── Site Navigation ───
// src/components/layout/Navbar.tsx
// Desktop: announcement bar + sticky nav with logo, links, Listen Now CTA
// Desktop "Books" item opens a hover/focus dropdown (The Cultivate Her, The Manage Her®).
// Mobile: full-screen overlay menu with animated hamburger, staggered link reveal,
// social icons, CTA, and copyright. Books shows its two titles as indented sub-links.

import { useState, useEffect, useRef, useId } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Youtube, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/animations/Magnetic";
import { trackSocialClick } from "@/lib/analytics";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Podcast", path: "/podcast" },
  { label: "Books", path: "/book" },
  { label: "Blog", path: "/blog" },
  { label: "Press", path: "/press" },
];

// Children of the Books item (desktop dropdown + mobile sub-links)
const bookLinks = [
  { label: "The Cultivate Her", path: "/book#the-cultivate-her", isNew: true },
  { label: "The Manage Her", path: "/book#the-manage-her", trademark: true },
];

const NewTag = () => (
  <span
    className="font-sans text-[8px] font-semibold uppercase tracking-[0.2em] px-1.5 py-[3px] leading-none rounded-full"
    style={{ color: "#c9a96e", border: "1px solid rgba(201,169,110,0.45)" }}
  >
    New
  </span>
);

// Desktop Books item: link to /book plus a dropdown that opens on hover or focus,
// closes on Escape, mouse-out, focus leaving, or navigation.
const BooksMenu = ({ active }: { active: boolean }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <Magnetic strength={0.15} className="shrink-0 inline-flex">
        <Link
          ref={triggerRef}
          to="/book"
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={menuId}
          className={cn(
            "link-reveal font-sans text-[12px] font-medium uppercase tracking-[0.15em] transition-colors whitespace-nowrap",
            active ? "text-brand-pink" : "text-foreground/60 hover:text-foreground"
          )}
        >
          Books
        </Link>
      </Magnetic>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            key="books-menu"
            className="absolute left-1/2 top-full pt-5 z-50"
            initial={{ opacity: 0, x: "-50%", y: -6 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            exit={{ opacity: 0, x: "-50%", y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul
              className="w-64 p-2 bg-background/95 backdrop-blur-lg"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
              }}
            >
              {bookLinks.map((b) => (
                <li key={b.path}>
                  <Link
                    to={b.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-serif text-[15px] font-bold text-foreground/75 hover:text-foreground hover:bg-white/5 focus-visible:text-foreground focus-visible:bg-white/5 outline-none transition-colors"
                  >
                    <span>
                      {b.label}
                      {b.trademark && <span style={{ fontSize: ".45em", verticalAlign: "super", fontStyle: "normal" }}>®</span>}
                    </span>
                    {b.isNew && <NewTag />}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile menu prepends Home so the full set of links is accessible
const mobileMenuLinks = [{ label: "Home", path: "/" }, ...navLinks];

// TikTok inline SVG (lucide doesn't ship one)
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

const socials = [
  { Icon: Instagram, href: "https://www.instagram.com/themanageher/", label: "Instagram" },
  { Icon: Youtube, href: "https://www.youtube.com/@TheManageHer", label: "YouTube" },
  { Icon: TikTokIcon, href: "https://www.tiktok.com/@themanageher", label: "TikTok" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/themanageher", label: "LinkedIn" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Track scroll state for nav background + hamburger position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu whenever the route changes
  useEffect(() => setMobileOpen(false), [location]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape key closes the mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Announcement bar ─── */}
      <div className="bg-foreground text-background text-center py-2.5 px-4 font-sans text-[11px] tracking-[0.15em] uppercase z-[60] relative">
        New episodes weekly —{" "}
        <a
          href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-brand-pink transition-colors"
        >
          Listen now
        </a>
      </div>

      {/* ─── Sticky nav bar ─── */}
      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/95 backdrop-blur-lg shadow-[0_1px_0_hsl(var(--border))]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-12 h-20">
          <Link to="/" className="shrink-0 flex items-center gap-2">
            <img
              src="/M_Logo_Pink-256.png"
              alt=""
              aria-hidden="true"
              width={256}
              height={256}
              style={{
                height: "24px",
                width: "auto",
                mixBlendMode: "screen",
              }}
            />
            <span className="font-serif text-xl md:text-2xl font-bold text-foreground tracking-tight">
              The Manage<em className="text-brand-pink">Her</em>
              <span className="text-brand-pink text-[8px] align-super">®</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-12">
              {navLinks.map((link) =>
                link.path === "/book" ? (
                  <BooksMenu key={link.path} active={location.pathname.startsWith("/book")} />
                ) : (
                <Magnetic
                  key={link.path}
                  strength={0.15}
                  className="shrink-0 inline-flex"
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "link-reveal font-sans text-[12px] font-medium uppercase tracking-[0.15em] transition-colors whitespace-nowrap",
                      location.pathname === link.path
                        ? "text-brand-pink"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </Magnetic>
                )
              )}
            </div>
            <Magnetic strength={0.15} className="shrink-0 inline-flex ml-10">
              <a
                href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-brand-pink/90 transition-colors whitespace-nowrap"
              >
                Listen Now
              </a>
            </Magnetic>
          </div>
        </div>
      </nav>

      {/* ─── Mobile hamburger (fixed, lives outside nav's stacking context) ─── */}
      <button
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        className="lg:hidden fixed flex items-center justify-center transition-all duration-300"
        style={{
          top: scrolled || mobileOpen ? "20px" : "60px",
          right: "20px",
          width: "44px",
          height: "44px",
          zIndex: 10000,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        {/* Animated 3-line hamburger */}
        <div
          className="relative"
          style={{ width: "24px", height: "18px" }}
        >
          {/* Top line */}
          <span
            className="absolute left-0 block transition-all duration-300 ease-out"
            style={{
              width: "24px",
              height: "2px",
              backgroundColor: "#fafafa",
              top: mobileOpen ? "8px" : "0",
              transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
          />
          {/* Middle line */}
          <span
            className="absolute left-0 block transition-all duration-300 ease-out"
            style={{
              width: "24px",
              height: "2px",
              backgroundColor: "#fafafa",
              top: "8px",
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? "translateX(10px)" : "translateX(0)",
            }}
          />
          {/* Bottom line */}
          <span
            className="absolute left-0 block transition-all duration-300 ease-out"
            style={{
              width: "24px",
              height: "2px",
              backgroundColor: "#fafafa",
              top: mobileOpen ? "8px" : "16px",
              transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </button>

      {/* ─── Mobile menu overlay ─── */}
      <div
        className={cn(
          "fixed inset-0 lg:hidden transition-opacity duration-500 ease-out",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          backgroundColor: "#0a0a0a",
          zIndex: 9999,
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen min-h-[100svh] px-6 py-20 overflow-y-auto">
          {/* M logo at top */}
          <img
            src="/M_Logo_Pink-256.png"
            alt=""
            aria-hidden="true"
            width={256}
            height={256}
            className="mb-10"
            style={{
              height: "48px",
              width: "auto",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              transitionDelay: mobileOpen ? "0ms" : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(-20px)",
            }}
          />

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-8">
            {mobileMenuLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              const item = (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-brand-pink"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.875rem, 6vw, 2.25rem)",
                    fontWeight: 700,
                    color: isActive ? "#eb1887" : "#fafafa",
                    fontStyle: isActive ? "italic" : "normal",
                    transition:
                      "opacity 0.5s ease-out, transform 0.5s ease-out, color 0.3s ease-out",
                    transitionDelay: mobileOpen ? `${(i + 1) * 60}ms` : "0ms",
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  {link.label}
                </Link>
              );
              if (link.path !== "/book") return item;
              return (
                <div key={link.path} className="flex flex-col items-center">
                  {item}
                  <div
                    className="flex flex-col items-start gap-2.5 mt-3 pl-4"
                    style={{
                      borderLeft: "1px solid rgba(201,169,110,0.3)",
                      transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                      transitionDelay: mobileOpen ? `${(i + 1) * 60 + 30}ms` : "0ms",
                      opacity: mobileOpen ? 1 : 0,
                      transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    {bookLinks.map((b) => (
                      <Link
                        key={b.path}
                        to={b.path}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 font-serif text-lg italic hover:text-brand-pink transition-colors"
                        style={{ color: "rgba(250,250,250,0.7)" }}
                      >
                        <span>
                          {b.label}
                          {b.trademark && <span style={{ fontSize: ".45em", verticalAlign: "super", fontStyle: "normal" }}>®</span>}
                        </span>
                        {b.isNew && <NewTag />}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Divider */}
          <div
            className="w-20 h-px mt-12 mb-8"
            style={{
              background: "rgba(255,255,255,0.12)",
              transition: "opacity 0.5s ease-out",
              transitionDelay: mobileOpen ? "500ms" : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          />

          {/* Social icons */}
          <div
            className="flex gap-4 mb-8"
            style={{
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              transitionDelay: mobileOpen ? "560ms" : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(10px)",
            }}
          >
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={() => { try { trackSocialClick(label.toLowerCase() as 'instagram'|'tiktok'|'linkedin'|'youtube', 'navbar'); } catch { /* analytics must never break the page */ } }}
                className="flex items-center justify-center transition-all duration-300 hover:border-brand-pink hover:text-brand-pink"
                style={{
                  width: "44px",
                  height: "44px",
                  color: "#fafafa",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Listen Now CTA */}
          <a
            href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center bg-brand-pink text-white font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 mb-10"
            style={{
              borderRadius: "50px",
              transition:
                "opacity 0.5s ease-out, transform 0.5s ease-out, background-color 0.3s ease-out",
              transitionDelay: mobileOpen ? "620ms" : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(10px)",
            }}
          >
            Listen Now
          </a>

          {/* Copyright */}
          <p
            className="font-sans text-[10px] tracking-wide"
            style={{
              color: "#555",
              transition: "opacity 0.5s ease-out",
              transitionDelay: mobileOpen ? "680ms" : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            © 2026 The Manage Her
            <span className="text-[8px] align-super">®</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
