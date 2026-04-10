import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Search } from "lucide-react";
import { Link } from "react-router-dom";

const EP_PHOTO_1 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f913b8428032bfd3dc.jpg";
const EP_PHOTO_2 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f995735c6c97483230.jpg";
const EP_PHOTO_3 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df450a3f31f2.png";
const EP_PHOTO_4 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c100e545dd71fcf4b97f.png";

const categories = ["All", "Empowerment", "Finance", "Entrepreneurship", "Leadership"];

const allEpisodes = [
  { img: EP_PHOTO_1, title: "The Invisible Load: Why Women Are Leading Without the Title", ep: 1, duration: "42 min", category: "Empowerment", desc: "You're managing a household, a career, everyone's emotions — it's time we named this brilliance for what it is: leadership.", featured: true },
  { img: EP_PHOTO_2, title: "Money, Power & the Wage Gap Nobody Talks About", ep: 5, duration: "38 min", category: "Finance", desc: "Financial literacy isn't optional — it's freedom. Let's talk about wealth building, pay equity, and why every woman deserves a seat at the table." },
  { img: EP_PHOTO_3, title: "Scaling a Business While Raising Humans", ep: 10, duration: "45 min", category: "Entrepreneurship", desc: "Ambition and motherhood aren't mutually exclusive. Here's how to build something extraordinary without losing yourself." },
  { img: EP_PHOTO_4, title: "Setting Boundaries Without the Guilt Trip", ep: 15, duration: "36 min", category: "Empowerment", desc: "Why saying no is the most powerful leadership skill you'll ever develop — and how to stop apologizing for protecting your energy." },
  { img: EP_PHOTO_1, title: "The Leadership Revolution Starts at Home", ep: 20, duration: "41 min", category: "Leadership", desc: "The boardroom isn't the only place leadership matters. How the skills you use at home translate to massive career impact." },
  { img: EP_PHOTO_2, title: "Investing for Beginners: A No-BS Guide", ep: 22, duration: "44 min", category: "Finance", desc: "Stocks, real estate, retirement accounts — demystified. Everything I wish someone had told me about money 20 years ago." },
  { img: EP_PHOTO_3, title: "When Ambition Feels Like Too Much", ep: 25, duration: "39 min", category: "Empowerment", desc: "Society tells us to dream big but stay small. Here's how to hold space for your ambition without the guilt spiral." },
  { img: EP_PHOTO_4, title: "Building Your Board of Directors in Life", ep: 28, duration: "43 min", category: "Leadership", desc: "You need advocates, truth-tellers, and cheerleaders. How to curate the inner circle that will elevate you." },
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

      {/* Hero */}
      <section className="py-20 md:py-24 px-6" style={{ background: "linear-gradient(160deg, hsl(260 40% 94%), hsl(340 50% 95%), hsl(38 55% 96%))" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-pink mb-4 animate-fade-in">The Podcast</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-brand-navy mb-5 opacity-0 animate-fade-in-up">
            The Manage<em className="text-brand-pink">Her</em>™ Show
          </h1>
          <p className="font-sans text-[15px] md:text-base text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Real conversations about leadership, invisible labor, and building wealth — for women who are done asking permission and ready to lead.
          </p>
          <div className="flex flex-wrap justify-center gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
            {[
              { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" },
              { label: "Spotify", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ" },
              { label: "YouTube", href: "https://www.youtube.com/@TheManageHer" },
            ].map((p) => (
              <Button key={p.label} variant="outline" className="rounded-full px-5 h-10 font-sans text-xs font-semibold uppercase tracking-[0.08em] border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5" asChild>
                <a href={p.href} target="_blank" rel="noopener noreferrer">{p.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background sticky top-[72px] z-30 border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-sans text-xs font-medium px-4 py-2 rounded-full transition-all ${
                  active === cat ? "bg-brand-pink text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-56">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search episodes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-full h-9 font-sans text-sm" />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((ep, i) => (
            <ScrollReveal key={`${ep.ep}-${i}`} delay={i * 60}>
              <a
                href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-brand-pink/10"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={ep.img} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-brand-pink text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play size={16} className="fill-current ml-0.5" />
                    </div>
                  </div>
                  {ep.featured && (
                    <span className="absolute top-2.5 left-2.5 bg-brand-pink text-primary-foreground font-sans text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">Featured</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-sans text-[10px] text-muted-foreground mb-1.5">EP {String(ep.ep).padStart(2, "0")} · {ep.duration} · {ep.category}</p>
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
