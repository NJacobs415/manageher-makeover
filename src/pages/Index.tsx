import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/animations/CursorFollower";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Parallax from "@/components/animations/Parallax";
import Magnetic from "@/components/animations/Magnetic";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { Play, Star, ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEpisodeCount } from "@/hooks/useEpisodeCount";
import { useEpisodes } from "@/hooks/useEpisodes";
import SEO from "@/components/SEO";

// ─── Assets ───
import podcastCover from "@/assets/podcast-cover.png";
import bookCover from "@/assets/book-cover.png";
import logoSpotify from "@/assets/logo-spotify.png";
import logoAmazonMusic from "@/assets/logo-amazon-music.png";
import logoYouTube from "@/assets/logo-youtube-white.png";
import logoApplePodcasts from "@/assets/logo-apple-podcasts.svg";
import cardConversations from "@/assets/card-conversations.png";
import cardGuests from "@/assets/card-guests.png";
import cardActionable from "@/assets/card-actionable.png";
import cardHolistic from "@/assets/card-holistic.png";
import cardEmpowerment from "@/assets/card-empowerment.png";
import cardFinancial from "@/assets/card-financial.png";
import cardEntrepreneurship from "@/assets/card-entrepreneurship.png";

// ─── CDN Images ───
const AIMEE_PHOTO = "/aimee-portrait-1.jpg";
const BOOK_COVER_CDN =
  "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a714ae8e39698a8fbfa2bb.png";

// ─── Data ───
const testimonials = [
  {
    text: "She put words to something I've felt for years but couldn't name. I pulled over on my commute because I was crying.",
    author: "Sarah M.",
    source: "Apple Podcasts",
  },
  {
    text: "Finally someone who validates what we're already doing and shows us how to own it — without telling us to just 'lean in.'",
    author: "Jessica R.",
    source: "Spotify",
  },
  {
    text: "The authority of a CEO and the heart of a mom who gets it. Every working mother needs this.",
    author: "Lauren T.",
    source: "Apple Podcasts",
  },
  {
    text: "I've never felt so seen by a podcast. This isn't motivation fluff — it's a mirror and a map.",
    author: "Danielle K.",
    source: "Spotify",
  },
];

const marqueeTopics = [
  "Empowerment",
  "Financial Literacy",
  "Entrepreneurship",
  "Motherhood",
  "Leadership",
  "Invisible Labor",
  "Wellness",
  "Boundaries",
  "Feminine Leadership",
  "Community",
];

const episodes = [
  {
    num: "56",
    date: "April 2026",
    title:
      "Holistic Motherhood: Pregnancy, Self-Care & Nervous System Health with Dr. Laura Brayton",
    desc: "Dr. Laura Brayton joins Aimee to talk pregnancy, self-care, and how to regulate your nervous system as a mother.",
    thumbnail: "https://i.ytimg.com/vi/h6kSEVbmTnY/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=h6kSEVbmTnY",
    tag: "Latest",
  },
  {
    num: "55",
    date: "March 2026",
    title: "Parenting as Leadership: Kristina Campos on Playing the Long Game",
    desc: "Kristina Campos shares how she approaches parenting the same way she approaches leadership — with patience, strategy, and the long game in mind.",
    thumbnail: "https://i.ytimg.com/vi/Z-ty9_lpuAQ/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=Z-ty9_lpuAQ",
  },
  {
    num: "35",
    date: "March 2026",
    title:
      "Reset Your Mitochondria for Energy, Longevity & Health | Kristina Kristen on 10,000 Suns",
    desc: "Kristina Kristen unpacks how to reset your mitochondria for energy, longevity, and whole-body health — and why 10,000 Suns changes everything.",
    thumbnail: "https://i.ytimg.com/vi/QO8OAMlZwK8/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=QO8OAMlZwK8",
  },
];

const Index = () => {
  const [currentTest, setCurrentTest] = useState(0);
  const episodeCount = useEpisodeCount();
  const { episodes: liveEpisodes, loaded } = useEpisodes(3);

  // Adapt n8n webhook shape to the render shape; fall back to hardcoded
  const displayEpisodes =
    loaded && liveEpisodes.length > 0
      ? liveEpisodes.map((ep, i) => ({
          num: ep.title.match(/Ep\.?\s*(\d+)/i)?.[1] || String(56 - i),
          date: new Date(ep.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          title: ep.title
            .replace(/^Ep\.?\s*\d+\s*:?\s*/i, "")
            .replace(/\s*\|.*$/, "")
            .trim(),
          desc:
            ep.description.split("\n")[0].substring(0, 160) + "...",
          thumbnail: ep.thumbnailMax || ep.thumbnail,
          link: `https://www.youtube.com/watch?v=${ep.id}`,
          tag: i === 0 ? "Latest" : undefined,
        }))
      : episodes;

  useEffect(() => {
    const t = setInterval(
      () => setCurrentTest((p) => (p + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-x-hidden page-enter">
      <SEO
        title="The Manage Her® — Redefining Women's Leadership"
        description="Leadership movement for women — redefining how women lead in life, at home, and in business. Founded by Aimee Rickabus."
        url="https://www.themanageher.com"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "The Manage Her",
          url: "https://www.themanageher.com",
          logo: "https://www.themanageher.com/M_Logo_Pink.png",
          founder: { "@type": "Person", name: "Aimee Rickabus" },
          sameAs: [
            "https://www.instagram.com/themanageher/",
            "https://www.youtube.com/@TheManageHer",
            "https://www.tiktok.com/@themanageher",
            "https://www.linkedin.com/company/themanageher",
          ],
        }}
      />
      <CursorFollower />
      <Navbar />

      {/* ═══════════════════════════════════════════════
          HERO — Cinematic video background
          ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35)" }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>

        {/* Grain texture */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        {/* M logo watermark */}
        <img
          src="/M_Logo_Pink.png"
          alt=""
          aria-hidden="true"
          className="absolute z-[2] pointer-events-none select-none"
          style={{
            bottom: "20px",
            right: "20px",
            height: "200px",
            opacity: 0.08,
            transform: "rotate(10deg)",
            mixBlendMode: "screen",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-20 lg:py-0">
            {/* Text — 8 cols */}
            <div className="lg:col-span-8">
              <TextReveal delay={400}>
                <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-pink mb-6">
                  The Podcast Redefining Leadership
                </p>
              </TextReveal>

              <TextReveal delay={600}>
                <h1 className="font-serif text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[1.15] text-foreground mb-8">
                  Where Motherhood
                  <br />
                  Meets <em className="text-brand-pink italic">Leadership</em>
                </h1>
              </TextReveal>

              <FadeIn delay={900} y={30}>
                <p
                  className="text-[15px] leading-relaxed max-w-lg mb-10"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    color: "var(--foreground-muted, #999)",
                    fontSize: "1.15rem",
                    lineHeight: "1.9",
                  }}
                >
                  Invisible work gets the spotlight it deserves. Empowering
                  women to reclaim their roles as CEOs of both home and
                  business.
                </p>
              </FadeIn>

              <FadeIn delay={1100} y={20}>
                <div className="flex flex-wrap gap-4 mb-12">
                  <Magnetic strength={0.2}>
                    <a
                      href="#listen"
                      className="btn-glow inline-flex items-center gap-2.5 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 transition-colors"
                      style={{ borderRadius: "50px" }}
                    >
                      <Play size={14} className="fill-current" /> Listen Now
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <Link
                      to="/book"
                      className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all"
                      style={{ borderRadius: "50px" }}
                    >
                      Get the Book <ArrowRight size={14} />
                    </Link>
                  </Magnetic>
                </div>
              </FadeIn>

              {/* Stats row */}
              <FadeIn delay={1300} y={20}>
                <div className="flex gap-10">
                  {[
                    { val: episodeCount, suffix: "+", label: "Episodes" },
                    { val: 50, suffix: "K+", label: "Downloads" },
                    { val: 5, suffix: "★", label: "Rated" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-serif text-2xl md:text-3xl font-bold text-brand-pink">
                        <AnimatedCounter target={s.val} suffix={s.suffix} />
                      </p>
                      <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <FadeIn delay={1800} y={-10}>
            <a
              href="#about"
              className="flex flex-col items-center gap-2 text-muted-foreground/40 hover:text-brand-pink transition-colors"
            >
              <span className="font-sans text-[9px] uppercase tracking-[0.3em]">
                Scroll
              </span>
              <ArrowDown size={14} className="animate-bounce" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <section
        className="relative py-6 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0d0d0d, #111, #0d0d0d)",
        }}
      >
        {/* Gradient hairline — top */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)",
          }}
        />
        {/* Gradient hairline — bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)",
          }}
        />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center">
              {marqueeTopics.map((topic) => (
                <span
                  key={`${setIdx}-${topic}`}
                  className="font-serif text-lg md:text-xl italic mx-6 md:mx-10"
                  style={{
                    color: "rgba(201,169,110,0.35)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {topic}
                  <span
                    className="inline-block mx-6 md:mx-10 not-italic"
                    style={{ color: "rgba(235,24,135,0.5)" }}
                  >
                    ●
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ MEET AIMEE — Warm cream section ═══════ */}
      <section
        id="about"
        className="py-24 md:py-36 px-6 relative overflow-hidden"
        style={{ background: "#faf8f5" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
            {/* Photo */}
            <div className="lg:col-span-5 lg:col-start-1 relative">
              <FadeIn x={-60} y={0} duration={1200}>
                <div className="editorial-img overflow-hidden" style={{ borderRadius: "20px" }}>
                  <img
                    src={AIMEE_PHOTO}
                    alt="Aimee Rickabus"
                    className="w-full aspect-[4/5] object-cover"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            </div>

            {/* Text */}
            <div className="lg:col-span-6 lg:col-start-7 lg:-ml-12 relative z-10">
              <div
                className="p-8 md:p-12 lg:p-16"
                style={{
                  background: "#faf8f5",
                  borderRadius: "20px",
                }}
              >
                <TextReveal>
                  <p
                    className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4"
                    style={{ color: "#c9a96e" }}
                  >
                    The Mission
                  </p>
                </TextReveal>
                <TextReveal delay={100}>
                  <h2
                    className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6"
                    style={{ color: "#1a1a1a" }}
                  >
                    You're running a household like a{" "}
                    <em className="text-brand-pink italic">Fortune 500</em>. It's time
                    the world noticed.
                  </h2>
                </TextReveal>
                <FadeIn delay={300} y={20}>
                  <p
                    className="text-[1.1rem] leading-[1.9] mb-6"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontStyle: "italic",
                      color: "#666",
                    }}
                  >
                    "The skills that make you extraordinary at home are the same
                    skills CEOs use to build empires. The only difference? No one
                    gave you the title."
                  </p>
                </FadeIn>
                <FadeIn delay={400} y={20}>
                  <p
                    className="font-sans text-[14px] leading-relaxed mb-8"
                    style={{ color: "#777" }}
                  >
                    The Manage Her® is a space created by entrepreneur and author
                    Aimee Rickabus to spark real conversations about emotional
                    wellness, boundaries, feminine leadership, holistic living,
                    and raising the next generation — so you can rise, restore,
                    and lead on your own terms.
                  </p>
                </FadeIn>
                <FadeIn delay={500} y={20}>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:gap-3 transition-all"
                  >
                    Read Aimee's Full Story <ArrowRight size={14} />
                  </Link>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="max-w-[1400px] mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                img: cardConversations,
                title: "Real Conversations",
                desc: "No scripts. No filters. The raw truth about running a home and a business.",
              },
              {
                img: cardGuests,
                title: "Expert Guests",
                desc: "Financial strategists, coaches, founders, and leaders who've been in the trenches.",
              },
              {
                img: cardActionable,
                title: "Actionable Advice",
                desc: "Walk away from every episode with something you can implement today.",
              },
              {
                img: cardHolistic,
                title: "Holistic Approach",
                desc: "Wellness, wealth, leadership, and motherhood — because you can't separate them.",
              },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i * 100} y={30}>
                <div
                  className="group relative overflow-hidden"
                  style={{
                    height: "280px",
                    borderRadius: "16px",
                  }}
                >
                  <img
                    src={f.img}
                    alt={f.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.85) 100%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h4 className="font-serif text-lg font-bold text-white mb-2">
                      {f.title}
                    </h4>
                    <p className="font-sans text-[13px] leading-relaxed text-white/80">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PILLARS — Dark section ═══════ */}
      <section className="py-24 md:py-36 px-6 bg-background relative">
        <div className="max-w-[1400px] mx-auto">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">
              What We Stand For
            </p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center leading-tight mb-6">
              Three Pillars of{" "}
              <em className="text-brand-pink italic">The Manage Her</em>
              <span
                style={{
                  fontSize: ".45em",
                  verticalAlign: "super",
                  fontStyle: "normal",
                }}
              >
                ®
              </span>
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p
              className="text-center max-w-[600px] mx-auto mb-16"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                color: "#888",
                fontSize: "1.1rem",
              }}
            >
              Every episode, every conversation, every piece of content flows
              from these core beliefs.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Women's Empowerment",
                desc: "The invisible work women do every single day — managing households, nurturing families, building communities — is leadership. We're making it visible, valued, and non-negotiable.",
                img: cardEmpowerment,
              },
              {
                num: "02",
                title: "Financial Literacy",
                desc: "Your money story was written before you could read. We break down the barriers, bust the myths, and give women the financial knowledge to build generational wealth on their terms.",
                img: cardFinancial,
              },
              {
                num: "03",
                title: "Entrepreneurship",
                desc: "From kitchen tables to boardrooms — we celebrate women who build. Real stories, real strategies, and real talk about what it takes to create something from nothing while managing everything.",
                img: cardEntrepreneurship,
              },
            ].map((p, i) => (
              <FadeIn key={p.num} delay={i * 150} y={40}>
                <div
                  className="group relative overflow-hidden"
                  style={{
                    minHeight: "400px",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.9) 100%)",
                    }}
                  />
                  <span
                    className="absolute top-8 left-8 font-serif text-5xl italic z-10"
                    style={{ color: "rgba(201,169,110,0.85)" }}
                  >
                    {p.num}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10">
                    <h3 className="font-serif text-2xl font-bold text-white mb-4">
                      {p.title}
                    </h3>
                    <p className="font-sans text-[14px] text-white/75 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ EPISODES — Dark section ═══════ */}
      <section
        id="listen"
        className="py-24 md:py-36 px-6 relative"
        style={{
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <TextReveal>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-3">
                  Latest Conversations
                </p>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Recent <em className="text-brand-pink italic">Episodes</em>
                </h2>
              </TextReveal>
            </div>
            <FadeIn delay={300} y={10}>
              <Link
                to="/podcast"
                className="link-reveal font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink mt-4 md:mt-0"
              >
                View All Episodes →
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayEpisodes.map((ep, i) => (
              <FadeIn key={ep.num} delay={i * 150} y={40}>
                <a
                  href={ep.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div
                    className="relative overflow-hidden mb-5"
                    style={{ borderRadius: "16px", aspectRatio: "16/10" }}
                  >
                    <img
                      src={ep.thumbnail}
                      alt={ep.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-500 flex items-center justify-center">
                      <div
                        className="w-14 h-14 bg-brand-pink text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500"
                        style={{ borderRadius: "50%" }}
                      >
                        <Play size={20} className="fill-current ml-0.5" />
                      </div>
                    </div>
                    {ep.tag && (
                      <span
                        className="absolute top-4 left-4 bg-brand-pink text-primary-foreground font-sans text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5"
                        style={{ borderRadius: "6px" }}
                      >
                        {ep.tag}
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Episode {ep.num} · {ep.date}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-brand-pink transition-colors mb-2">
                    {ep.title}
                  </h3>
                  <p className="font-sans text-[13px] text-muted-foreground leading-relaxed">
                    {ep.desc}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PULL QUOTE — Warm cream section ═══════ */}
      <section
        className="py-24 md:py-32 px-6 relative overflow-hidden"
        style={{ background: "#f5f0eb" }}
      >
        <Parallax
          speed={0.15}
          className="absolute top-0 right-0 w-64 opacity-5 pointer-events-none"
        >
          <span
            className="font-serif text-[20rem] leading-none block"
            style={{ color: "#c9a96e" }}
          >
            "
          </span>
        </Parallax>
        <FadeIn>
          <blockquote className="max-w-4xl mx-auto text-center relative z-10">
            <p
              className="font-serif text-2xl md:text-4xl lg:text-5xl leading-[1.2] italic"
              style={{ color: "#1a1a1a" }}
            >
              "The most{" "}
              <span className="text-brand-pink not-italic font-bold">
                revolutionary
              </span>{" "}
              thing a woman can do is stop asking for permission to lead the
              life she's already building."
            </p>
            <footer className="font-sans text-[10px] uppercase tracking-[0.3em] mt-8" style={{ color: "#999" }}>
              — Aimee Rickabus
            </footer>
          </blockquote>
        </FadeIn>
      </section>

      {/* ═══════ BOOK — Dark section with gold accents ═══════ */}
      <section
        id="book"
        className="py-24 md:py-36 px-6 bg-background relative overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Book mockup */}
            <div className="lg:col-span-5 relative">
              <FadeIn scale={0.9}>
                <div className="flex justify-center relative z-10">
                  <div className="book-3d">
                    <div
                      className="book-3d-inner overflow-hidden"
                      style={{ borderRadius: "8px" }}
                    >
                      <img
                        src={bookCover}
                        alt="The Manage Her® Book"
                        className="w-52 md:w-64"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = BOOK_COVER_CDN;
                        }}
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Book content */}
            <div className="lg:col-span-6 lg:col-start-7">
              <TextReveal>
                <p
                  className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4"
                  style={{ color: "#c9a96e" }}
                >
                  The Book
                </p>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                  The invisible work you do every day is{" "}
                  <em className="text-brand-pink italic">leadership</em>.
                </h2>
              </TextReveal>
              <FadeIn delay={300} y={20}>
                <p className="font-sans text-[14px] text-muted-foreground leading-relaxed mb-4">
                  The Manage Her® isn't just a podcast — it's a movement. And
                  now it's a book. Aimee Rickabus lays out the blueprint for
                  women to reclaim their time, own their power, and lead with
                  purpose — at home, at work, and everywhere in between.
                </p>
              </FadeIn>
              <FadeIn delay={400} y={20}>
                <p className="font-sans text-[14px] text-muted-foreground leading-relaxed mb-6">
                  Available now on Amazon in paperback, Kindle, and Audible.
                </p>
              </FadeIn>
              <FadeIn delay={450} y={20}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    "Invisible Labor",
                    "Time Freedom",
                    "Feminine Leadership",
                    "Boundaries",
                    "Self-Reclamation",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[10px] uppercase tracking-[0.1em] px-3 py-1.5"
                      style={{
                        background: "rgba(201,169,110,0.1)",
                        color: "#c9a96e",
                        borderRadius: "50px",
                        border: "1px solid rgba(201,169,110,0.15)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={500} y={20}>
                <Magnetic strength={0.2}>
                  <a
                    href="https://a.co/d/by5X0fV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 transition-colors"
                    style={{
                      background:
                        "linear-gradient(135deg, #c9a96e, #dfc08a)",
                      color: "#0a0a0a",
                      borderRadius: "50px",
                      boxShadow: "0 4px 24px rgba(201,169,110,0.3)",
                    }}
                  >
                    📚 Get Your Copy
                  </a>
                </Magnetic>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ LISTEN EVERYWHERE — Dark section ═══════ */}
      <section
        className="py-24 md:py-32 px-6"
        style={{
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-[1000px] mx-auto text-center">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4">
              Tune In
            </p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Listen <em className="text-brand-pink italic">Everywhere</em>
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p
              className="mb-12"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                color: "#888",
                fontSize: "1.1rem",
              }}
            >
              New episodes drop every Monday. Choose your platform.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Apple Podcasts",
                logo: logoApplePodcasts,
                href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475",
                sub: "Subscribe Free",
              },
              {
                name: "Spotify",
                logo: logoSpotify,
                href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ",
                sub: "Stream Free",
              },
              {
                name: "YouTube",
                logo: logoYouTube,
                href: "https://www.youtube.com/@TheManageHer",
                sub: "Watch & Subscribe",
              },
              {
                name: "Amazon Music",
                logo: logoAmazonMusic,
                href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her",
                sub: "Listen Free",
              },
            ].map((platform, i) => (
              <FadeIn key={platform.name} delay={i * 100} y={20}>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "#111",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(235,24,135,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="h-8 mx-auto mb-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {platform.sub}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS — Warm cream section ═══════ */}
      <section
        className="py-24 md:py-32 px-6 relative overflow-hidden"
        style={{ background: "#faf8f5" }}
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-10"
              style={{ color: "#bbb" }}
            >
              What Listeners Say
            </p>

            <div className="relative min-h-[240px] flex items-center justify-center">
              {testimonials.map((t, i) => (
                <div
                  key={t.author}
                  className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
                  style={{
                    opacity: currentTest === i ? 1 : 0,
                    transform:
                      currentTest === i
                        ? "translateY(0)"
                        : "translateY(20px)",
                    pointerEvents: currentTest === i ? "auto" : "none",
                  }}
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        style={{ color: "#c9a96e", fill: "#c9a96e" }}
                      />
                    ))}
                  </div>
                  <blockquote
                    className="font-serif text-xl md:text-2xl lg:text-3xl italic leading-relaxed mb-6"
                    style={{ color: "#1a1a1a" }}
                  >
                    "{t.text}"
                  </blockquote>
                  <p
                    className="font-sans text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: "#bbb" }}
                  >
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
                  className="h-2 transition-all duration-300"
                  style={{
                    width: currentTest === i ? "24px" : "8px",
                    background:
                      currentTest === i
                        ? "hsl(var(--brand-pink))"
                        : "rgba(0,0,0,0.15)",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ STATS STRIP — Dark section ═══════ */}
      <section
        className="py-16 px-6"
        style={{
          background: "#0a0a0a",
          borderTop: "1px solid rgba(235,24,135,0.1)",
          borderBottom: "1px solid rgba(235,24,135,0.1)",
        }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: 9, suffix: "-Figure", label: "Company Led by Aimee" },
            { val: 6, suffix: " Kids", label: "Raised While Building" },
            { val: episodeCount, suffix: "+", label: "Episodes & Counting" },
            { val: 5.0, suffix: " ★", label: "Star Apple Rating" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 100} y={30}>
              <p className="font-serif text-3xl md:text-4xl font-bold text-brand-pink">
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </p>
              <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                {s.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════ SOCIAL STRIP — Dark section ═══════ */}
      <section
        className="py-8 px-6"
        style={{ background: "#111" }}
      >
        <div className="max-w-[1000px] mx-auto flex flex-wrap justify-center gap-8">
          {[
            {
              name: "Instagram",
              icon: "📸",
              href: "https://www.instagram.com/themanageher/",
            },
            {
              name: "YouTube",
              icon: "🎬",
              href: "https://www.youtube.com/@TheManageHer",
            },
            {
              name: "TikTok",
              icon: "🎵",
              href: "https://www.tiktok.com/@themanageher",
            },
            {
              name: "LinkedIn",
              icon: "💼",
              href: "https://www.linkedin.com/company/themanageher",
            },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-brand-pink transition-colors font-sans text-[13px] font-medium"
            >
              <span>{social.icon}</span>
              {social.name}
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
