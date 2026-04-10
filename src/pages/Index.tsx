import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Play, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Real content from themanageher.com ─── */

const AIMEE_PHOTO = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df73543f31f1.jpg";
const BOOK_COVER = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df1d0b3f31f3.jpg";
const EP_PHOTO_1 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f913b8428032bfd3dc.jpg";
const EP_PHOTO_2 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f995735c6c97483230.jpg";
const EP_PHOTO_3 = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df450a3f31f2.png";

const episodes = [
  { img: EP_PHOTO_1, ep: "01", duration: "42 min", title: "The Invisible Load: Why Women Are Leading Without the Title", desc: "You're managing a household, a career, everyone's emotions — it's time we named this brilliance for what it is: leadership.", tag: "Featured" },
  { img: EP_PHOTO_2, ep: "05", duration: "38 min", title: "Money, Power & the Wage Gap Nobody Talks About", desc: "Financial literacy isn't optional — it's freedom. Let's talk about wealth building, pay equity, and why every woman deserves a seat at the table." },
  { img: EP_PHOTO_3, ep: "10", duration: "45 min", title: "Scaling a Business While Raising Humans", desc: "Ambition and motherhood aren't mutually exclusive. Here's how to build something extraordinary without losing yourself." },
];

const testimonials = [
  { text: "I listened to the first episode on my commute and pulled over because I was crying. She put words to something I've felt for years but couldn't name.", author: "Sarah M.", source: "Apple Podcasts" },
  { text: "Finally a podcast that doesn't just tell women to 'lean in' — it actually validates what we're already doing and shows us how to own it.", author: "Jessica R.", source: "Spotify" },
  { text: "Aimee speaks with the authority of a CEO and the heart of a mom who gets it. Every working mother needs this in her earbuds.", author: "Lauren T.", source: "Apple Podcasts" },
];

const topicTicker = ["Women's Empowerment", "Financial Literacy", "Entrepreneurship", "Invisible Labor", "Leadership Revolution", "Boundaries", "Time Freedom", "Self-Reclamation"];

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — Jenna-style warm gradient bg + Amy-style side-by-side
          ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(180 30% 94%) 0%, hsl(260 40% 94%) 35%, hsl(340 50% 95%) 65%, hsl(38 55% 96%) 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center min-h-[85vh] py-16 lg:py-0">

            {/* Copy — left */}
            <div className="max-w-lg z-10 order-2 lg:order-1">
              <p className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-5 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
                The Podcast Redefining Women's Leadership
              </p>

              <h1 className="font-serif text-[2.6rem] md:text-[3.4rem] lg:text-[3.8rem] font-bold leading-[1.1] text-brand-navy mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                You Were Never Just a Mom.{" "}
                <em className="text-brand-pink not-italic" style={{ fontStyle: "italic" }}>You're a Leader.</em>
              </h1>

              <p className="font-serif text-lg md:text-xl text-brand-navy/60 italic leading-relaxed mb-7 opacity-0 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
                and it's time the world knew it.
              </p>

              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-md opacity-0 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
                The podcast for women running households like a Fortune 500 — who are finally ready to own the brilliance they've been giving away for free.
              </p>

              <div className="flex flex-wrap gap-3 mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "550ms" }}>
                <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-full px-7 h-12 font-sans text-sm font-medium shadow-lg shadow-brand-pink/20 gap-2" asChild>
                  <a href="#listen"><Play size={15} className="fill-current" /> Listen Now</a>
                </Button>
                <Button variant="outline" className="rounded-full px-7 h-12 font-sans text-sm font-medium border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5" asChild>
                  <Link to="/book">Get the Book →</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-7 opacity-0 animate-fade-in-up" style={{ animationDelay: "650ms" }}>
                {[
                  { val: 9, label: "Figure Company", prefix: "", suffix: "-Figure" },
                  { val: 6, label: "Kids Raised", prefix: "", suffix: " Kids" },
                  { val: 30, label: "Episodes", prefix: "", suffix: "+" },
                  { val: 5.0, label: "Apple Rating", prefix: "", suffix: "★" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-serif text-2xl md:text-3xl font-bold text-brand-navy">
                      <AnimatedCounter target={s.val} prefix={s.prefix} suffix={s.suffix} />
                    </p>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo — right (Amy/Jenna style) */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 opacity-0 animate-scale-in" style={{ animationDelay: "300ms" }}>
              {/* Oversized name behind photo — Jenna Kutcher technique */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <span className="font-serif text-[14vw] lg:text-[9vw] font-bold text-brand-pink/[0.07] italic leading-none whitespace-nowrap">
                  ManageHer
                </span>
              </div>
              <img
                src={AIMEE_PHOTO}
                alt="Aimee Rickabus — Host of The Manage Her Podcast"
                className="relative z-10 w-72 md:w-80 lg:w-[22rem] rounded-2xl shadow-2xl object-cover"
                loading="eager"
              />
              {/* NAWBO badge — floating card */}
              <div className="absolute -bottom-3 -left-3 md:left-auto md:-bottom-4 md:-right-4 z-20 bg-background rounded-xl shadow-lg px-4 py-3 flex items-center gap-2.5">
                <span className="text-xl">🏆</span>
                <div>
                  <p className="font-sans text-xs font-semibold text-brand-navy leading-tight">NAWBO Innovation Award</p>
                  <p className="font-sans text-[10px] text-muted-foreground">Remarkable Woman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TOPIC TICKER ══════════ */}
      <section className="bg-brand-navy py-3.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center">
              {topicTicker.map((topic) => (
                <span key={`${setIdx}-${topic}`} className="font-sans text-xs md:text-sm uppercase tracking-[0.12em] text-white/50 mx-5 md:mx-7">
                  {topic}
                  <span className="inline-block mx-5 md:mx-7 text-brand-pink">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ AS FEATURED ON ══════════ */}
      <section className="py-10 px-6 bg-background">
        <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-center text-muted-foreground/60 mb-6">
          As Featured On
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-3xl mx-auto">
          {["NAWBO", "Apple Podcasts", "Spotify", "Amazon Music", "YouTube"].map((name) => (
            <span key={name} className="font-sans text-sm md:text-base font-semibold text-brand-navy/20 uppercase tracking-wide">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════ MEET AIMEE — Marie Forleo "Heya, I'm Marie" style ══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "linear-gradient(180deg, hsl(38 55% 97%) 0%, hsl(0 0% 100%) 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <ScrollReveal animation="slide-in-left" className="lg:col-span-2">
              <img
                src={AIMEE_PHOTO}
                alt="Aimee Rickabus"
                className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </ScrollReveal>

            <ScrollReveal animation="slide-in-right" delay={150} className="lg:col-span-3">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-pink mb-3">Meet Your Host</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy mb-5">
                Hey, I'm <em className="text-brand-pink">Aimee.</em>
              </h2>
              <p className="font-serif text-xl md:text-2xl text-brand-navy/80 mb-5 leading-snug">
                I built a nine-figure company while raising <em className="text-brand-pink">six kids.</em>
              </p>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-4">
                I'm a CEO, author, podcast host, and mother of six who has spent two decades in leadership — not because someone handed me a title, but because <strong>women are already leading everywhere</strong>. At home. At work. In their communities. We're just not getting credit for it.
              </p>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-7">
                The Manage Her™ exists because I got tired of watching brilliant women shrink. This podcast is your permission slip to <strong>stop managing yourself down</strong> and start leading like you mean it.
              </p>

              <div className="flex flex-wrap gap-3 mb-7">
                {["CEO, 9-Figure Tech Company", "Author", "Mother of Six", "NAWBO Award Recipient", "Podcast Host"].map((tag) => (
                  <span key={tag} className="font-sans text-xs font-medium bg-brand-blush text-brand-pink px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <Button variant="outline" className="rounded-full px-7 h-11 font-sans text-sm font-medium border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5" asChild>
                <Link to="/about">My Full Story →</Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════ PULL QUOTE — Marie Forleo style full-width ══════════ */}
      <section className="py-16 md:py-20 px-6 bg-brand-blush">
        <ScrollReveal>
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-brand-navy italic leading-relaxed">
              "The most <span className="text-brand-pink not-italic font-bold" style={{ fontStyle: "italic" }}>revolutionary</span> thing a woman can do is stop asking for permission to lead the life she's already building."
            </p>
            <footer className="font-sans text-sm text-muted-foreground mt-5">
              — <strong>Aimee Rickabus</strong>, The Manage Her™
            </footer>
          </blockquote>
        </ScrollReveal>
      </section>

      {/* ══════════ THREE PILLARS — Amy Porterfield clean card style ══════════ */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-pink mb-3">What We Talk About</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy">
                Three Conversations That <em className="text-brand-pink">Change</em> Everything
              </h2>
              <p className="font-sans text-[15px] text-muted-foreground mt-4">Each episode lives at the intersection of what matters most.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Women's Empowerment", desc: "Invisible labor, identity beyond motherhood, boundaries, self-reclamation, and the leadership revolution happening inside your own home." },
              { num: "02", title: "Financial Literacy", desc: "Wealth building, pay equity, investing, financial independence, and why every woman deserves to understand the money she's helping create." },
              { num: "03", title: "Entrepreneurship", desc: "Building businesses on your own terms, scaling without sacrificing your sanity, and proving that ambition and motherhood aren't mutually exclusive." },
            ].map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 120}>
                <div className="relative bg-card rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-brand-pink/10 h-full">
                  <span className="font-serif text-5xl font-bold text-brand-pink/10 group-hover:text-brand-pink/20 transition-colors absolute top-6 right-7">
                    {p.num}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-navy mb-4 mt-2">{p.title}</h3>
                  <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EPISODES — Clean editorial list ══════════ */}
      <section id="listen" className="py-20 md:py-28 px-6" style={{ background: "linear-gradient(180deg, hsl(340 50% 96%) 0%, hsl(260 40% 95%) 50%, hsl(38 55% 97%) 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-pink mb-3">Latest Episodes</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy">
                  Start <em className="text-brand-pink">Listening</em>
                </h2>
                <p className="font-sans text-[15px] text-muted-foreground mt-3">Real conversations, real strategies, real permission to lead.</p>
              </div>
              <Button variant="outline" className="rounded-full px-6 h-10 font-sans text-sm font-medium border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5 mt-5 md:mt-0 shrink-0" asChild>
                <Link to="/podcast">Browse All Episodes →</Link>
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {episodes.map((ep, i) => (
              <ScrollReveal key={ep.ep} delay={i * 120}>
                <a
                  href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-brand-pink/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={ep.img} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    {ep.tag && (
                      <span className="absolute top-3 left-3 bg-brand-pink text-primary-foreground font-sans text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                        {ep.tag}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-pink text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                        <Play size={18} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-sans text-xs text-muted-foreground mb-2">Episode {ep.ep} · {ep.duration}</p>
                    <h3 className="font-serif text-lg font-bold text-brand-navy leading-snug mb-2 group-hover:text-brand-pink transition-colors">
                      {ep.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">{ep.desc}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Platform links */}
          <ScrollReveal delay={400}>
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {[
                { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" },
                { label: "Spotify", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ" },
                { label: "Amazon Music", href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her" },
                { label: "YouTube", href: "https://www.youtube.com/@TheManageHer" },
              ].map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-brand-navy/50 hover:text-brand-pink transition-colors px-4 py-2 rounded-full border border-brand-navy/10 hover:border-brand-pink/20"
                >
                  {p.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ IMPACT STATS — Full-width band ══════════ */}
      <section className="bg-brand-navy py-14 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: 9, suffix: "-Figure", label: "Company Led by Aimee" },
            { val: 6, suffix: " Kids", label: "Raised While Building" },
            { val: 30, suffix: "+", label: "Episodes & Counting" },
            { val: 5.0, suffix: " ★", label: "Star Apple Rating" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </p>
              <p className="font-sans text-xs uppercase tracking-widest text-white/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ BOOK — Editorial split ══════════ */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="scale-in">
              <div className="flex justify-center">
                <div className="book-3d">
                  <div className="book-3d-inner rounded-lg overflow-hidden">
                    <img
                      src={BOOK_COVER}
                      alt="The Manage Her™ Book"
                      className="w-56 md:w-64"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-in-right" delay={150}>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold mb-3">The Book</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-5 leading-tight">
                Unveiling Invisible Labor & Sparking a <em className="text-brand-pink">Leadership Revolution</em>
              </h2>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-5">
                The book that names what millions of women feel but can't articulate. From invisible labor to identity reclamation, this is the blueprint for women who are done shrinking and ready to lead.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {["Invisible Labor Framework", "Leadership Identity", "Financial Independence", "Boundary Setting", "Self-Reclamation"].map((tag) => (
                  <span key={tag} className="font-sans text-[11px] font-medium bg-brand-blush text-brand-pink px-3 py-1.5 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-full px-7 h-11 font-sans text-sm font-medium shadow-lg shadow-brand-pink/20" asChild>
                  <a href="https://a.co/d/by5X0fV" target="_blank" rel="noopener noreferrer">Order on Amazon →</a>
                </Button>
                <Button variant="outline" className="rounded-full px-7 h-11 font-sans text-sm font-medium border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5" asChild>
                  <Link to="/book">Learn More</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "linear-gradient(180deg, hsl(260 40% 95%) 0%, hsl(340 50% 96%) 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-pink mb-3">What Listeners Say</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy">
                Real Women. Real <em className="text-brand-pink">Impact.</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.author} delay={i * 120}>
                <div className="bg-background rounded-2xl p-7 shadow-sm h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <p className="font-serif text-[17px] italic text-brand-navy/80 leading-relaxed flex-1 mb-5">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-sans text-sm font-semibold text-brand-navy">{t.author}</p>
                    <p className="font-sans text-xs text-muted-foreground">{t.source}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PLATFORMS ══════════ */}
      <section className="py-16 md:py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-pink mb-3">Listen Everywhere</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-navy mb-3">
              Pick Your <em className="text-brand-pink">Platform</em>
            </h2>
            <p className="font-sans text-[15px] text-muted-foreground mb-10">New episodes drop weekly. Subscribe so you never miss one.</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Apple Podcasts", sub: "Subscribe Free", href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" },
              { name: "Spotify", sub: "Stream Free", href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ" },
              { name: "Amazon Music", sub: "Listen Free", href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her" },
              { name: "YouTube", sub: "Watch Episodes", href: "https://www.youtube.com/@TheManageHer" },
            ].map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 80}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-pink/10 group"
                >
                  <p className="font-sans text-sm font-semibold text-brand-navy group-hover:text-brand-pink transition-colors">{p.name}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-1">{p.sub}</p>
                </a>
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
