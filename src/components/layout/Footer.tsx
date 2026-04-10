import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-cream">
      {/* Newsletter CTA */}
      <div className="section-padding border-b border-brand-gold/20">
        <div className="editorial-container text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Join the <span className="italic text-brand-gold">Movement</span>
          </h2>
          <p className="font-sans text-brand-cream/60 mb-8">
            Get weekly insights on leadership, wealth-building, and owning your narrative — straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-transparent border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/40 rounded-none h-12 font-sans"
            />
            <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-none h-12 px-8 font-sans uppercase tracking-widest text-xs whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="section-padding py-12">
        <div className="editorial-container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <span className="font-serif text-xl font-bold tracking-wider">
              THE <span className="text-brand-gold italic">MANAGE</span>HER
            </span>
            <p className="font-sans text-sm text-brand-cream/50 mt-4 leading-relaxed">
              Empowering women to lead, build wealth, and own their narrative.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-brand-gold mb-4">Navigate</h4>
            <div className="flex flex-col gap-2">
              {["About", "Podcast", "Book", "Press & Speaking"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                  className="font-sans text-sm text-brand-cream/60 hover:text-brand-cream transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-brand-gold mb-4">Listen</h4>
            <div className="flex flex-col gap-2">
              {["Apple Podcasts", "Spotify", "YouTube", "Amazon Music"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-sans text-sm text-brand-cream/60 hover:text-brand-cream transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-brand-gold mb-4">Connect</h4>
            <div className="flex gap-4 mt-2">
              {[Instagram, Youtube, Headphones, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-brand-cream/60 hover:text-brand-pink transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-brand-cream/10 py-6 px-6">
        <div className="editorial-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-brand-cream/40">
            © {new Date().getFullYear()} The Manage Her. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-xs text-brand-cream/40 hover:text-brand-cream transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-xs text-brand-cream/40 hover:text-brand-cream transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
