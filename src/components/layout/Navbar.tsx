import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/animations/Magnetic";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Podcast", path: "/podcast" },
  { label: "Book", path: "/book" },
  { label: "Press", path: "/press" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      {/* Announcement */}
      <div className="bg-foreground text-background text-center py-2.5 px-4 font-sans text-[11px] tracking-[0.15em] uppercase z-[60] relative">
        New episodes weekly —{" "}
        <a href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-pink transition-colors">
          Listen now
        </a>
      </div>

      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/95 backdrop-blur-lg shadow-[0_1px_0_hsl(var(--border))]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-12 h-20">
          <Link to="/" className="shrink-0">
            <span className="font-serif text-xl md:text-2xl font-bold text-foreground tracking-tight">
              The Manage<em className="text-brand-pink">Her</em>
              <span className="text-brand-pink text-[10px] align-super">™</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Magnetic key={link.path} strength={0.15}>
                <Link
                  to={link.path}
                  className={cn(
                    "link-reveal font-sans text-[12px] font-medium uppercase tracking-[0.15em] transition-colors",
                    location.pathname === link.path
                      ? "text-brand-pink"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </Magnetic>
            ))}
            <Magnetic strength={0.2}>
              <a
                href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-brand-pink/90 transition-colors"
              >
                Listen Now
              </a>
            </Magnetic>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-background flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <Link
          to="/"
          className={cn("font-serif text-4xl transition-all", location.pathname === "/" ? "text-brand-pink" : "text-foreground")}
        >
          Home
        </Link>
        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "font-serif text-4xl transition-all duration-500",
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              location.pathname === link.path ? "text-brand-pink" : "text-foreground hover:text-brand-pink"
            )}
            style={{ transitionDelay: mobileOpen ? `${(i + 1) * 80}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
