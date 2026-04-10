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
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 section-padding" style={{ background: "linear-gradient(180deg, hsl(340 40% 95%), hsl(35 50% 96%))" }}>
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand-pink font-medium mb-4 opacity-0 animate-fade-in">
                My Story
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 opacity-0 animate-fade-in-up">
                Hi, I'm <em className="text-brand-pink">Aimee.</em>
              </h1>
              <p className="font-sans text-lg text-brand-warm-gray leading-relaxed mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                My hunch is someone you trust mentioned my name, or you stumbled upon one of my episodes 
                online. Whatever path you took, I'm really glad you're here. This site is full of 
                incredible resources and ideas that can help you change your life (not kidding!).
              </p>
              <p className="font-sans text-brand-warm-gray leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                I'm a former corporate warrior who swapped the 9-to-5 grind for a mission that 
                matters: helping women take control of their careers, finances, and futures. Through 
                my podcast, book, and community, I've had the privilege of walking alongside thousands 
                of women on their journey to building something extraordinary.
              </p>
            </div>
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&crop=top"
                alt="Aimee Rickabus"
                className="w-full rounded-2xl shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="section-padding bg-brand-pink text-primary-foreground text-center">
        <ScrollReveal>
          <div className="editorial-container max-w-3xl mx-auto">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic leading-snug">
              "I didn't wait for permission. I gave it to myself."
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding bg-card">
        <div className="editorial-container max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                From vision to <em className="text-brand-pink">movement</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 100}>
                <div className="flex gap-6 md:gap-10">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-brand-pink shrink-0" />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-brand-pink/20 mt-2" />}
                  </div>
                  <div className="pb-8">
                    <p className="font-sans text-sm text-brand-pink font-medium mb-1">{item.year}</p>
                    <h3 className="font-serif text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="font-sans text-brand-warm-gray leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(35 50% 96%), hsl(270 30% 94%))" }}>
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Many hats, <em className="text-brand-pink">one mission</em>
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
                <div className="bg-card text-center rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-full bg-brand-pink/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-pink/20 transition-colors">
                    <role.icon size={24} className="text-brand-pink" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">{role.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground">{role.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-blush text-center">
        <ScrollReveal>
          <div className="editorial-container max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ready to <em className="text-brand-pink">connect</em>?
            </h2>
            <p className="font-sans text-brand-warm-gray mb-8 leading-relaxed">
              Whether it's a speaking engagement, collaboration, or just a conversation — let's make it happen.
            </p>
            <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-full px-10 py-6 font-sans text-sm shadow-lg shadow-brand-pink/20" asChild>
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
