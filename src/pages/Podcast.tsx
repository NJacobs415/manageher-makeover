import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/animations/CursorFollower";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import Magnetic from "@/components/animations/Magnetic";
import { Input } from "@/components/ui/input";
import { Play, Search, Star } from "lucide-react";

const EP_PHOTO_1 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f913b8428032bfd3dc.jpg";
const EP_PHOTO_2 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f995735c6c97483230.jpg";
const EP_PHOTO_3 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df450a3f31f2.png";
const EP_PHOTO_4 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c100e545dd71fcf4b97f.png";

const categories = ["All", "Empowerment", "Finance", "Entrepreneurship", "Leadership"];

const allEpisodes = [
  { img: EP_PHOTO_1, title: "The Invisible Load: Why Women Are Leading Without the Title", ep: 1, duration: "42 min", category: "Empowerment", desc: "You're managing a household, a career, everyone's emotions — it's time we named this brilliance for what it is: leadership.", featured: true },
  { img: EP_PHOTO_2, title: "Money, Power & the Wage Gap Nobody Talks About", ep: 5, duration: "38 min", category: "Finance", desc: "Financial literacy isn't optional — it's freedom." },
  { img: EP_PHOTO_3, title: "Scaling a Business While Raising Humans", ep: 10, duration: "45 min", category: "Entrepreneurship", desc: "Ambition and motherhood aren't mutually exclusive." },
  { img: EP_PHOTO_4, title: "Setting Boundaries Without the Guilt Trip", ep: 15, duration: "36 min", category: "Empowerment", desc: "Why saying no is the most powerful leadership skill." },
  { img: EP_PHOTO_1, title: "The Leadership Revolution Starts at Home", ep: 20, duration: "41 min", category: "Leadership", desc: "How the skills you use at home translate to career impact." },
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
    <div className="overflow-x-hidden page-enter">
      <CursorFollower />
      <Navbar />

      {/* Hero */}
      <section className="py-24 md:py-36 px-6 bg-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="editorial-number text-[20vw]">Show</span>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <TextReveal>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4">The Podcast</p>
            </TextReveal>
            <TextReveal delay={150}>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[0.95] mb-4">
                The Manage<em className="text-brand-pink italic">Her</em>™ Show
              </h1>
            </TextReveal>
            <FadeIn delay={400} y={20}>
              <p className="font-serif text-lg text-foreground/40 italic mb-8">Getting real about what it takes.</p>
            </FadeIn>
            <FadeIn delay={500} y={20}>
              <div className="flex gap-10">
                <div>
                  <p className="font-serif text-4xl font-bold text-brand-pink"><AnimatedCounter target={30} suffix="+" /></p>
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Episodes</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-brand-pink flex items-center gap-1">
                    5.0 <Star size={16} className="text-brand-gold fill-brand-gold" />
                  </p>
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Rating</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={400} y={0} x={40}>
            <div className="flex flex-col gap-3">
              {[
                { label: "Watch on YouTube", href: "https://www.youtube.com/@TheManageHer", icon: "▶" },
                { label: "Listen on Apple", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475", icon: "🎧" },
                { label: "Listen on Spotify", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ", icon: "🎵" },
              ].map((p) => (
                <Magnetic key={p.label} strength={0.15}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-background px-6 py-5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground hover:shadow-lg transition-all border border-border hover:border-brand-pink/20 group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{p.icon}</span>
                    {p.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background sticky top-20 z-30 border-b border-border px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-sans text-[10px] font-semibold uppercase tracking-[0.12em] px-4 py-2 transition-all duration-300 ${
                  active === cat ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-56">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 font-sans text-sm border-border" />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-20 px-6 bg-background">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {filtered.map((ep, i) => (
            <FadeIn key={`${ep.ep}-${i}`} delay={i * 60} y={30}>
              <a
                href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-background overflow-hidden h-full"
              >
                <div className="editorial-img relative aspect-square overflow-hidden">
                  <img src={ep.img} alt={ep.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 bg-brand-pink text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                      <Play size={18} className="fill-current ml-0.5" />
                    </div>
                  </div>
                  {ep.featured && (
                    <span className="absolute top-3 left-3 bg-brand-pink text-primary-foreground font-sans text-[8px] font-bold uppercase tracking-[0.15em] px-2.5 py-1">Featured</span>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                    EP {String(ep.ep).padStart(2, "0")} · {ep.duration} · {ep.category}
                  </p>
                  <h3 className="font-serif text-base font-bold text-foreground leading-snug group-hover:text-brand-pink transition-colors line-clamp-2">
                    {ep.title}
                  </h3>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center font-sans text-muted-foreground py-20">No episodes match your search.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;
