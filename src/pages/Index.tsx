import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/animations/CursorFollower";
import PageLoader from "@/components/animations/PageLoader";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Parallax from "@/components/animations/Parallax";
import Magnetic from "@/components/animations/Magnetic";
import HorizontalScroll from "@/components/animations/HorizontalScroll";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Play, Star, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroAccent from "@/assets/hero-accent.png";
import editorialAccent from "@/assets/editorial-accent.png";

const AIMEE_PHOTO = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df73543f31f1.jpg";
const BOOK_COVER = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df1d0b3f31f3.jpg";
const EP_PHOTO_1 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f913b8428032bfd3dc.jpg";
const EP_PHOTO_2 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f995735c6c97483230.jpg";
const EP_PHOTO_3 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df450a3f31f2.png";

const testimonials = [
  { text: "She put words to something I've felt for years but couldn't name. I pulled over on my commute because I was crying.", author: "Sarah M.", source: "Apple Podcasts" },
  { text: "Finally someone who validates what we're already doing and shows us how to own it — without telling us to just 'lean in.'", author: "Jessica R.", source: "Spotify" },
  { text: "The authority of a CEO and the heart of a mom who gets it. Every working mother needs this.", author: "Lauren T.", source: "Apple Podcasts" },
];

const Index = () => {
  const [currentTest, setCurrentTest] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrentTest((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-x-hidden page-enter">
      <PageLoader />
      <CursorFollower />
      <Navbar />

      {/* ═══════════════════════════════════════════════
          HERO — Cinematic editorial: full viewport, dramatic typography, parallax layers
          ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-cream">
        {/* Floating accent graphic */}
        <Parallax speed={0.15} className="absolute -top-20 -right-32 w-[500px] md:w-[700px] opacity-30 pointer-events-none select-none">
          <img src={heroAccent} alt="" width={1024} height={1024} className="w-full" aria-hidden="true" />
        </Parallax>

        {/* Background oversized text */}
        <div className="absolute inset-0 flex items-end justify-start pointer-events-none select-none overflow-hidden">
          <span className="editorial-number text-[25vw] lg:text-[18vw] -mb-[3vw] ml-[-1vw]">
            Her
          </span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-20 lg:py-0">
            {/* Text — 7 cols */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <TextReveal delay={400}>
                <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-pink mb-6">
                  The Podcast Redefining Leadership
                </p>
              </TextReveal>

              <TextReveal delay={600}>
                <h1 className="font-serif text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[0.95] text-foreground mb-8">
                  You were<br />
                  never <em className="text-brand-pink italic">just</em><br />
                  a mom.
                </h1>
              </TextReveal>

              <FadeIn delay={900} y={30}>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed max-w-md mb-10">
                  The podcast for women running households like a Fortune 500 — who are finally ready to own the brilliance they've been giving away for free.
                </p>
              </FadeIn>

              <FadeIn delay={1100} y={20}>
                <div className="flex flex-wrap gap-4 mb-12">
                  <Magnetic strength={0.2}>
                    <a
                      href="#listen"
                      className="btn-glow inline-flex items-center gap-2.5 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 transition-colors"
                    >
                      <Play size={14} className="fill-current" /> Listen Now
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <Link
                      to="/book"
                      className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all"
                    >
                      Get the Book
                    </Link>
                  </Magnetic>
                </div>
              </FadeIn>

              {/* Stats row */}
              <FadeIn delay={1300} y={20}>
                <div className="flex gap-10">
                  {[
                    { val: 9, suffix: "-Figure", label: "Company" },
                    { val: 6, suffix: " Kids", label: "Raised" },
                    { val: 30, suffix: "+", label: "Episodes" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-serif text-2xl md:text-3xl font-bold text-brand-pink">
                        <AnimatedCounter target={s.val} suffix={s.suffix} />
                      </p>
                      <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Photo — 5 cols, editorial crop */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative">
              <FadeIn delay={700} scale={0.95}>
                <div className="editorial-img relative">
                  <img
                    src={AIMEE_PHOTO}
                    alt="Aimee Rickabus — Host of The Manage Her Podcast"
                    className="w-full max-w-[400px] lg:max-w-none mx-auto object-cover aspect-[3/4]"
                    loading="eager"
                  />
                  {/* Award badge */}
                  <div className="absolute -bottom-4 -left-4 bg-background shadow-xl px-5 py-3 flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-pink">NAWBO Award</p>
                      <p className="font-sans text-[9px] text-muted-foreground">Remarkable Woman</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Floating accent */}
              <Parallax speed={-0.1} className="absolute -top-12 -right-16 w-32 opacity-20 pointer-events-none">
                <img src={editorialAccent} alt="" width={800} height={800} loading="lazy" className="w-full" aria-hidden="true" />
              </Parallax>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <FadeIn delay={1800} y={-10}>
            <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground/40 hover:text-brand-pink transition-colors">
              <span className="font-sans text-[9px] uppercase tracking-[0.3em]">Scroll</span>
              <ArrowDown size={14} className="animate-bounce" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ EDITORIAL MARQUEE ═══════ */}
      <section className="bg-foreground py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center">
              {["Women's Empowerment", "Financial Literacy", "Entrepreneurship", "Invisible Labor", "Leadership Revolution", "Boundaries", "Self-Reclamation"].map((topic) => (
                <span key={`${setIdx}-${topic}`} className="font-serif text-sm md:text-base italic text-background/20 mx-6 md:mx-10">
                  {topic}
                  <span className="inline-block mx-6 md:mx-10 text-brand-pink/40 not-italic">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ MEET AIMEE — Asymmetric editorial layout ═══════ */}
      <section id="about" className="py-24 md:py-36 px-6 bg-background relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
            {/* Large photo — offset */}
            <div className="lg:col-span-5 lg:col-start-1 relative">
              <FadeIn x={-60} y={0} duration={1200}>
                <div className="editorial-img">
                  <img
                    src={AIMEE_PHOTO}
                    alt="Aimee Rickabus"
                    className="w-full aspect-[4/5] object-cover"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
              {/* Oversized number */}
              <span className="editorial-number text-[12rem] absolute -top-16 -left-8 select-none pointer-events-none z-0">
                01
              </span>
            </div>

            {/* Text — overlapping to the right */}
            <div className="lg:col-span-6 lg:col-start-7 lg:-ml-12 relative z-10">
              <div className="bg-background p-8 md:p-12 lg:p-16">
                <TextReveal>
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-4">Meet Your Host</p>
                </TextReveal>
                <TextReveal delay={100}>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] mb-6">
                    Hey, I'm<br /><em className="text-brand-pink">Aimee.</em>
                  </h2>
                </TextReveal>
                <FadeIn delay={300} y={20}>
                  <p className="font-serif text-xl text-foreground/70 italic leading-snug mb-6">
                    I built a nine-figure company while raising six kids.
                  </p>
                </FadeIn>
                <FadeIn delay={400} y={20}>
                  <p className="font-sans text-[14px] text-muted-foreground leading-relaxed mb-4">
                    CEO. Author. Podcast host. Mother of six. Two decades of leadership — not because someone handed me a title, but because women are already leading everywhere. We're just not getting credit for it.
                  </p>
                </FadeIn>
                <FadeIn delay={500} y={20}>
                  <p className="font-sans text-[14px] text-muted-foreground leading-relaxed mb-8">
                    The Manage Her™ exists because I got tired of watching brilliant women shrink.
                  </p>
                </FadeIn>
                <FadeIn delay={600} y={20}>
                  <Link to="/about" className="link-reveal font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink">
                    Read My Full Story
                  </Link>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED IN ═══════ */}
      <section className="py-12 px-6 border-y border-border">
        <FadeIn>
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-center text-muted-foreground/40 mb-6">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 max-w-4xl mx-auto">
            {["NAWBO", "Apple Podcasts", "Spotify", "Amazon Music", "YouTube"].map((name) => (
              <span key={name} className="font-serif text-lg md:text-xl italic text-foreground/10">
                {name}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══════ PILLARS — Editorial numbered cards ═══════ */}
      <section className="py-24 md:py-36 px-6 bg-brand-cream relative">
        <div className="max-w-[1400px] mx-auto">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">What We Talk About</p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center leading-tight mb-20">
              Three conversations that<br />change <em className="text-brand-pink italic">everything.</em>
            </h2>
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              { num: "01", title: "Women's Empowerment", desc: "Invisible labor, identity beyond motherhood, boundaries, self-reclamation, and the leadership revolution happening inside your own home." },
              { num: "02", title: "Financial Literacy", desc: "Wealth building, pay equity, investing, financial independence, and why every woman deserves to understand the money she's helping create." },
              { num: "03", title: "Entrepreneurship", desc: "Building businesses on your own terms, scaling without sacrificing your sanity, and proving ambition and motherhood aren't mutually exclusive." },
            ].map((p, i) => (
              <FadeIn key={p.num} delay={i * 150} y={40}>
                <div className="bg-background p-10 md:p-12 group hover:bg-foreground transition-colors duration-500 h-full">
                  <span className="font-serif text-6xl italic text-brand-pink/10 group-hover:text-brand-pink/20 transition-colors block mb-8">
                    {p.num}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-background transition-colors mb-4">{p.title}</h3>
                  <p className="font-sans text-[14px] text-muted-foreground group-hover:text-background/60 transition-colors leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ EPISODES — Horizontal scroll ═══════ */}
      <section id="listen">
        <div className="py-16 px-6 bg-background">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between mb-4">
            <div>
              <TextReveal>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-3">Latest Episodes</p>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Start <em className="text-brand-pink italic">listening.</em>
                </h2>
              </TextReveal>
            </div>
            <FadeIn delay={300} y={10}>
              <Link to="/podcast" className="link-reveal font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink mt-4 md:mt-0">
                All Episodes
              </Link>
            </FadeIn>
          </div>
        </div>

        <HorizontalScroll>
          {[
            { img: EP_PHOTO_1, ep: "01", title: "The Invisible Load: Why Women Are Leading Without the Title", tag: "Featured" },
            { img: EP_PHOTO_2, ep: "05", title: "Money, Power & the Wage Gap Nobody Talks About" },
            { img: EP_PHOTO_3, ep: "10", title: "Scaling a Business While Raising Humans" },
            { img: AIMEE_PHOTO, ep: "15", title: "Setting Boundaries Without the Guilt Trip" },
            { img: EP_PHOTO_1, ep: "20", title: "The Leadership Revolution Starts at Home" },
          ].map((ep) => (
            <a
              key={ep.ep}
              href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
              target="_blank"
              rel="noopener noreferrer"
              className="group block shrink-0 w-[320px] md:w-[380px]"
            >
              <div className="editorial-img relative aspect-[3/4] overflow-hidden mb-4">
                <img src={ep.img} alt={ep.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 bg-brand-pink text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                    <Play size={20} className="fill-current ml-0.5" />
                  </div>
                </div>
                {ep.tag && (
                  <span className="absolute top-4 left-4 bg-brand-pink text-primary-foreground font-sans text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5">
                    {ep.tag}
                  </span>
                )}
              </div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Episode {ep.ep}</p>
              <h3 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-brand-pink transition-colors">
                {ep.title}
              </h3>
            </a>
          ))}
        </HorizontalScroll>

        {/* Platform links */}
        <div className="py-12 px-6 bg-background">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" },
                { label: "Spotify", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ" },
                { label: "Amazon Music", href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her" },
                { label: "YouTube", href: "https://www.youtube.com/@TheManageHer" },
              ].map((p) => (
                <Magnetic key={p.label} strength={0.15}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/30 hover:text-brand-pink transition-colors px-5 py-2.5 border border-border hover:border-brand-pink/20"
                  >
                    {p.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ PULL QUOTE — Full-width editorial ═══════ */}
      <section className="py-24 md:py-32 px-6 bg-brand-cream relative overflow-hidden">
        <img src={editorialAccent} alt="" className="absolute top-0 right-0 w-64 opacity-10 pointer-events-none" width={800} height={800} loading="lazy" aria-hidden="true" />
        <FadeIn>
          <blockquote className="max-w-4xl mx-auto text-center relative z-10">
            <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground leading-[1.2] italic">
              "The most <span className="text-brand-pink not-italic font-bold">revolutionary</span> thing a woman can do is stop asking for permission to lead the life she's already building."
            </p>
            <footer className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-8">
              — Aimee Rickabus
            </footer>
          </blockquote>
        </FadeIn>
      </section>

      {/* ═══════ BOOK — Editorial split with 3D ═══════ */}
      <section className="py-24 md:py-36 px-6 bg-background relative overflow-hidden">
        {/* Parallax decorative elements */}
        <Parallax speed={0.12} className="absolute -top-32 -left-20 w-[400px] opacity-[0.04] pointer-events-none select-none">
          <img src={heroAccent} alt="" width={1024} height={1024} className="w-full" aria-hidden="true" />
        </Parallax>
        <Parallax speed={-0.08} className="absolute -bottom-24 -right-16 w-[300px] opacity-[0.06] pointer-events-none select-none rotate-180">
          <img src={editorialAccent} alt="" width={800} height={800} className="w-full" aria-hidden="true" />
        </Parallax>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative">
              <span className="editorial-number text-[12rem] absolute -top-16 -right-8 select-none pointer-events-none z-0">
                02
              </span>
              <FadeIn scale={0.9}>
                <div className="flex justify-center relative z-10">
                  <div className="book-3d">
                    <div className="book-3d-inner overflow-hidden">
                      <img src={BOOK_COVER} alt="The Manage Her™ Book" className="w-52 md:w-64" loading="lazy" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <TextReveal>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-4">The Book</p>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                  Unveiling invisible labor & sparking a <em className="text-brand-pink italic">leadership revolution.</em>
                </h2>
              </TextReveal>
              <FadeIn delay={300} y={20}>
                <p className="font-sans text-[14px] text-muted-foreground leading-relaxed mb-8">
                  The book that names what millions of women feel but can't articulate. From invisible labor to identity reclamation, this is the blueprint for women who are done shrinking and ready to lead.
                </p>
              </FadeIn>
              <FadeIn delay={400} y={20}>
                <div className="flex flex-wrap gap-4">
                  <Magnetic strength={0.2}>
                    <a
                      href="https://a.co/d/by5X0fV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow inline-flex items-center bg-foreground text-background font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-foreground/90 transition-colors"
                    >
                      Order on Amazon
                    </a>
                  </Magnetic>
                  <Link
                    to="/book"
                    className="link-reveal font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground py-4"
                  >
                    Learn More
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS — Centered editorial ═══════ */}
      <section className="py-24 md:py-32 px-6 bg-foreground relative overflow-hidden">
        {/* Parallax floating accents */}
        <Parallax speed={0.15} className="absolute -top-20 -left-24 w-[350px] opacity-[0.03] pointer-events-none select-none">
          <img src={editorialAccent} alt="" width={800} height={800} className="w-full" aria-hidden="true" />
        </Parallax>
        <Parallax speed={-0.1} className="absolute -bottom-16 -right-20 w-[280px] opacity-[0.04] pointer-events-none select-none rotate-45">
          <img src={heroAccent} alt="" width={1024} height={1024} className="w-full" aria-hidden="true" />
        </Parallax>
        {/* Large parallax quotation mark */}
        <Parallax speed={0.2} className="absolute top-12 left-8 pointer-events-none select-none">
          <span className="font-serif text-[20rem] leading-none text-background/[0.03]">"</span>
        </Parallax>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-background/30 mb-10">What Listeners Say</p>

            <div className="relative min-h-[200px] flex items-center justify-center">
              {testimonials.map((t, i) => (
                <div
                  key={t.author}
                  className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
                  style={{
                    opacity: currentTest === i ? 1 : 0,
                    transform: currentTest === i ? "translateY(0)" : "translateY(20px)",
                    pointerEvents: currentTest === i ? "auto" : "none",
                  }}
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-background italic leading-relaxed mb-6">
                    "{t.text}"
                  </blockquote>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/40">
                    {t.author} — {t.source}
                  </p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTest(i)}
                  className={`w-2 h-2 transition-all duration-300 ${currentTest === i ? "bg-brand-pink w-6" : "bg-background/20"}`}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ IMPACT STATS ═══════ */}
      <section className="py-20 px-6 bg-background border-y border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: 9, suffix: "-Figure", label: "Company Led by Aimee" },
            { val: 6, suffix: " Kids", label: "Raised While Building" },
            { val: 30, suffix: "+", label: "Episodes & Counting" },
            { val: 5.0, suffix: " ★", label: "Star Apple Rating" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 100} y={30}>
              <p className="font-serif text-4xl md:text-5xl font-bold text-brand-pink">
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </p>
              <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-2">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
