import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Podcast", path: "/podcast" },
  { label: "Book", path: "/book" },
  { label: "Press & Speaking", path: "/press" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMobileOpen(false), [location]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="editorial-container flex items-center justify-between px-6 lg:px-12">
          <Link to="/" className="group">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-brand-navy">
              THE <span className="text-brand-pink italic">MANAGE</span>HER
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-sans text-sm tracking-wide transition-colors duration-300",
                  location.pathname === link.path
                    ? "text-brand-pink font-medium"
                    : "text-brand-navy/70 hover:text-brand-pink"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground font-sans text-sm px-6 rounded-full"
              asChild
            >
              <a href="#listen">Listen Now</a>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-brand-navy z-50 relative"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background flex flex-col items-center justify-center transition-all duration-500 lg:hidden",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "font-serif text-3xl mb-6 transition-all duration-500",
              isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              location.pathname === link.path ? "text-brand-pink" : "text-brand-navy hover:text-brand-pink"
            )}
            style={{ transitionDelay: isMobileOpen ? `${i * 80}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
        <Button className="mt-8 bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground font-sans text-sm px-10 py-6 rounded-full" asChild>
          <a href="#listen">Listen Now</a>
        </Button>
      </div>
    </>
  );
};

export default Navbar;
