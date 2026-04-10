import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AIMEE_PHOTO = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df73543f31f1.jpg";

const About = () => (
  <div className="overflow-x-hidden">
    <Navbar />

    {/* Hero */}
    <section className="py-20 md:py-28 px-6" style={{ background: "linear-gradient(160deg, hsl(180 30% 94%) 0%, hsl(260 40% 94%) 40%, hsl(340 50% 95%) 100%)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-pink mb-4 opacity-0 animate-fade-in">Meet Your Host</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-navy leading-[1.1] mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            Hey, I'm <em className="text-brand-pink">Aimee.</em>
          </h1>
          <p className="font-serif text-xl md:text-2xl text-brand-navy/80 mb-6 leading-snug opacity-0 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
            I built a nine-figure company while raising <em className="text-brand-pink">six kids.</em>
          </p>
          <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
            I'm a CEO, author, podcast host, and mother of six who has spent two decades in leadership — not because someone handed me a title, but because <strong>women are already leading everywhere</strong>. At home. At work. In their communities. We're just not getting credit for it.
          </p>
          <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-7 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            The Manage Her™ exists because I got tired of watching brilliant women shrink. This podcast is your permission slip to <strong>stop managing yourself down</strong> and start leading like you mean it.
          </p>
          <div className="flex flex-wrap gap-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            {["CEO, 9-Figure Tech Company", "Author", "Mother of Six", "NAWBO Award Recipient", "Podcast Host"].map((tag) => (
              <span key={tag} className="font-sans text-xs font-medium bg-brand-blush text-brand-pink px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
        <div className="opacity-0 animate-scale-in" style={{ animationDelay: "300ms" }}>
          <img src={AIMEE_PHOTO} alt="Aimee Rickabus" className="w-full max-w-md mx-auto rounded-2xl shadow-xl" loading="eager" />
        </div>
      </div>
    </section>

    {/* Pull quote */}
    <section className="bg-brand-pink py-14 md:py-16 px-6">
      <ScrollReveal>
        <blockquote className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl text-primary-foreground italic leading-relaxed">
            "The most revolutionary thing a woman can do is stop asking for permission to lead the life she's already building."
          </p>
        </blockquote>
      </ScrollReveal>
    </section>

    {/* Story */}
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy text-center mb-14">
            The <em className="text-brand-pink">Journey</em>
          </h2>
        </ScrollReveal>

        {[
          { label: "The Beginning", title: "Mother & Visionary", text: "Aimee's journey started with a simple realization: the systems weren't built for women like her. As a mother navigating career and family, she saw the gaps — and decided to fill them herself." },
          { label: "The Pivot", title: "CEO & Entrepreneur", text: "Building a nine-figure tech company from the ground up, Aimee learned the hard lessons about leadership, finance, and resilience. Every setback became a setup for something greater." },
          { label: "The Platform", title: "Podcast Host", text: "The Manage Her™ Podcast was born from a desire to give women a seat at the table — and a microphone. What started as conversations became a movement reaching over 50,000 downloads." },
          { label: "The Movement", title: "Author & Advocate", text: "With her book and a growing community, Aimee is scaling her mission: empowering women to lead, build wealth, and own their narrative — unapologetically. The revolution is just getting started." },
        ].map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 100}>
            <div className="flex gap-6 md:gap-8 mb-10">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-3.5 h-3.5 rounded-full bg-brand-pink" />
                {i < 3 && <div className="w-px flex-1 bg-brand-pink/15 mt-2" />}
              </div>
              <div className="pb-2">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-pink mb-1">{item.label}</p>
                <h3 className="font-serif text-2xl font-bold text-brand-navy mb-3">{item.title}</h3>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, hsl(340 50% 96%), hsl(260 40% 94%))" }}>
      <ScrollReveal>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy mb-5">
            Ready to <em className="text-brand-pink">connect?</em>
          </h2>
          <p className="font-sans text-[15px] text-muted-foreground mb-8 leading-relaxed">
            Whether it's a speaking engagement, media feature, or partnership — let's make it happen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-full px-7 h-11 font-sans text-sm font-medium shadow-lg shadow-brand-pink/20" asChild>
              <Link to="/press">Press & Speaking →</Link>
            </Button>
            <Button variant="outline" className="rounded-full px-7 h-11 font-sans text-sm font-medium border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5" asChild>
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
