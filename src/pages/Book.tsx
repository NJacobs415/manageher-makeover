import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Magnetic from "@/components/animations/Magnetic";
import { Star, ArrowRight, BookOpen, Headphones, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import bookCover from "@/assets/book-cover.png";
import SEO from "@/components/SEO";

const BOOK_COVER_CDN =
  "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a714ae8e39698a8fbfa2bb.png";
const AIMEE_PHOTO =
  "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df73543f31f1.jpg";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

const BuyButtons = () => (
  <div className="flex flex-wrap gap-3 items-center">
    <Magnetic strength={0.2}>
      <a href="https://a.co/d/by5X0fV" target="_blank" rel="noopener noreferrer"
        className="btn-glow inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 transition-all"
        style={{ background: "linear-gradient(135deg, #c9a96e, #dfc08a)", color: "#0a0a0a", borderRadius: "50px", boxShadow: "0 4px 24px rgba(201,169,110,0.3)" }}>
        Order on Amazon
      </a>
    </Magnetic>
    <div className="flex items-center gap-4 ml-2">
      {[{ icon: BookOpen, label: "Paperback" }, { icon: Smartphone, label: "Kindle" }, { icon: Headphones, label: "Audible" }].map(({ icon: Icon, label }) => (
        <span key={label} className="flex items-center gap-1.5">
          <Icon size={14} style={{ color: "#c9a96e" }} />
          <span className="font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</span>
        </span>
      ))}
    </div>
  </div>
);

const Book = () => {
  const countdown = useCountdown("2026-05-01T00:00:00");

  return (
    <div className="overflow-x-hidden page-enter">
      <SEO
        title="The Manage Her® Book"
        description="Unveiling Invisible Labor & Sparking a Leadership Revolution by Aimee Rickabus."
        url="https://www.themanageher.com/book"
        type="book"
        image="https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a714ae8e39698a8fbfa2bb.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Book",
          name: "The Manage Her: Unveiling Invisible Labor & Sparking a Leadership Revolution",
          author: { "@type": "Person", name: "Aimee Rickabus" },
          url: "https://a.co/d/by5X0fV",
          image: "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a714ae8e39698a8fbfa2bb.png",
        }}
      />
      <Navbar />

      {/* ═══════ HERO — Real emotional hook from the book ═══════ */}
      <section className="relative min-h-screen min-h-[100svh] flex items-center overflow-hidden px-6" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(235,24,135,0.04) 0%, transparent 50%)" }} />

        <div className="max-w-[1300px] mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center py-16 lg:py-0">
            <div className="lg:col-span-7">
              <TextReveal>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-8 flex items-center gap-3" style={{ color: "#c9a96e" }}>
                  <span style={{ width: "30px", height: "1px", background: "#c9a96e", display: "inline-block" }} />
                  The Bestselling Book
                </p>
              </TextReveal>
              <TextReveal delay={200}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.15] mb-6">
                  It's only in your <em className="text-brand-pink italic">failure</em> that anyone notices.
                </h1>
              </TextReveal>
              <FadeIn delay={500} y={20}>
                <p className="text-lg md:text-xl mb-4 max-w-xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#999", lineHeight: "1.8" }}>
                  No toilet paper? Crisis. No milk? Catastrophe. But when everything runs perfectly — the schedules, the meals, the emotions, the logistics — nobody says a word. Because you made it look effortless.
                </p>
              </FadeIn>
              <FadeIn delay={700} y={20}>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  <strong className="text-foreground">This book names it.</strong>{" "}
                  The invisible labor. The standard operating procedures you've been writing for your household since day one. The capital management, the people management, the crisis management — all the same skills Fortune 500 CEOs get paid millions for. Except when you do it at home, people's lives depend on it. And no one calls it leadership. Until now.
                </p>
              </FadeIn>
              <FadeIn delay={900} y={20}><BuyButtons /></FadeIn>
              <FadeIn delay={1100} y={20}>
                <div className="flex items-center gap-6 mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} style={{ color: "#c9a96e", fill: "#c9a96e" }} />)}</div>
                  <p className="font-sans text-[12px] text-muted-foreground">5-Star Rated on Amazon · Paperback, Kindle & Audible</p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn delay={600} scale={0.9}>
                <div className="relative flex justify-center">
                  <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse, rgba(201,169,110,0.12) 0%, transparent 70%)", transform: "scale(1.8)", filter: "blur(60px)" }} />
                  <div className="absolute -top-5 -right-2 w-20 h-20 flex items-center justify-center text-center z-20" style={{ background: "linear-gradient(135deg, #c9a96e, #dfc08a)", borderRadius: "50%", boxShadow: "0 10px 40px rgba(201,169,110,0.4)" }}>
                    <span className="font-sans text-[9px] font-bold uppercase leading-tight" style={{ color: "#0a0a0a" }}>5 ★<br />Amazon</span>
                  </div>
                  <div className="book-3d">
                    <div className="book-3d-inner overflow-hidden" style={{ borderRadius: "4px 14px 14px 4px" }}>
                      <img src={bookCover} alt="The Manage Her® Book" className="w-72 md:w-80 lg:w-96" loading="eager" onError={(e) => { (e.target as HTMLImageElement).src = BOOK_COVER_CDN; }} />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ THE QUESTION — From Chapter 1 ═══════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#f5f0eb" }}>
        <FadeIn>
          <blockquote className="max-w-[900px] mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.5] italic" style={{ color: "#1a1a1a" }}>
              "When was the last time somebody asked you what <span className="text-brand-pink not-italic font-bold">you</span> wanted? I got to a point where I didn't even know how I liked my eggs cooked. As women, sometimes it's so hard not to get lost in pleasing other people. We lose ourselves. Our authentic desires. Our authentic gifts."
            </p>
            <footer className="font-sans text-[10px] uppercase tracking-[0.3em] mt-8" style={{ color: "#bbb" }}>— From The Manage Her®</footer>
          </blockquote>
        </FadeIn>
      </section>

      {/* ═══════ THIS BOOK IS FOR YOU IF... ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(235,24,135,0.08)" }}>
        <div className="max-w-[900px] mx-auto">
          <TextReveal>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-foreground text-center leading-tight mb-6">
              This book is for <em className="text-brand-pink italic">you</em> if...
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p className="text-center mb-16" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#888", fontSize: "1.15rem" }}>
              If even one of these hits home, this book was written with you in mind.
            </p>
          </FadeIn>
          <div className="space-y-6">
            {[
              "You've created SOPs for your household that would rival any Fortune 500 — and nobody's ever noticed.",
              "You manage the budget, the schedules, the emotions, and the outsourced help — from babysitters to the pool guy — and you do it so well it's invisible.",
              "You've lost yourself in pleasing everyone else. You don't even remember your own authentic desires.",
              "Your 'Nice Girl Syndrome' has you putting everyone's boundaries above your own — and the resentment is building.",
              "You know that what's happening to you is happening for you — but you need someone to help you see it.",
              "You're ready to stop managing yourself down and start leading like you mean it.",
            ].map((line, i) => (
              <FadeIn key={i} delay={i * 80} y={15}>
                <div className="flex items-start gap-5 p-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#111", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(235,24,135,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; }}>
                  <span className="text-brand-pink font-bold text-xl mt-0.5 shrink-0">→</span>
                  <p className="font-sans text-[15px] text-foreground/80 leading-relaxed">{line}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={600} y={20}>
            <p className="font-serif text-2xl md:text-3xl text-foreground text-center mt-14 italic">
              If you're nodding right now — <em className="text-brand-pink not-italic font-bold">start reading</em>.
            </p>
            <div className="flex justify-center mt-8"><BuyButtons /></div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ WHAT'S INSIDE — Real book content ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="max-w-[1000px] mx-auto">
          <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] text-center mb-4" style={{ color: "#c9a96e" }}>Inside The Book</p></TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-16">What you'll <em className="text-brand-pink italic">discover</em></h2>
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { num: "01", title: "The Invisible Load", desc: "Why the work women do at home — inventory management, people management, capital management, crisis management — is the exact same work that runs a company. Except when you do it, people's lives depend on it." },
              { num: "02", title: "The Secret History of Women", desc: "You can't know where you're going until you know where you've been. A powerful look at how 5,000 years of suppressed history shaped the systems women navigate today — and why the tide is turning." },
              { num: "03", title: "Motherhood as Management Training", desc: "Strategic planning, emotional intelligence, adaptability, delegation — ChatGPT confirmed what mothers already know: the top 10 qualities of great managers and great mothers are virtually identical." },
              { num: "04", title: "Boundaries & Nice Girl Syndrome", desc: "That little voice telling you 'nice girls don't have boundaries' is an old operating system. When you stop putting everyone else's feelings ahead of your own, resentment stops and real leadership begins." },
              { num: "05", title: "Toxic Femininity & Masculinity", desc: "The old programs that kept powerful women in bondage to mundane tasks, and the societal pressure that made men believe their only value was making money. Both need an upgrade." },
              { num: "06", title: "Finding Your Authentic Self", desc: "What if you loved yourself the way you love your children? What if you served yourself in the highest way? In Sanskrit it's called ahimsa — non-violence against yourself. This chapter is your permission slip." },
            ].map((item, i) => (
              <FadeIn key={item.num} delay={i * 100} y={30}>
                <div className="flex gap-5 p-7 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#0a0a0a", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}>
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center font-serif font-bold"
                    style={{ background: "linear-gradient(135deg, #c9a96e, #dfc08a)", borderRadius: "12px", color: "#0a0a0a", fontSize: "0.85rem" }}>{item.num}</div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="font-sans text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={700} y={20}>
            <p className="font-serif text-xl md:text-2xl text-foreground text-center mt-12 italic">
              This is not a self-help book. This is a <em className="text-brand-pink not-italic font-bold">leadership awakening</em>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ THE THESIS — Big statement ═══════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#faf8f5" }}>
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-serif text-5xl md:text-6xl font-bold text-brand-pink mb-3">10</p>
                <p className="font-sans text-[12px] uppercase tracking-[0.15em]" style={{ color: "#888" }}>Top qualities of great managers</p>
              </div>
              <div>
                <p className="font-serif text-5xl md:text-6xl font-bold mb-3" style={{ color: "#c9a96e" }}>10</p>
                <p className="font-sans text-[12px] uppercase tracking-[0.15em]" style={{ color: "#888" }}>Top qualities of great mothers</p>
              </div>
              <div>
                <p className="font-serif text-5xl md:text-6xl font-bold mb-3" style={{ color: "#1a1a1a" }}>Identical.</p>
                <p className="font-sans text-[12px] uppercase tracking-[0.15em]" style={{ color: "#888" }}>The research confirms what you already know</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={300} y={20}>
            <p className="font-sans text-[15px] text-center leading-[1.9] max-w-[700px] mx-auto mt-12" style={{ color: "#666" }}>
              Strategic thinking. Emotional intelligence. Communication. Adaptability. Problem-solving. Delegation. Accountability. The skills that make you extraordinary at home are the same skills CEOs use to build empires. The only difference? No one gave you the title. <strong style={{ color: "#1a1a1a" }}>This book does.</strong>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ MEET THE AUTHOR ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(235,24,135,0.08)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <FadeIn x={-40} y={0} duration={1200}>
                <div className="editorial-img overflow-hidden" style={{ borderRadius: "20px" }}>
                  <img src={AIMEE_PHOTO} alt="Aimee Rickabus" className="w-full aspect-[4/5] object-cover" loading="lazy" />
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "#c9a96e" }}>Meet The Author</p></TextReveal>
              <TextReveal delay={100}>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-[1.15] mb-6">
                  I'm the woman who closes the multi-million-dollar deal — then heads straight to the ballfield to coach confidence from the sidelines.
                </h2>
              </TextReveal>
              <FadeIn delay={300} y={20}>
                <p className="font-sans text-[15px] text-muted-foreground leading-[1.9] mb-5">
                  I'm Aimee Rickabus. I've been a serial entrepreneur since I was 22, when I bought my first property and started flipping 1920s houses. I've run a film production company, a prenatal nutrition brand, and now a nine-figure technology company serving PepsiCo, Ford, and the Fortune 500.
                </p>
              </FadeIn>
              <FadeIn delay={400} y={20}>
                <p className="font-sans text-[15px] text-muted-foreground leading-[1.9] mb-5">
                  I've given birth to five of my six children at home. I converted my bonus room into a school during COVID and ran a homeschool pod for 10 kids. I sold my car to fund my husband's company because I believed in his talent. I walked into PepsiCo's headquarters five months pregnant and won the contract.
                </p>
              </FadeIn>
              <FadeIn delay={500} y={20}>
                <p className="font-sans text-[15px] text-muted-foreground leading-[1.9] mb-8">
                  I wrote this book because I realized the skills I used to run my home — planning, coaching, strategy, crisis management — weren't optional. They were assets. And <strong className="text-foreground">I got tired of watching brilliant women shrink.</strong>
                </p>
              </FadeIn>
              <FadeIn delay={600} y={20}>
                <Link to="/about" className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:gap-3 transition-all">
                  Read My Full Story <ArrowRight size={14} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ REVIEWS ═══════ */}
      <section className="py-24 md:py-36 px-6 relative overflow-hidden" style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="absolute top-8 left-8 pointer-events-none select-none">
          <span className="font-serif text-[18rem] leading-none" style={{ color: "rgba(201,169,110,0.03)" }}>"</span>
        </div>
        <div className="max-w-[1100px] mx-auto relative z-10">
          <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink text-center mb-4">Reader Reviews</p></TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-16">What women are <em className="text-brand-pink italic">saying</em></h2>
          </TextReveal>

          <FadeIn delay={200} y={30}>
            <div className="p-10 md:p-14 mb-8 text-center" style={{ background: "#0a0a0a", borderRadius: "24px", border: "1px solid rgba(201,169,110,0.1)" }}>
              <div className="flex justify-center gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} size={18} style={{ color: "#c9a96e", fill: "#c9a96e" }} />)}</div>
              <p className="font-serif text-xl md:text-2xl lg:text-3xl italic text-foreground leading-[1.4] mb-6 max-w-3xl mx-auto">
                "She put words to something I've felt for years but couldn't name. I pulled over on my commute because I was crying. Every woman who has ever felt invisible needs to read this book."
              </p>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">— 5-Star Amazon Review</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { text: "Finally someone who validates what we're already doing and shows us how to own it — without telling us to just 'lean in.'", author: "Verified Reader" },
              { text: "The authority of a CEO and the heart of a mom who gets it. Every working mother needs this on her nightstand.", author: "Verified Reader" },
              { text: "I've never highlighted so many passages in a book. This isn't motivation fluff — it's a mirror and a map.", author: "Verified Reader" },
            ].map((review, i) => (
              <FadeIn key={i} delay={300 + i * 100} y={30}>
                <div className="p-7 h-full flex flex-col" style={{ background: "#0a0a0a", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={12} style={{ color: "#c9a96e", fill: "#c9a96e" }} />)}</div>
                  <p className="font-serif text-[15px] italic text-foreground/70 leading-relaxed flex-1 mb-5">"{review.text}"</p>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">— {review.author}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={700} y={20}>
            <div className="flex justify-center mt-12"><BuyButtons /></div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ FREE CHAPTER ═══════ */}
      <section id="free-chapter" className="py-24 md:py-32 px-6" style={{ background: "#faf8f5" }}>
        <div className="max-w-[700px] mx-auto text-center">
          <TextReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "#1a1a1a" }}>
              Read Chapter 1 <em className="text-brand-pink italic">free</em>.
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p className="font-sans text-[15px] mb-4" style={{ color: "#888" }}>
              The chapter that names everything you've been feeling. Enter your email and we'll send it straight to your inbox.
            </p>
          </FadeIn>
          <FadeIn delay={300} y={20}>
            <p className="font-serif text-lg italic mb-8" style={{ color: "#666" }}>"By page 3, I knew this book was written for me."</p>
          </FadeIn>
          <FadeIn delay={400} y={20}>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-1 px-6 font-sans text-sm"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "50px", color: "#1a1a1a", outline: "none", height: "52px" }} />
              <button className="btn-glow px-8 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] bg-brand-pink text-primary-foreground hover:bg-brand-pink/90 transition-colors whitespace-nowrap"
                style={{ borderRadius: "50px", height: "52px" }}>Send Chapter 1 →</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ BOOK #2 COUNTDOWN ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4">Coming May 1, 2026</p></TextReveal>
              <TextReveal delay={100}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                  Book Two:<br />Unlocking Human <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Potential</em>
                </h2>
              </TextReveal>
              <FadeIn delay={200} y={20}>
                <p className="text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#888" }}>
                  More Than Success. More Than Happiness. More <em style={{ color: "#c9a96e" }}>You</em>.
                </p>
              </FadeIn>
              <FadeIn delay={300} y={20}>
                <p className="font-sans text-[15px] text-muted-foreground leading-[1.9] mb-8">
                  If The Manage Her® helps women claim leadership in the everyday, Book #2 explores how to live your fullest potential in every dimension. Rooted in Aimee's personal journey — from yoga and breathwork to entrepreneurship and motherhood — this is a map back to your highest self.
                </p>
              </FadeIn>
              <FadeIn delay={400} y={20}>
                <div className="space-y-2 mb-8">
                  {["Embodied intelligence", "Purpose you can feel", "Success that doesn't sacrifice joy", "The courage to live fully awake", "Human potential as a garden — not a ladder"].map((t) => (
                    <div key={t} className="flex items-center gap-3">
                      <span style={{ color: "#c9a96e" }}>→</span>
                      <span className="font-sans text-[14px] text-muted-foreground">{t}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={500} y={20}>
                <Magnetic strength={0.2}>
                  <a href="#free-chapter" className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 transition-colors" style={{ borderRadius: "50px" }}>
                    Join the Waitlist →
                  </a>
                </Magnetic>
              </FadeIn>
            </div>
            <FadeIn delay={300} y={30}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[{ val: countdown.days, label: "Days" }, { val: countdown.hours, label: "Hours" }, { val: countdown.mins, label: "Minutes" }, { val: countdown.secs, label: "Seconds" }].map((u) => (
                  <div key={u.label} className="text-center p-4 sm:p-6" style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(201,169,110,0.1)" }}>
                    <div className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1" style={{ color: "#c9a96e" }}>{u.val}</div>
                    <div className="font-sans text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{u.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ EXPLORE MORE ═══════ */}
      <section className="py-20 px-6" style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1200px] mx-auto">
          <TextReveal>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Go deeper with The Manage Her<span style={{ fontSize: ".45em", verticalAlign: "super", fontStyle: "normal" }}>®</span>
            </h2>
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "The Podcast", desc: "Weekly conversations about leadership, money, motherhood, and the invisible work that runs the world.", link: "/podcast", cta: "Start Listening" },
              { title: "About Aimee", desc: "Serial entrepreneur since 22. Mother of six. The full story behind the woman building this movement.", link: "/about", cta: "Read Her Story" },
              { title: "Press & Speaking", desc: "Book Aimee for your next keynote, conference, or media feature.", link: "/press", cta: "Book Aimee" },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 100} y={20}>
                <Link to={card.link} className="block p-8 h-full group transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#0a0a0a", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(235,24,135,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-brand-pink transition-colors">{card.title}</h3>
                  <p className="font-sans text-[13px] text-muted-foreground leading-relaxed mb-5">{card.desc}</p>
                  <span className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink group-hover:gap-3 transition-all">
                    {card.cta} <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;
