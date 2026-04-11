import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AIMEE_PHOTO = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df73543f31f1.jpg";

const About = () => (
  <div className="overflow-x-hidden">
    <Navbar />

    {/* Hero — Amy style: light bg, photo + text side by side */}
    <section className="bg-brand-ice py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="opacity-0 animate-scale-in">
          <img src={AIMEE_PHOTO} alt="Aimee Rickabus" className="w-full max-w-md mx-auto" loading="eager" />
        </div>
        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4 opacity-0 animate-fade-in">
            About Aimee
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-brand-pink leading-[1.1] mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            I get it. I've been there too.
          </h1>
          <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
            I'm Aimee Rickabus, a mother of six who built a nine-figure technology company from the ground up. Over two decades, I've navigated leadership, invisible labor, financial independence, and the constant juggle that every woman knows but few get credit for.
          </p>
          <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
            I've been recognized by NAWBO as a Remarkable Woman, launched a top-ranked podcast, and written a book that puts words to what millions of women feel but can't articulate.
          </p>
          <p className="font-sans text-[15px] text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            But what really matters? I'm known for taking the confusion out of women's leadership and showing you simple, proven strategies that actually work. No fluff, no hustle-for-hustle's-sake, no endless guilt.
          </p>
        </div>
      </div>
    </section>

    {/* As Featured In */}
    <section className="py-10 px-6 bg-background border-b border-border">
      <div className="max-w-5xl mx-auto">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 text-center mb-6">As Featured In:</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          {["NAWBO", "Apple Podcasts", "Spotify", "Amazon Music", "YouTube"].map((name) => (
            <span key={name} className="font-serif text-xl md:text-2xl font-bold text-brand-navy/15">{name}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Journey — clean timeline */}
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-pink text-center mb-16">
            The Journey
          </h2>
        </ScrollReveal>

        {[
          { label: "The Beginning", title: "Mother & Visionary", text: "Aimee's journey started with a simple realization: the systems weren't built for women like her. As a mother navigating career and family, she saw the gaps — and decided to fill them herself." },
          { label: "The Pivot", title: "CEO & Entrepreneur", text: "Building a nine-figure tech company from the ground up, Aimee learned the hard lessons about leadership, finance, and resilience. Every setback became a setup for something greater." },
          { label: "The Platform", title: "Podcast Host", text: "The Manage Her™ Podcast was born from a desire to give women a seat at the table — and a microphone. What started as conversations became a movement." },
          { label: "The Movement", title: "Author & Advocate", text: "With her book and a growing community, Aimee is scaling her mission: empowering women to lead, build wealth, and own their narrative — unapologetically." },
        ].map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 100}>
            <div className="flex gap-6 md:gap-8 mb-12">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-4 h-4 rounded-full bg-brand-pink" />
                {i < 3 && <div className="w-px flex-1 bg-brand-pink/15 mt-2" />}
              </div>
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-1">{item.label}</p>
                <h3 className="font-serif text-2xl font-bold text-brand-navy mb-3">{item.title}</h3>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>

    {/* Pull quote — Amy style, full-width pink bar */}
    <section className="bg-brand-pink py-16 md:py-20 px-6">
      <ScrollReveal>
        <blockquote className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground italic leading-relaxed">
            "The most revolutionary thing a woman can do is stop asking for permission to lead the life she's already building."
          </p>
          <footer className="font-sans text-sm text-primary-foreground/60 mt-5 uppercase tracking-wide">
            — Aimee Rickabus
          </footer>
        </blockquote>
      </ScrollReveal>
    </section>

    {/* CTA */}
    <section className="py-20 px-6 bg-brand-ice">
      <ScrollReveal>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy mb-5">
            Ready to connect?
          </h2>
          <p className="font-sans text-[15px] text-muted-foreground mb-8">
            Whether it's a speaking engagement, media feature, or partnership — let's make it happen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground px-7 h-11 font-sans text-sm font-bold uppercase tracking-[0.08em]" asChild>
              <Link to="/press">Press & Speaking →</Link>
            </Button>
            <Button variant="outline" className="px-7 h-11 font-sans text-sm font-bold uppercase tracking-[0.08em] border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5" asChild>
              <Link to="/podcast">Listen to the Podcast</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>

    <Footer />
  </div>
);

export default About;
