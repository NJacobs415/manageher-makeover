import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/animations/CursorFollower";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Parallax from "@/components/animations/Parallax";
import editorialAccent from "@/assets/editorial-accent.png";
import { Link } from "react-router-dom";

const AIMEE_PHOTO = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df73543f31f1.jpg";

const About = () => (
  <div className="overflow-x-hidden page-enter">
    <CursorFollower />
    <Navbar />

    {/* Hero — editorial full-bleed */}
    <section className="relative min-h-[80vh] flex items-end overflow-hidden">
      <img
        src={AIMEE_PHOTO}
        alt="Aimee Rickabus"
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-12 pb-16 md:pb-24">
        <TextReveal>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-4">About Aimee</p>
        </TextReveal>
        <TextReveal delay={200}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-background leading-[1.1]">
            I get it.<br /><em className="text-brand-pink italic">I've been there.</em>
          </h1>
        </TextReveal>
      </div>
    </section>

    {/* Bio — asymmetric editorial */}
    <section className="py-24 md:py-36 px-6 bg-background relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <FadeIn y={40}>
              <p className="font-serif text-xl md:text-2xl text-foreground/70 italic leading-snug mb-8">
                I'm a mother of six who built a nine-figure technology company from the ground up.
              </p>
            </FadeIn>
            <FadeIn delay={200} y={30}>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-5">
                Over two decades, I've navigated leadership, invisible labor, financial independence, and the constant juggle that every woman knows but few get credit for. I've been recognized by NAWBO as a Remarkable Woman, launched a top-ranked podcast, and written a book that puts words to what millions of women feel but can't articulate.
              </p>
            </FadeIn>
            <FadeIn delay={300} y={30}>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-5">
                But what really matters? I'm known for taking the confusion out of women's leadership and showing you simple, proven strategies that actually work. No fluff, no hustle-for-hustle's-sake, no endless guilt.
              </p>
            </FadeIn>
            <FadeIn delay={400} y={30}>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                The Manage Her™ exists because I got tired of watching brilliant women shrink. This podcast is your permission slip to stop managing yourself down and start leading like you mean it.
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <FadeIn delay={300} y={40}>
              <div className="space-y-6">
                {["CEO, 9-Figure Tech Company", "Author", "Mother of Six", "NAWBO Award Recipient", "Podcast Host"].map((tag) => (
                  <div key={tag} className="border-b border-border pb-4">
                    <p className="font-sans text-sm font-medium text-foreground">{tag}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    {/* Journey timeline */}
    <section className="py-24 md:py-36 px-6 bg-brand-cream relative overflow-hidden">
      <Parallax speed={0.1} className="absolute top-20 right-0 w-48 opacity-10 pointer-events-none">
        <img src={editorialAccent} alt="" width={800} height={800} loading="lazy" aria-hidden="true" />
      </Parallax>

      <div className="max-w-3xl mx-auto relative z-10">
        <TextReveal>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center mb-20">
            The <em className="text-brand-pink italic">journey.</em>
          </h2>
        </TextReveal>

        {[
          { num: "01", label: "The Beginning", title: "Mother & Visionary", text: "The systems weren't built for women like her. As a mother navigating career and family, she saw the gaps — and decided to fill them herself." },
          { num: "02", label: "The Pivot", title: "CEO & Entrepreneur", text: "Building a nine-figure tech company from the ground up. Every setback became a setup for something greater." },
          { num: "03", label: "The Platform", title: "Podcast Host", text: "The Manage Her™ Podcast was born from a desire to give women a seat at the table — and a microphone." },
          { num: "04", label: "The Movement", title: "Author & Advocate", text: "Empowering women to lead, build wealth, and own their narrative — unapologetically. The revolution is just getting started." },
        ].map((item, i) => (
          <FadeIn key={item.num} delay={i * 100} y={30}>
            <div className="grid grid-cols-12 gap-4 mb-16">
              <div className="col-span-2 md:col-span-1">
                <span className="font-serif text-3xl italic text-brand-pink/20">{item.num}</span>
              </div>
              <div className="col-span-10 md:col-span-11 border-l border-brand-pink/15 pl-6">
                <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-brand-gold mb-2">{item.label}</p>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    {/* Quote */}
    <section className="py-24 md:py-32 px-6 bg-foreground">
      <FadeIn>
        <blockquote className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-4xl text-background italic leading-relaxed">
            "The most revolutionary thing a woman can do is stop asking for permission to lead the life she's already building."
          </p>
          <footer className="font-sans text-[10px] uppercase tracking-[0.3em] text-background/30 mt-8">— Aimee Rickabus</footer>
        </blockquote>
      </FadeIn>
    </section>

    {/* CTA */}
    <section className="py-24 px-6 bg-brand-cream">
      <FadeIn>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to <em className="text-brand-pink italic">connect?</em>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/press" className="btn-glow bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4">
              Press & Speaking
            </Link>
            <Link to="/podcast" className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all">
              Listen to the Podcast
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>

    <Footer />
  </div>
);

export default About;
