import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Search, Headphones, Mic } from "lucide-react";

const categories = ["All", "Empowerment", "Finance", "Leadership", "Entrepreneurship"];

const allEpisodes = [
  { title: "Breaking the Glass Ceiling in Corporate America", guest: "Dr. Sarah Mitchell", category: "Leadership", ep: 32, date: "Mar 15, 2025", duration: "48 min" },
  { title: "Building Generational Wealth as a Woman of Color", guest: "Jasmine Torres", category: "Finance", ep: 31, date: "Mar 8, 2025", duration: "52 min" },
  { title: "From Side Hustle to 7-Figure Empire", guest: "Michelle Chang", category: "Entrepreneurship", ep: 30, date: "Mar 1, 2025", duration: "45 min" },
  { title: "The Art of Negotiation: Getting What You Deserve", guest: "Aimee Rickabus", category: "Empowerment", ep: 29, date: "Feb 22, 2025", duration: "38 min" },
  { title: "Investing 101: A Woman's Guide to the Stock Market", guest: "Rachel Park", category: "Finance", ep: 28, date: "Feb 15, 2025", duration: "55 min" },
  { title: "Leading with Empathy in a Competitive World", guest: "Dr. Nicole Adams", category: "Leadership", ep: 27, date: "Feb 8, 2025", duration: "42 min" },
  { title: "Turning Your Pain Into Your Platform", guest: "Keisha Williams", category: "Empowerment", ep: 26, date: "Feb 1, 2025", duration: "50 min" },
  { title: "Scaling Your Business Without Losing Your Soul", guest: "Amanda Rivera", category: "Entrepreneurship", ep: 25, date: "Jan 25, 2025", duration: "47 min" },
];

const Podcast = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allEpisodes.filter((ep) => {
    const matchesCategory = activeCategory === "All" || ep.category === activeCategory;
    const matchesSearch = ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.guest.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-brand-dark text-brand-cream overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 section-padding">
        <div className="editorial-container text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-4 animate-fade-in">
            The Podcast
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up">
            THE <span className="italic text-brand-gold">MANAGE</span>HER
          </h1>
          <p className="font-sans text-brand-cream/60 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Real conversations about leadership, wealth, and the unfiltered truth about 
            what it takes to win as a woman. New episodes every week.
          </p>

          {/* Waveform visual accent */}
          <div className="flex items-end justify-center gap-1 h-12 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-brand-pink/60 rounded-full animate-float"
                style={{
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Platform links */}
          <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            {[
              { icon: Headphones, label: "Apple Podcasts" },
              { icon: Mic, label: "Spotify" },
              { icon: Play, label: "YouTube" },
            ].map((p) => (
              <Button
                key={p.label}
                variant="outline"
                className="border-brand-cream/20 text-brand-cream hover:bg-brand-cream/10 rounded-none font-sans text-xs uppercase tracking-widest"
              >
                <p.icon size={16} className="mr-2" />
                {p.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="editorial-container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-brand-cream/10 pb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-sans text-xs uppercase tracking-widest px-4 py-2 transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-brand-pink text-primary-foreground"
                      : "text-brand-cream/50 hover:text-brand-cream border border-brand-cream/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cream/40" />
              <Input
                placeholder="Search episodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-transparent border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 rounded-none h-10 font-sans text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((ep, i) => (
              <ScrollReveal key={ep.ep} delay={i * 80}>
                <div className="group border border-brand-cream/10 hover:border-brand-gold/30 p-6 transition-all duration-500 hover:bg-brand-cream/5 cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-xs uppercase tracking-widest text-brand-gold">
                      EP {ep.ep}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xs text-brand-cream/40">{ep.duration}</span>
                      <span className="font-sans text-xs uppercase tracking-widest text-brand-pink">
                        {ep.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-brand-gold transition-colors">
                    {ep.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-sans text-sm text-brand-cream/50">with {ep.guest}</p>
                      <p className="font-sans text-xs text-brand-cream/30 mt-1">{ep.date}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center group-hover:bg-brand-pink group-hover:border-brand-pink transition-all duration-300">
                      <Play size={14} className="text-brand-pink group-hover:text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-brand-cream/50">No episodes found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;
