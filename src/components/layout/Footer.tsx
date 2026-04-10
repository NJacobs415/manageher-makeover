import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => (
  <footer>
    {/* Newsletter CTA */}
    <div className="bg-brand-blush section-padding">
      <div className="editorial-container text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl mb-4">
          Join the <span className="italic text-brand-pink">Movement</span>
        </h2>
        <p className="font-sans text-brand-warm-gray mb-8 leading-relaxed">
          Smart strategies, real talk, and resources you can't live without — delivered to your inbox every week.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            className="bg-background border-border rounded-full h-12 font-sans text-sm px-5"
          />
          <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-full h-12 px-8 font-sans text-sm whitespace-nowrap">
            Yes, I'm In!
          </Button>
        </div>
      </div>
    </div>

    {/* Links */}
    <div className="bg-brand-navy text-brand-cream section-padding py-12">
      <div className="editorial-container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span className="font-serif text-xl font-bold">
            THE <span className="text-brand-pink italic">MANAGE</span>HER
          </span>
          <p className="font-sans text-sm text-brand-cream/60 mt-4 leading-relaxed">
            Empowering women to lead, build wealth, and own their narrative.
          </p>
        </div>

        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-brand-gold mb-4 !text-brand-gold">Navigate</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "About", path: "/about" },
              { label: "Podcast", path: "/podcast" },
              { label: "Book", path: "/book" },
              { label: "Press & Speaking", path: "/press" },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="font-sans text-sm text-brand-cream/60 hover:text-brand-cream transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-brand-gold mb-4 !text-brand-gold">Listen</h4>
          <div className="flex flex-col gap-2">
            {["Apple Podcasts", "Spotify", "YouTube", "Amazon Music"].map((item) => (
              <a key={item} href="#" className="font-sans text-sm text-brand-cream/60 hover:text-brand-cream transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-brand-gold mb-4 !text-brand-gold">Connect</h4>
          <div className="flex gap-4 mt-2">
            {[Instagram, Youtube, Headphones, Mail].map((Icon, i) => (
              <a key={i} href="#" className="text-brand-cream/60 hover:text-brand-pink transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="editorial-container border-t border-brand-cream/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-brand-cream/40">
          © {new Date().getFullYear()} The Manage Her. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="font-sans text-xs text-brand-cream/40 hover:text-brand-cream transition-colors">Privacy Policy</a>
          <a href="#" className="font-sans text-xs text-brand-cream/40 hover:text-brand-cream transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
