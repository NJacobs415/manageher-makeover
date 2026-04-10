import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Podcast", path: "/podcast" },
  { label: "Book", path: "/book" },
  { label: "Press & Speaking", path: "/press" },
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
      {/* Top announcement bar */}
      <div className="bg-brand-pink text-primary-foreground text-center py-2.5 px-4 font-sans text-xs md:text-sm tracking-wide z-[60] relative">
        🎙️ New episodes every week —{" "}
        <a href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-medium hover:opacity-80">
          Listen on Apple Podcasts →
        </a>
      </div>

      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-background/98 backdrop-blur-md shadow-sm"
            : "bg-background"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-16 md:h-[72px]">
          <Link to="/" className="shrink-0">
            <span className="font-serif text-xl md:text-2xl font-bold text-brand-navy tracking-tight">
              The Manage<span className="text-brand-pink italic">Her</span>
              <span className="text-brand-pink text-xs align-super">™</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-sans text-[13px] font-medium uppercase tracking-[0.08em] transition-colors",
                  location.pathname === link.path
                    ? "text-brand-pink"
                    : "text-brand-navy/70 hover:text-brand-pink"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground font-sans text-xs font-semibold uppercase tracking-[0.1em] px-6 h-10 rounded-full"
              asChild
            >
              <a href="#listen">Listen Now</a>
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-brand-navy"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-background flex flex-col items-center justify-center gap-5 transition-all duration-400 lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <Link to="/" className={cn("font-serif text-3xl transition-all", mobileOpen && "opacity-100", location.pathname === "/" ? "text-brand-pink" : "text-brand-navy")}>
          Home
        </Link>
        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "font-serif text-3xl transition-all duration-400",
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              location.pathname === link.path ? "text-brand-pink" : "text-brand-navy hover:text-brand-pink"
            )}
            style={{ transitionDelay: mobileOpen ? `${(i + 1) * 60}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
