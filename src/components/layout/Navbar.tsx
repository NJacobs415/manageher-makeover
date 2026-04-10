import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT AIMEE", path: "/about" },
  { label: "PODCAST", path: "/podcast" },
  { label: "BOOK", path: "/book" },
  { label: "PRESS & SPEAKING", path: "/press" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      {/* Top announcement bar — Amy-style gold bar */}
      <div className="bg-brand-gold text-foreground text-center py-3 px-4 font-sans text-xs md:text-sm font-semibold tracking-wide z-[60] relative uppercase">
        Women in Leadership: New episodes every week —{" "}
        <a
          href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-80"
        >
          LISTEN NOW on Apple Podcasts.
        </a>
      </div>

      {/* Main nav — Amy-style pink bar */}
      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-brand-pink"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-16 md:h-[68px]">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <span className="font-sans text-sm md:text-base font-bold text-primary-foreground tracking-[0.2em] uppercase">
              The Manage Her™
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-sans text-[12px] font-medium tracking-[0.1em] transition-colors",
                  location.pathname === link.path
                    ? "text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[12px] font-bold tracking-[0.1em] bg-brand-gold text-foreground px-5 py-2.5 rounded-sm hover:bg-brand-gold/90 transition-colors uppercase"
            >
              Free Guide
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-primary-foreground"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-brand-pink flex flex-col items-center justify-center gap-6 transition-all duration-400 lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "font-sans text-lg font-medium tracking-[0.15em] uppercase transition-all duration-300",
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              location.pathname === link.path ? "text-brand-gold" : "text-primary-foreground hover:text-brand-gold"
            )}
            style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm font-bold tracking-[0.1em] bg-brand-gold text-foreground px-6 py-3 rounded-sm mt-4 uppercase"
        >
          Listen Now
        </a>
      </div>
    </>
  );
};

export default Navbar;
