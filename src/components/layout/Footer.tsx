import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => (
  <footer>
    {/* Newsletter */}
    <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, hsl(340 50% 96%), hsl(260 40% 94%), hsl(38 55% 96%))" }}>
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-navy mb-3">
          Join the <em className="text-brand-pink">Movement</em>
        </h2>
        <p className="font-sans text-muted-foreground mb-8 text-[15px] leading-relaxed">
          Weekly insights on leadership, invisible labor, and financial freedom — delivered straight to your inbox with zero fluff.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 rounded-full px-5 font-sans text-sm flex-1 bg-background"
          />
          <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground h-12 px-7 rounded-full font-sans text-sm font-medium whitespace-nowrap">
            Join Free →
          </Button>
        </div>
      </div>
    </section>

    {/* Bottom */}
    <div className="bg-brand-navy text-white/80 py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="font-serif text-lg font-bold text-white">
            The Manage<span className="text-brand-pink italic">Her</span>™
          </span>
          <p className="font-sans text-sm text-white/50 mt-3 leading-relaxed max-w-xs">
            The podcast redefining women's leadership. CEO, author, mother of six, and tired of watching brilliant women shrink.
          </p>
          <div className="flex gap-3 mt-4">
            {[
              { icon: Instagram, href: "https://www.instagram.com/themanageher/" },
              { icon: Youtube, href: "https://www.youtube.com/@TheManageHer" },
              { icon: Mail, href: "mailto:info@themanageher.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Navigate</p>
          {[
            { label: "About Aimee", path: "/about" },
            { label: "Podcast", path: "/podcast" },
            { label: "Book", path: "/book" },
            { label: "Press & Speaking", path: "/press" },
          ].map((l) => (
            <Link key={l.path} to={l.path} className="block font-sans text-sm text-white/60 hover:text-white transition-colors mb-2">
              {l.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Listen</p>
          {[
            { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" },
            { label: "Spotify", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ" },
            { label: "Amazon Music", href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her" },
            { label: "YouTube", href: "https://www.youtube.com/@TheManageHer" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="block font-sans text-sm text-white/60 hover:text-white transition-colors mb-2">
              {l.label}
            </a>
          ))}
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Contact</p>
          <a href="mailto:info@themanageher.com" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
            info@themanageher.com
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-sans text-xs text-white/30">© {new Date().getFullYear()} The Manage Her™. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors">Privacy</a>
          <a href="#" className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
