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
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 section-padding" style={{ background: "linear-gradient(180deg, hsl(270 30% 94%), hsl(340 40% 95%), hsl(35 50% 96%))" }}>
        <div className="editorial-container text-center max-w-3xl mx-auto">
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand-pink font-medium mb-4 animate-fade-in">
            The Podcast
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up">
            The Manage Her <em className="text-brand-pink">Show</em>
          </h1>
          <p className="font-sans text-lg text-brand-warm-gray mb-8 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Real conversations about leadership, wealth, and the unfiltered truth about 
            what it takes to win as a woman. New episodes every week.
          </p>

          <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            {[
              { icon: Headphones, label: "Apple Podcasts" },
              { icon: Mic, label: "Spotify" },
              { icon: Play, label: "YouTube" },
            ].map((p) => (
              <Button
                key={p.label}
                variant="outline"
                className="border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5 rounded-full font-sans text-sm"
              >
                <p.icon size={16} className="mr-2" />
                {p.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card px-6 lg:px-12 py-6 border-b border-border">
        <div className="editorial-container flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-sm px-5 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brand-pink text-primary-foreground shadow-sm"
                    : "text-brand-warm-gray hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search episodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full h-10 font-sans text-sm"
            />
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="section-padding bg-card">
        <div className="editorial-container">
          <div className="space-y-3">
            {filtered.map((ep, i) => (
              <ScrollReveal key={ep.ep} delay={i * 60}>
                <div className="group flex items-center justify-between p-5 md:p-6 rounded-xl hover:bg-brand-blush transition-all duration-300 cursor-pointer border border-transparent hover:border-brand-pink/10">
                  <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-brand-pink/10 flex items-center justify-center group-hover:bg-brand-pink transition-all duration-300 shrink-0">
                      <Play size={15} className="text-brand-pink group-hover:text-primary-foreground ml-0.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sans text-xs text-brand-pink font-medium">EP {ep.ep}</span>
                        <span className="font-sans text-xs text-muted-foreground">· {ep.category}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold group-hover:text-brand-pink transition-colors truncate">
                        {ep.title}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground mt-0.5">with {ep.guest}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-muted-foreground shrink-0 ml-4">
                    <span className="font-sans text-xs">{ep.duration}</span>
                    <span className="font-sans text-xs">{ep.date}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-muted-foreground">No episodes found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;
