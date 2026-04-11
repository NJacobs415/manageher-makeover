import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Search } from "lucide-react";

const EP_PHOTO_1 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f913b8428032bfd3dc.jpg";
const EP_PHOTO_2 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f995735c6c97483230.jpg";
const EP_PHOTO_3 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df450a3f31f2.png";
const EP_PHOTO_4 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c100e545dd71fcf4b97f.png";

const categories = ["All", "Empowerment", "Finance", "Entrepreneurship", "Leadership"];

const allEpisodes = [
  { img: EP_PHOTO_1, title: "The Invisible Load: Why Women Are Leading Without the Title", ep: 1, duration: "42 min", category: "Empowerment", desc: "You're managing a household, a career, everyone's emotions — it's time we named this brilliance for what it is: leadership.", featured: true },
  { img: EP_PHOTO_2, title: "Money, Power & the Wage Gap Nobody Talks About", ep: 5, duration: "38 min", category: "Finance", desc: "Financial literacy isn't optional — it's freedom." },
  { img: EP_PHOTO_3, title: "Scaling a Business While Raising Humans", ep: 10, duration: "45 min", category: "Entrepreneurship", desc: "Ambition and motherhood aren't mutually exclusive." },
  { img: EP_PHOTO_4, title: "Setting Boundaries Without the Guilt Trip", ep: 15, duration: "36 min", category: "Empowerment", desc: "Why saying no is the most powerful leadership skill you'll ever develop." },
  { img: EP_PHOTO_1, title: "The Leadership Revolution Starts at Home", ep: 20, duration: "41 min", category: "Leadership", desc: "How the skills you use at home translate to massive career impact." },
  { img: EP_PHOTO_2, title: "Investing for Beginners: A No-BS Guide", ep: 22, duration: "44 min", category: "Finance", desc: "Stocks, real estate, retirement accounts — demystified." },
  { img: EP_PHOTO_3, title: "When Ambition Feels Like Too Much", ep: 25, duration: "39 min", category: "Empowerment", desc: "Society tells us to dream big but stay small." },
  { img: EP_PHOTO_4, title: "Building Your Board of Directors in Life", ep: 28, duration: "43 min", category: "Leadership", desc: "You need advocates, truth-tellers, and cheerleaders." },
];

const Podcast = () => {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allEpisodes.filter((ep) => {
    const catMatch = active === "All" || ep.category === active;
    const searchMatch = ep.title.toLowerCase().includes(search.toLowerCase()) || ep.desc.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero — Amy podcast style */}
      <section className="bg-brand-ice py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-pink mb-2 opacity-0 animate-fade-in-up">
              The Manage Her™ Show
            </h1>
            <p className="font-serif text-xl md:text-2xl text-brand-navy/40 italic mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              Getting real about what it takes.
            </p>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
              The Manage Her™ Show is a weekly conversation about <strong className="text-brand-navy">women's invisible leadership</strong> — from proven strategies to honest behind-the-scenes, all to help you lead boldly and unapologetically.
            </p>

            <div className="flex gap-10 mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
              <div>
                <p className="font-serif text-4xl font-bold text-brand-gold"><AnimatedCounter target={30} suffix="+" /></p>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Episodes</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-bold text-brand-gold">5.0 ★</p>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Apple Rating</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            {[
              { label: "Watch on YouTube", href: "https://www.youtube.com/@TheManageHer", icon: "▶" },
              { label: "Listen on Apple", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475", icon: "🎧" },
              { label: "Listen on Spotify", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ", icon: "🎵" },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-background rounded-sm px-6 py-4 font-sans text-sm font-bold uppercase tracking-[0.1em] text-brand-navy hover:shadow-md transition-all border border-border hover:border-brand-pink/20 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{p.icon}</span>
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Filters — sticky */}
      <section className="bg-background sticky top-[68px] z-30 border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-sans text-xs font-bold uppercase tracking-[0.08em] px-4 py-2 transition-all ${
                  active === cat ? "bg-brand-pink text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-56">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search episodes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 font-sans text-sm" />
          </div>
        </div>
      </section>

      {/* Episode Grid */}
      <section className="py-12 md:py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((ep, i) => (
            <ScrollReveal key={`${ep.ep}-${i}`} delay={i * 60}>
              <a
                href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-brand-pink/20"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={ep.img} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-brand-pink text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play size={16} className="fill-current ml-0.5" />
                    </div>
                  </div>
                  {ep.featured && (
                    <span className="absolute top-2.5 left-2.5 bg-brand-gold text-foreground font-sans text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">Featured</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-sans text-[10px] text-muted-foreground mb-1.5 uppercase tracking-wide">EP {String(ep.ep).padStart(2, "0")} · {ep.duration} · {ep.category}</p>
                  <h3 className="font-serif text-[15px] font-bold text-brand-navy leading-snug group-hover:text-brand-pink transition-colors line-clamp-2">{ep.title}</h3>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center font-sans text-muted-foreground py-16">No episodes match your search.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;
