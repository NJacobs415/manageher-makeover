import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => (
  <footer>
    {/* Newsletter CTA — cream background like Amy's */}
    <section className="bg-brand-cream py-16 md:py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-navy mb-2">
          Unlock Weekly Leadership Wins
        </h2>
        <p className="font-sans text-muted-foreground mb-8 text-[15px] leading-relaxed">
          Smart strategies, honest behind-the-scenes, and resources you can't live without — delivered to your inbox every Tuesday.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            className="h-12 px-5 font-sans text-sm flex-1 bg-background border-border"
          />
          <Button className="bg-brand-gold hover:bg-brand-gold/90 text-foreground h-12 px-7 font-sans text-sm font-bold uppercase tracking-[0.08em] whitespace-nowrap">
            I Want It!
          </Button>
        </div>
      </div>
    </section>

    {/* "Follow Me On Social" — Amy style */}
    <section className="bg-brand-cream py-10 px-6 border-t border-border">
      <div className="max-w-xs mx-auto text-center">
        <p className="font-serif text-2xl text-brand-navy mb-1">Follow Me</p>
        <p className="font-serif text-2xl text-brand-navy italic mb-4">On Social</p>
        <a
          href="https://www.instagram.com/themanageher/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-sm font-bold text-brand-pink border border-brand-pink rounded-full px-6 py-2.5 hover:bg-brand-pink hover:text-primary-foreground transition-colors uppercase tracking-[0.08em]"
        >
          <Instagram size={16} />
          @themanageher
        </a>
      </div>
    </section>

    {/* Main footer — Amy-style pink background with columns */}
    <div className="bg-brand-pink text-primary-foreground py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-sans text-sm font-bold tracking-[0.15em] uppercase">
            The Manage Her™
          </span>
          <p className="font-sans text-sm text-primary-foreground/70 mt-3 leading-relaxed max-w-xs">
            I'm a CEO, author, mother of six, and host of The Manage Her™ Podcast. Welcome to the leadership revolution.
          </p>
          <p className="font-sans text-xs font-bold uppercase tracking-widest mt-5 mb-3 text-primary-foreground/50">
            Let's Be Friends
          </p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: "https://www.instagram.com/themanageher/" },
              { icon: Youtube, href: "https://www.youtube.com/@TheManageHer" },
              { icon: Mail, href: "mailto:info@themanageher.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <p className="font-serif text-lg mb-3">Navigate</p>
          {[
            { label: "Home", path: "/" },
            { label: "About Aimee", path: "/about" },
            { label: "Podcast", path: "/podcast" },
            { label: "Book", path: "/book" },
            { label: "Press & Speaking", path: "/press" },
          ].map((l) => (
            <Link key={l.path} to={l.path} className="block font-sans text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-2 uppercase tracking-wide">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Listen */}
        <div>
          <p className="font-serif text-lg mb-3">Listen</p>
          {[
            { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" },
            { label: "Spotify", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ" },
            { label: "Amazon Music", href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her" },
            { label: "YouTube", href: "https://www.youtube.com/@TheManageHer" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="block font-sans text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-2 uppercase tracking-wide">
              {l.label}
            </a>
          ))}
        </div>

        {/* Book */}
        <div>
          <p className="font-serif text-lg mb-3">The Book</p>
          <p className="font-sans text-sm text-primary-foreground/70 leading-relaxed mb-4">
            The Manage Her™ — Unveiling Invisible Labor & Sparking a Leadership Revolution
          </p>
          <a
            href="https://a.co/d/by5X0fV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs font-bold uppercase tracking-[0.1em] text-brand-gold hover:text-brand-gold/80 transition-colors"
          >
            Order on Amazon →
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-primary-foreground/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-sans text-xs text-primary-foreground/40">© {new Date().getFullYear()} The Manage Her™. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="font-sans text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors uppercase tracking-wide">Privacy Policy</a>
          <a href="#" className="font-sans text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors uppercase tracking-wide">Terms</a>
          <a href="#" className="font-sans text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors uppercase tracking-wide">Contact</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
