import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Play, ArrowDown, Star, Headphones, BookOpen, Mic, Users, TrendingUp, Heart } from "lucide-react";

const episodes = [
  { title: "Breaking the Glass Ceiling in Corporate America", guest: "Dr. Sarah Mitchell", category: "Leadership", ep: "EP 32" },
  { title: "Building Generational Wealth as a Woman of Color", guest: "Jasmine Torres", category: "Finance", ep: "EP 31" },
  { title: "From Side Hustle to 7-Figure Empire", guest: "Michelle Chang", category: "Entrepreneurship", ep: "EP 30" },
  { title: "The Art of Negotiation: Getting What You Deserve", guest: "Aimee Rickabus", category: "Empowerment", ep: "EP 29" },
];

const testimonials = [
  { quote: "This podcast changed the way I think about leadership and my own potential. Aimee is the mentor every woman needs.", author: "Jessica R.", role: "CEO & Founder" },
  { quote: "Every episode leaves me fired up and ready to take action. The Manage Her is a must-listen for ambitious women.", author: "Maria L.", role: "VP of Marketing" },
  { quote: "Aimee's authenticity and wisdom are unmatched. She doesn't just talk about empowerment — she lives it.", author: "Danielle K.", role: "Entrepreneur" },
];

const pillars = [
  { icon: TrendingUp, title: "Financial Literacy", description: "Master your money, build generational wealth, and create financial freedom on your own terms." },
  { icon: Users, title: "Leadership", description: "Step into your power as a leader — in the boardroom, at home, and in your community." },
  { icon: Heart, title: "Empowerment", description: "Own your narrative, embrace your journey, and inspire the women around you to do the same." },
];

const Index = () => {
  return (
    <div className="bg-brand-dark text-brand-cream overflow-x-hidden">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/80 to-brand-dark z-10" />

        {/* Large background text — Jenna Kutcher style */}
        <div className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none">
          <span className="font-serif text-[12vw] md:text-[10vw] font-black text-brand-cream/[0.03] uppercase tracking-widest leading-none whitespace-nowrap">
            MANAGEHER
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-brand-gold mb-6">
              The Podcast for Women Who Lead
            </p>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 opacity-0 animate-fade-in-up">
            THE{" "}
            <span className="italic text-brand-gold">MANAGE</span>
            <span>HER</span>
          </h1>

          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <p className="font-serif text-xl md:text-2xl lg:text-3xl text-brand-cream/80 mb-4">
              Empowering Women to <span className="italic text-brand-pink">Lead</span>,{" "}
              <span className="italic text-brand-pink">Build Wealth</span>, &{" "}
              <span className="italic text-brand-pink">Own Their Narrative</span>
            </p>
            <p className="font-sans text-sm text-brand-cream/50 max-w-lg mx-auto mb-10">
              Hosted by Aimee Rickabus — Author, CEO, and advocate for women who refuse to settle.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-none px-10 py-6 font-sans uppercase tracking-widest text-xs group">
              <Play size={16} className="mr-2 group-hover:scale-110 transition-transform" />
              Listen Now
            </Button>
            <Button
              variant="outline"
              className="border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 rounded-none px-10 py-6 font-sans uppercase tracking-widest text-xs"
            >
              <BookOpen size={16} className="mr-2" />
              Get the Book
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
            {[
              { value: 30, suffix: "+", label: "Episodes" },
              { value: 5.0, suffix: "★", label: "Rating" },
              { value: 50, suffix: "K+", label: "Downloads" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-bold text-brand-gold">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-sans text-xs uppercase tracking-widest text-brand-cream/50 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float">
          <ArrowDown size={20} className="text-brand-gold/60" />
        </div>
      </section>

      {/* ============ AS FEATURED IN ============ */}
      <section className="py-12 border-y border-brand-cream/10 overflow-hidden">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-center text-brand-cream/40 mb-8">
          As Featured In
        </p>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 mx-8">
              {["Forbes", "Inc.", "Entrepreneur", "Bloomberg", "Fast Company", "Business Insider", "HuffPost", "ABC News"].map(
                (name) => (
                  <span key={`${setIdx}-${name}`} className="font-serif text-xl md:text-2xl text-brand-cream/20 italic">
                    {name}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============ MEET AIMEE ============ */}
      <section className="section-padding">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="slide-in-left">
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-brand-gold/20 to-brand-pink/20 rounded-sm overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
                    alt="Aimee Rickabus"
                    className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                    loading="lazy"
                  />
                </div>
                {/* Floating quote card */}
                <div className="absolute -bottom-6 -right-6 bg-brand-dark border border-brand-gold/30 p-6 max-w-xs hidden md:block">
                  <p className="font-serif text-lg italic text-brand-gold leading-relaxed">
                    "Every woman has the power to rewrite her own story."
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-in-right" delay={200}>
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-pink mb-4">
                Meet Your Host
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Aimee <span className="italic text-brand-gold">Rickabus</span>
              </h2>
              <p className="font-sans text-brand-cream/70 leading-relaxed mb-6">
                Mother. CEO. Author. Podcast Host. Aimee Rickabus is on a mission to empower women 
                to take control of their careers, finances, and futures. Through The Manage Her Podcast, 
                she brings raw, unfiltered conversations with industry leaders, entrepreneurs, and 
                change-makers who are reshaping what it means to be a woman in power.
              </p>
              <p className="font-sans text-brand-cream/70 leading-relaxed mb-8">
                With her debut book and a rapidly growing community of ambitious women, Aimee is building 
                more than a brand — she's building a movement.
              </p>
              <Button
                variant="outline"
                className="border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 rounded-none px-8 py-5 font-sans uppercase tracking-widest text-xs"
                asChild
              >
                <a href="/about">Her Full Story →</a>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ 3 PILLARS ============ */}
      <section className="section-padding bg-brand-cream text-brand-dark">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-pink mb-4">
                The Foundation
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Three Pillars of <span className="italic">Empowerment</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 150}>
                <div className="group p-8 border border-brand-dark/10 hover:border-brand-pink/30 transition-all duration-500 hover:shadow-xl relative overflow-hidden">
                  <div className="absolute top-4 right-4 font-serif text-6xl font-bold text-brand-dark/5 group-hover:text-brand-pink/10 transition-colors">
                    0{i + 1}
                  </div>
                  <pillar.icon
                    size={32}
                    className="text-brand-pink mb-6 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="font-serif text-2xl font-bold mb-4">{pillar.title}</h3>
                  <p className="font-sans text-brand-dark/70 leading-relaxed">{pillar.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LATEST EPISODES ============ */}
      <section id="listen" className="section-padding">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-4">
                  Latest Episodes
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold">
                  Tune In & <span className="italic text-brand-pink">Turn Up</span>
                </h2>
              </div>
              <Button
                variant="outline"
                className="border-brand-cream/20 text-brand-cream hover:bg-brand-cream/10 rounded-none mt-6 md:mt-0 font-sans uppercase tracking-widest text-xs"
                asChild
              >
                <a href="/podcast">All Episodes →</a>
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {episodes.map((ep, i) => (
              <ScrollReveal key={ep.ep} delay={i * 100}>
                <div className="group border border-brand-cream/10 hover:border-brand-gold/30 p-6 transition-all duration-500 hover:bg-brand-cream/5 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-sans text-xs uppercase tracking-widest text-brand-gold">
                      {ep.ep}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-widest text-brand-pink">
                      {ep.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 group-hover:text-brand-gold transition-colors">
                    {ep.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-sm text-brand-cream/50">
                      with {ep.guest}
                    </p>
                    <div className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center group-hover:bg-brand-pink group-hover:border-brand-pink transition-all duration-300">
                      <Play size={14} className="text-brand-pink group-hover:text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Platform Links */}
          <ScrollReveal delay={400}>
            <div className="flex flex-wrap justify-center gap-6 mt-12 pt-12 border-t border-brand-cream/10">
              {[
                { icon: Headphones, label: "Apple Podcasts" },
                { icon: Mic, label: "Spotify" },
                { icon: Play, label: "YouTube" },
              ].map((platform) => (
                <a
                  key={platform.label}
                  href="#"
                  className="flex items-center gap-2 font-sans text-sm text-brand-cream/50 hover:text-brand-gold transition-colors group"
                >
                  <platform.icon size={18} className="group-hover:scale-110 transition-transform" />
                  {platform.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ BOOK TEASER ============ */}
      <section className="section-padding bg-gradient-to-br from-brand-dark via-[hsl(328,30%,12%)] to-brand-dark">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="scale-in">
              <div className="flex justify-center">
                <div className="book-3d">
                  <div className="book-3d-inner w-64 md:w-72 aspect-[2/3] bg-gradient-to-br from-brand-gold/30 via-brand-pink/20 to-brand-dark border border-brand-gold/20 shadow-2xl flex flex-col items-center justify-center p-8">
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-4">
                      The Book
                    </p>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-center leading-tight mb-3">
                      THE<br />
                      <span className="italic text-brand-gold">MANAGE</span>
                      <span>HER</span>
                    </h3>
                    <div className="w-12 h-px bg-brand-gold/40 my-4" />
                    <p className="font-sans text-xs text-brand-cream/60 text-center">
                      Aimee Rickabus
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-in-right" delay={200}>
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-pink mb-4">
                Now Available
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                The Book That's <span className="italic text-brand-gold">Changing the Game</span>
              </h2>
              <p className="font-sans text-brand-cream/70 leading-relaxed mb-6">
                Part memoir, part manifesto — The Manage Her is the definitive guide for women who 
                are ready to stop managing everyone else's expectations and start managing their own 
                legacy. Packed with real stories, actionable strategies, and the unfiltered truth about 
                what it takes to win.
              </p>
              <div className="flex items-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-brand-gold fill-brand-gold" />
                ))}
                <span className="font-sans text-sm text-brand-cream/50 ml-2">
                  "A must-read" — 200+ reviews
                </span>
              </div>
              <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark rounded-none px-10 py-6 font-sans uppercase tracking-widest text-xs font-semibold">
                Get Your Copy →
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section-padding bg-brand-cream text-brand-dark">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-pink mb-4">
                What Women Are Saying
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Words That <span className="italic">Move Us</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.author} delay={i * 150}>
                <div className="p-8 border border-brand-dark/10 relative">
                  <span className="font-serif text-6xl text-brand-pink/20 absolute top-4 left-6">"</span>
                  <p className="font-serif text-lg italic leading-relaxed mb-6 mt-8 text-brand-dark/80">
                    {t.quote}
                  </p>
                  <div>
                    <p className="font-sans text-sm font-semibold">{t.author}</p>
                    <p className="font-sans text-xs text-brand-dark/50">{t.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
