import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import FadeIn from "@/components/animations/FadeIn";

const Footer = () => (
  <footer>
    {/* Editorial newsletter CTA */}
    <section className="relative py-24 md:py-32 px-6 bg-foreground overflow-hidden">
      {/* Background typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[20vw] font-bold text-background/[0.03] italic whitespace-nowrap">
          ManageHer
        </span>
      </div>

      <FadeIn className="relative z-10 max-w-lg mx-auto text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-background/40 mb-4">Join the Movement</p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-background leading-tight mb-4">
          Leadership insights, delivered <em className="text-brand-pink">weekly.</em>
        </h2>
        <p className="font-sans text-sm text-background/50 mb-8 leading-relaxed">
          No fluff. Just the strategies, stories, and permission slips you need to lead boldly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Your email"
            className="h-12 px-5 font-sans text-sm flex-1 bg-background/10 border-background/20 text-background placeholder:text-background/30 focus:border-brand-pink"
          />
          <button className="btn-glow bg-brand-pink text-primary-foreground h-12 px-8 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-brand-pink/90 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </FadeIn>
    </section>

    {/* Minimal footer */}
    <div className="bg-foreground border-t border-background/10 py-12 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="font-serif text-lg text-background">
            The Manage<em className="text-brand-pink">Her</em>™
          </span>
          <p className="font-sans text-xs text-background/30 mt-3 leading-relaxed max-w-xs">
            The leadership revolution starts here.
          </p>
          <div className="flex gap-4 mt-5">
            {[
              { icon: Instagram, href: "https://www.instagram.com/themanageher/" },
              { icon: Youtube, href: "https://www.youtube.com/@TheManageHer" },
              { icon: Mail, href: "mailto:info@themanageher.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-background/30 hover:text-brand-pink transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/30 mb-4">Navigate</p>
          {[
            { label: "About", path: "/about" },
            { label: "Podcast", path: "/podcast" },
            { label: "Book", path: "/book" },
            { label: "Press & Speaking", path: "/press" },
          ].map((l) => (
            <Link key={l.path} to={l.path} className="block font-sans text-sm text-background/50 hover:text-background transition-colors mb-2.5">
              {l.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/30 mb-4">Listen</p>
          {[
            { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" },
            { label: "Spotify", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ" },
            { label: "Amazon Music", href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her" },
            { label: "YouTube", href: "https://www.youtube.com/@TheManageHer" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="block font-sans text-sm text-background/50 hover:text-background transition-colors mb-2.5">
              {l.label}
            </a>
          ))}
        </div>

        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/30 mb-4">Connect</p>
          <a href="mailto:info@themanageher.com" className="font-sans text-sm text-background/50 hover:text-background transition-colors">
            info@themanageher.com
          </a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-sans text-[10px] text-background/20 tracking-wide">
          © {new Date().getFullYear()} The Manage Her™
        </p>
        <div className="flex gap-6">
          <a href="#" className="font-sans text-[10px] text-background/20 hover:text-background/50 transition-colors tracking-wide">Privacy</a>
          <a href="#" className="font-sans text-[10px] text-background/20 hover:text-background/50 transition-colors tracking-wide">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
