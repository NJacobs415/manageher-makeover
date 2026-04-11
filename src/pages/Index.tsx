import { useState, useEffect } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const AIMEE_PHOTO = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df73543f31f1.jpg";
const BOOK_COVER = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df1d0b3f31f3.jpg";

const testimonials = [
  { text: "I listened to the first episode on my commute and pulled over because I was crying. She put words to something I've felt for years but couldn't name.", author: "Sarah M.", source: "Apple Podcasts" },
  { text: "Finally a podcast that doesn't just tell women to 'lean in' — it actually validates what we're already doing and shows us how to own it.", author: "Jessica R.", source: "Spotify" },
  { text: "Aimee speaks with the authority of a CEO and the heart of a mom who gets it. Every working mother needs this in her earbuds.", author: "Lauren T.", source: "Apple Podcasts" },
  { text: "This podcast gave me the courage to ask for a raise, set boundaries with my boss, and finally start investing. I'm a different person.", author: "Monica D.", source: "Apple Podcasts" },
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* ════════ HERO — Amy Porterfield style: light bg, huge serif headline left, photo right ════════ */}
      <section className="bg-brand-ice relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh] py-16 lg:py-0">
            {/* Headline — left */}
            <div className="z-10 order-2 lg:order-1">
              <h1 className="font-serif text-[2.8rem] md:text-[3.8rem] lg:text-[4.2rem] font-bold leading-[1.08] text-brand-pink mb-6 opacity-0 animate-fade-in-up">
                What <em className="italic">really</em> matters
                <br />in women's leadership today.
              </h1>

              <p className="font-sans text-sm md:text-base font-medium uppercase tracking-[0.12em] text-brand-navy/70 leading-relaxed mb-8 max-w-lg opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                From the boardroom to the kitchen table, I'll help you cut through the noise and lead the life you're already building.
              </p>
            </div>

            {/* Photo — right, Amy-style cutout feel */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 opacity-0 animate-scale-in" style={{ animationDelay: "300ms" }}>
              <img
                src={AIMEE_PHOTO}
                alt="Aimee Rickabus — Host of The Manage Her Podcast"
                className="relative z-10 w-72 md:w-80 lg:w-[24rem] object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ABOUT — Amy style: photo left with book overlay, bio text right ════════ */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal animation="slide-in-left">
            <div className="relative">
              <img
                src={AIMEE_PHOTO}
                alt="Aimee Rickabus"
                className="w-full max-w-md mx-auto rounded-sm"
                loading="lazy"
              />
              {/* Book overlay — like Amy's NYT bestseller badge */}
              <div className="absolute -bottom-6 -right-4 md:right-8">
                <div className="relative">
                  <img src={BOOK_COVER} alt="The Manage Her™ Book" className="w-24 md:w-28 rounded-sm shadow-lg" />
                  <div className="absolute -top-3 -left-3 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-brand-pink flex items-center justify-center bg-background">
                    <span className="font-sans text-[8px] md:text-[9px] font-bold text-brand-pink uppercase tracking-wider text-center leading-tight">
                      NAWBO<br/>Award<br/>Winner
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-in-right" delay={150}>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">I Get It, I've Been There Too.</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-navy leading-snug mb-6">
              You want freedom.
              <br />You want consistent impact.
            </h2>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-5">
              I'm Aimee Rickabus, a mother of six who built a nine-figure company while managing everything women are told they should manage silently. Over 20 years of leadership, I've written a book, launched a top-ranked podcast, and been recognized by NAWBO as a Remarkable Woman.
            </p>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-5">
              But what really matters? I'm known for naming the invisible labor women carry and showing you how to turn that brilliance into visible leadership. No fluff, no hustle-for-hustle's-sake, no endless guilt.
            </p>
            <Link to="/about" className="font-sans text-sm font-bold text-brand-pink hover:text-brand-pink/80 uppercase tracking-[0.1em] transition-colors">
              Read My Full Story →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════ AS FEATURED IN — Amy style: real logo names in a row ════════ */}
      <section className="py-10 px-6 bg-brand-ice border-y border-border">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 text-center mb-6">
            As Featured In:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {["NAWBO", "Apple Podcasts", "Spotify", "Amazon Music", "YouTube"].map((name) => (
              <span key={name} className="font-serif text-xl md:text-2xl font-bold text-brand-navy/15 tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ LEAD MAGNET — Amy-style blue section with email capture ════════ */}
      <section className="bg-brand-pink py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <div className="flex justify-center">
              <div className="book-3d">
                <div className="book-3d-inner rounded-sm overflow-hidden">
                  <img src={BOOK_COVER} alt="The Manage Her™ Book" className="w-48 md:w-56" loading="lazy" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
              Free Chapter Preview
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground leading-tight mb-4">
              The 3 Leadership Shifts Every Woman Needs to Make Yesterday
            </h2>
            <p className="font-sans text-[15px] text-primary-foreground/80 leading-relaxed mb-6">
              Get the first chapter of The Manage Her™ book plus a framework for naming your invisible labor and turning it into visible power.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <Input placeholder="Your email address" className="h-12 px-5 font-sans text-sm flex-1 bg-background border-0" />
              <Button className="bg-brand-gold hover:bg-brand-gold/90 text-foreground h-12 px-7 font-sans text-sm font-bold uppercase tracking-[0.08em] whitespace-nowrap rounded-sm">
                I Want It!
              </Button>
            </div>
            <p className="font-sans text-[11px] text-primary-foreground/50">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════ PODCAST SECTION — Amy style: title + description left, platform buttons right ════════ */}
      <section id="listen" className="py-20 md:py-28 px-6 bg-brand-ice">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-pink mb-2">
              The Manage Her™ Show
            </h2>
            <p className="font-serif text-xl md:text-2xl text-brand-navy/40 italic mb-6">
              Getting real about what it takes.
            </p>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-4">
              The Manage Her™ Show is a weekly conversation about <strong className="text-brand-navy">women's invisible leadership</strong> — the work that happens behind the scenes, the brilliance that goes unnamed, and the revolution that starts when we finally own it.
            </p>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-8">
              All to help you <strong className="text-brand-navy">go from managing everything silently to leading everything boldly</strong> — with more clarity, more confidence, and zero guilt.
            </p>

            {/* Stats — Amy style */}
            <div className="flex gap-10 mb-8">
              <div>
                <p className="font-serif text-4xl md:text-5xl font-bold text-brand-gold">
                  <AnimatedCounter target={30} suffix="+" />
                </p>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Episodes</p>
              </div>
              <div>
                <p className="font-serif text-4xl md:text-5xl font-bold text-brand-gold flex items-center gap-1">
                  5.0 <span className="text-brand-gold text-2xl">★</span>
                </p>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Apple Rating</p>
              </div>
            </div>

            <Link
              to="/podcast"
              className="font-sans text-sm font-bold text-brand-pink hover:text-brand-pink/80 uppercase tracking-[0.1em] transition-colors"
            >
              Browse All Episodes →
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col gap-4">
              {[
                { label: "Watch on YouTube", href: "https://www.youtube.com/@TheManageHer", icon: "▶" },
                { label: "Listen on Apple", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475", icon: "🎧" },
                { label: "Listen on Spotify", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ", icon: "🎵" },
              ].map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-background rounded-sm px-6 py-4 font-sans text-sm font-bold uppercase tracking-[0.1em] text-brand-navy hover:shadow-md transition-all border border-border hover:border-brand-pink/20 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{p.icon}</span>
                  {p.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════ TESTIMONIALS — Amy style: centered, one at a time, prev/next ════════ */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="mb-10">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full bg-brand-blush mx-auto mb-6 flex items-center justify-center">
                <span className="font-serif text-2xl text-brand-pink font-bold">
                  {testimonials[currentTestimonial].author[0]}
                </span>
              </div>

              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {testimonials[currentTestimonial].author}
              </p>

              <blockquote className="font-serif text-2xl md:text-3xl text-brand-navy leading-relaxed italic transition-all duration-500">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="font-sans text-sm font-bold text-brand-navy/40 hover:text-brand-pink transition-colors uppercase tracking-wide"
              >
                ← Prev
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="font-sans text-sm font-bold text-brand-navy/40 hover:text-brand-pink transition-colors uppercase tracking-wide"
              >
                Next →
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
