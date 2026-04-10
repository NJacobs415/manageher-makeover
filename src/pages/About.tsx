import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Mic, Users } from "lucide-react";

const timeline = [
  { year: "The Beginning", title: "Mother & Visionary", description: "Aimee's journey started with a simple realization: the systems weren't built for women like her. As a mother navigating career and family, she saw the gaps — and decided to fill them." },
  { year: "The Pivot", title: "CEO & Entrepreneur", description: "Building businesses from the ground up, Aimee learned the hard lessons about leadership, finance, and resilience. Every setback became a setup for something greater." },
  { year: "The Platform", title: "Podcast Host", description: "The Manage Her Podcast was born from a desire to give women a seat at the table — and a microphone. What started as conversations became a movement." },
  { year: "The Movement", title: "Author & Advocate", description: "With her debut book and a growing community, Aimee is scaling her mission: empowering women to lead, build wealth, and own their narrative — unapologetically." },
];

const About = () => {
  return (
    <div className="bg-brand-dark text-brand-cream overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/30 z-10" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&h=800&fit=crop"
            alt="Aimee Rickabus"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative z-20 section-padding pb-16 w-full">
          <div className="editorial-container">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-4 animate-fade-in">
              Her Story
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold opacity-0 animate-fade-in-up">
              Meet <span className="italic text-brand-gold">Aimee</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="editorial-container max-w-4xl">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
              <div className="border-l-2 border-brand-gold pl-6">
                <p className="font-serif text-2xl italic text-brand-gold leading-relaxed">
                  "I didn't wait for permission. I gave it to myself."
                </p>
              </div>
              <div>
                <p className="font-sans text-brand-cream/70 leading-relaxed mb-6">
                  Aimee Rickabus is a mother, CEO, best-selling author, and the host of The Manage Her Podcast — 
                  a platform dedicated to empowering women to take control of their careers, finances, and futures.
                </p>
                <p className="font-sans text-brand-cream/70 leading-relaxed">
                  With a background in business leadership and a passion for financial literacy, Aimee brings 
                  unfiltered conversations about what it really takes to succeed as a woman in today's world. 
                  Her work has been featured in major publications and her podcast has amassed a loyal following 
                  of ambitious women across the globe.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding bg-brand-cream text-brand-dark">
        <div className="editorial-container max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-pink mb-4">The Journey</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                From Vision to <span className="italic">Movement</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 100}>
                <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 items-start">
                  <div className="text-right">
                    <span className="font-serif text-sm md:text-base italic text-brand-pink font-semibold">
                      {item.year}
                    </span>
                  </div>
                  <div className="border-l-2 border-brand-dark/10 pl-6">
                    <h3 className="font-serif text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="font-sans text-brand-dark/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section-padding">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Many Hats, <span className="italic text-brand-gold">One Mission</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Mic, title: "Podcast Host", desc: "30+ episodes & counting" },
              { icon: BookOpen, title: "Author", desc: "Best-selling debut book" },
              { icon: Users, title: "Community Leader", desc: "50K+ women strong" },
              { icon: Award, title: "Speaker", desc: "National stages & events" },
            ].map((role, i) => (
              <ScrollReveal key={role.title} delay={i * 100}>
                <div className="text-center p-8 border border-brand-cream/10 hover:border-brand-gold/30 transition-all duration-500 group">
                  <role.icon size={32} className="mx-auto text-brand-gold mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-serif text-xl font-bold mb-2">{role.title}</h3>
                  <p className="font-sans text-sm text-brand-cream/50">{role.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-brand-dark via-[hsl(328,30%,12%)] to-brand-dark text-center">
        <ScrollReveal>
          <div className="editorial-container max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="italic text-brand-pink">Connect</span>?
            </h2>
            <p className="font-sans text-brand-cream/60 mb-8">
              Whether it's a speaking engagement, collaboration, or just a conversation — let's make it happen.
            </p>
            <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-none px-10 py-6 font-sans uppercase tracking-widest text-xs" asChild>
              <a href="/press">Get In Touch →</a>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default About;
