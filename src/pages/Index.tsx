import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Play, ArrowDown, Star, Headphones, Mic, TrendingUp, Users, Heart } from "lucide-react";

const episodes = [
  { title: "Breaking the Glass Ceiling in Corporate America", guest: "Dr. Sarah Mitchell", category: "Leadership", ep: "EP 32" },
  { title: "Building Generational Wealth as a Woman of Color", guest: "Jasmine Torres", category: "Finance", ep: "EP 31" },
  { title: "From Side Hustle to 7-Figure Empire", guest: "Michelle Chang", category: "Entrepreneurship", ep: "EP 30" },
];

const testimonials = [
  { quote: "This podcast changed the way I think about leadership and my own potential. Aimee is the mentor every woman needs.", author: "Jessica R.", role: "CEO & Founder" },
  { quote: "Every episode leaves me fired up and ready to take action. The Manage Her is a must-listen for ambitious women.", author: "Maria L.", role: "VP of Marketing" },
  { quote: "Aimee's authenticity and wisdom are unmatched. She doesn't just talk about empowerment — she lives it.", author: "Danielle K.", role: "Entrepreneur" },
];

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* ===== HERO — Amy Porterfield style: bright, photo alongside text ===== */}
      <section className="min-h-screen flex items-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(340 40% 95%), hsl(35 50% 96%), hsl(270 30% 95%))" }}>
        <div className="editorial-container w-full px-6 lg:px-12 pt-24 lg:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-screen">
            {/* Left: Copy */}
            <div className="max-w-xl z-10">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand-pink font-medium mb-6">
                  The Podcast for Women Who Lead
                </p>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 opacity-0 animate-fade-in-up">
                What <em className="text-brand-pink">really</em> empowers women to build the life they deserve.
              </h1>

              <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <p className="font-sans text-lg text-brand-warm-gray leading-relaxed mb-8 max-w-md">
                  From proven strategies to raw, real conversations — I'll help you take control of your career, finances, and future.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-full px-8 py-6 font-sans text-sm group shadow-lg shadow-brand-pink/20">
                  <Play size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                  Listen Now
                </Button>
                <Button
                  variant="outline"
                  className="border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5 rounded-full px-8 py-6 font-sans text-sm"
                  asChild
                >
                  <a href="/book">Get the Book</a>
                </Button>
              </div>
            </div>

            {/* Right: Hero Photo */}
            <div className="relative flex justify-center lg:justify-end opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=top"
                  alt="Aimee Rickabus"
                  className="w-80 md:w-96 lg:w-[28rem] h-auto object-cover rounded-2xl shadow-2xl"
                  loading="eager"
                />
                {/* Floating stat card */}
                <div className="absolute -bottom-4 -left-4 md:-left-8 bg-card rounded-xl shadow-lg p-4 md:p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center">
                      <Headphones size={18} className="text-brand-pink" />
                    </div>
                    <div>
                      <p className="font-serif text-lg font-bold text-brand-navy">
                        <AnimatedCounter target={50} suffix="K+" />
                      </p>
                      <p className="font-sans text-xs text-muted-foreground">Downloads</p>
                    </div>
                  </div>
                </div>
                {/* Floating rating card */}
                <div className="absolute -top-4 -right-4 md:-right-8 bg-card rounded-xl shadow-lg p-4 md:p-5">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">5.0 · 500+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ArrowDown size={20} className="text-brand-pink/50" />
        </div>
      </section>

      {/* ===== AS SEEN IN ===== */}
      <section className="py-10 bg-card border-y border-border overflow-hidden">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-center text-muted-foreground mb-6">
          As Featured In
        </p>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-12 md:gap-16 mx-8 items-center">
              {["Forbes", "Inc.", "Entrepreneur", "Bloomberg", "Fast Company", "Business Insider", "HuffPost", "ABC News"].map(
                (name) => (
                  <span key={`${setIdx}-${name}`} className="font-serif text-lg md:text-xl text-muted-foreground/40 italic select-none">
                    {name}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== MEET AIMEE — Warm, personal, like Marie/Amy ===== */}
      <section className="section-padding bg-background">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="slide-in-left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=700&fit=crop"
                  alt="Aimee Rickabus"
                  className="w-full rounded-2xl shadow-xl"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-in-right" delay={200}>
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand-pink font-medium mb-3">
                Heya!
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                I'm <span className="italic text-brand-pink">Aimee.</span>
              </h2>
              <p className="font-sans text-brand-warm-gray leading-relaxed mb-5">
                My hunch is someone you trust mentioned my name, or you stumbled upon one of my 
                episodes online. Whatever path you took, I'm really glad you're here.
              </p>
              <p className="font-sans text-brand-warm-gray leading-relaxed mb-5">
                I'm a mother, CEO, author, and the host of The Manage Her Podcast. I went from 
                the corporate grind to building a platform that's helped thousands of women take 
                control of their careers, finances, and futures. No fluff, no fake hustle — just 
                real strategies that actually work.
              </p>
              <p className="font-serif text-xl italic text-brand-pink leading-relaxed mb-8">
                "Every woman has the power to rewrite her own story."
              </p>
              <Button
                variant="outline"
                className="border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5 rounded-full px-8 py-5 font-sans text-sm"
                asChild
              >
                <a href="/about">Learn More About Me →</a>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== WHAT I HELP WITH — Clean cards, warm feel ===== */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(35 50% 96%), hsl(340 40% 96%))" }}>
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                I help women turn their <em className="text-brand-pink">ambition</em> into action.
              </h2>
              <p className="font-sans text-brand-warm-gray leading-relaxed">
                Here you'll find tools, strategies, podcast episodes, and a book designed to help you 
                take the next right step.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Financial Literacy", description: "Master your money, build generational wealth, and create financial freedom on your own terms. No jargon, just clarity." },
              { icon: Users, title: "Leadership", description: "Step into your power as a leader — in the boardroom, at home, and in your community. It's time to take up space." },
              { icon: Heart, title: "Empowerment", description: "Own your narrative, embrace your journey, and inspire the women around you to do the same. This is your era." },
            ].map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 150}>
                <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group text-center">
                  <div className="w-14 h-14 rounded-full bg-brand-pink/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-pink/20 transition-colors">
                    <pillar.icon size={24} className="text-brand-pink" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4">{pillar.title}</h3>
                  <p className="font-sans text-brand-warm-gray leading-relaxed">{pillar.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PODCAST EPISODES — Clean, bright ===== */}
      <section id="listen" className="section-padding bg-card">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand-pink font-medium mb-3">
                  The Podcast
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold">
                  The Manage Her Show
                </h2>
              </div>
              <Button
                variant="outline"
                className="border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5 rounded-full mt-6 md:mt-0 font-sans text-sm"
                asChild
              >
                <a href="/podcast">All Episodes →</a>
              </Button>
            </div>
          </ScrollReveal>

          {/* Stats bar */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-8 mb-12 pb-8 border-b border-border">
              {[
                { label: "Downloads", value: 50, suffix: "K+" },
                { label: "Episodes", value: 30, suffix: "+" },
                { label: "5-Star Reviews", value: 500, suffix: "+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl font-bold text-brand-pink">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {episodes.map((ep, i) => (
              <ScrollReveal key={ep.ep} delay={i * 100}>
                <div className="group flex items-center justify-between p-6 rounded-xl hover:bg-brand-blush transition-all duration-300 cursor-pointer border border-transparent hover:border-brand-pink/10">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center group-hover:bg-brand-pink transition-all duration-300 shrink-0">
                      <Play size={16} className="text-brand-pink group-hover:text-primary-foreground ml-0.5" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-brand-pink font-medium mb-1">{ep.ep} · {ep.category}</p>
                      <h3 className="font-serif text-lg md:text-xl font-semibold group-hover:text-brand-pink transition-colors">
                        {ep.title}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground mt-1">with {ep.guest}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Platform links */}
          <ScrollReveal delay={300}>
            <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-border">
              {[
                { icon: Headphones, label: "Apple Podcasts" },
                { icon: Mic, label: "Spotify" },
                { icon: Play, label: "YouTube" },
              ].map((p) => (
                <a key={p.label} href="#" className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-brand-pink transition-colors group">
                  <p.icon size={16} className="group-hover:scale-110 transition-transform" />
                  {p.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== BOOK SECTION — Warm, editorial ===== */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(340 40% 96%), hsl(270 30% 94%), hsl(35 50% 96%))" }}>
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="scale-in">
              <div className="flex justify-center">
                <div className="book-3d">
                  <div className="book-3d-inner w-56 md:w-64 aspect-[2/3] bg-gradient-to-br from-brand-pink/90 to-brand-hot-pink rounded-lg shadow-2xl flex flex-col items-center justify-center p-8 text-primary-foreground">
                    <p className="font-sans text-xs uppercase tracking-[0.3em] opacity-80 mb-4">The Book</p>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-center leading-tight mb-3">
                      THE<br /><em>MANAGE</em><br />HER
                    </h3>
                    <div className="w-10 h-px bg-primary-foreground/40 my-3" />
                    <p className="font-sans text-xs opacity-80">Aimee Rickabus</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-in-right" delay={200}>
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand-gold font-medium mb-3">
                Now Available
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                The book that's <em className="text-brand-pink">changing the game.</em>
              </h2>
              <p className="font-sans text-brand-warm-gray leading-relaxed mb-6">
                Part memoir, part manifesto — The Manage Her is the definitive guide for women 
                who are ready to stop managing everyone else's expectations and start managing 
                their own legacy. Packed with real stories, actionable strategies, and the 
                unfiltered truth about what it takes to win.
              </p>
              <div className="flex items-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-brand-gold fill-brand-gold" />
                ))}
                <span className="font-sans text-sm text-muted-foreground ml-2">"A must-read" — 200+ reviews</span>
              </div>
              <Button className="bg-brand-navy hover:bg-brand-navy/90 text-primary-foreground rounded-full px-8 py-6 font-sans text-sm shadow-lg" asChild>
                <a href="/book">Get Your Copy →</a>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-card">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                What women are <em className="text-brand-pink">saying</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.author} delay={i * 150}>
                <div className="bg-background rounded-2xl p-8 shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <p className="font-serif text-lg italic leading-relaxed mb-6 text-brand-navy/80">
                    "{t.quote}"
                  </p>
                  <div>
                    <p className="font-sans text-sm font-semibold text-brand-navy">{t.author}</p>
                    <p className="font-sans text-xs text-muted-foreground">{t.role}</p>
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
