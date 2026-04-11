import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Magnetic from "@/components/animations/Magnetic";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { Star, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useEpisodeCount } from "@/hooks/useEpisodeCount";
import { useEpisodes } from "@/hooks/useEpisodes";
import podcastCover from "@/assets/podcast-cover.png";
import logoSpotify from "@/assets/logo-spotify.png";
import logoApplePodcasts from "@/assets/logo-apple-podcasts.svg";
import logoYouTube from "@/assets/logo-youtube-white.png";
import logoAmazonMusic from "@/assets/logo-amazon-music.png";
import cardEmpowerment from "@/assets/card-empowerment.png";
import cardHolistic from "@/assets/card-holistic.png";
import cardGuests from "@/assets/card-guests.png";
import cardActionable from "@/assets/card-actionable.png";
import cardFinancial from "@/assets/card-financial.png";
import cardConversations from "@/assets/card-conversations.png";
import SEO from "@/components/SEO";

// Hardcoded fallback for the featured "Latest Episode" card
const fallbackLatest = {
  num: "56",
  date: "April 2026",
  title:
    "Holistic Motherhood: Pregnancy, Self-Care & Nervous System Health with Dr. Laura Brayton",
  desc: "Dr. Laura Brayton joins Aimee to talk pregnancy, self-care, and how to regulate your nervous system as a mother.",
  thumbnail: "https://i.ytimg.com/vi/h6kSEVbmTnY/maxresdefault.jpg",
  link: "https://www.youtube.com/watch?v=h6kSEVbmTnY",
};

const Podcast = () => {
  const episodeCount = useEpisodeCount();
  const { episodes: liveEpisodes, loaded } = useEpisodes(3);

  // Adapt the first webhook episode to the featured-card shape; fall back to hardcoded
  const latestEpisode =
    loaded && liveEpisodes.length > 0
      ? (() => {
          const ep = liveEpisodes[0];
          return {
            num: ep.title.match(/Ep\.?\s*(\d+)/i)?.[1] || "56",
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
          };
        })()
      : fallbackLatest;

  return (
    <div className="overflow-x-hidden page-enter">
      <SEO
        title="The Manage Her® Podcast"
        description="Real conversations on leadership, motherhood, financial literacy & purpose. New episodes every Monday."
        url="https://themanageher.com/podcast"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "PodcastSeries",
          name: "The Manage Her Podcast",
          url: "https://themanageher.com/podcast",
          author: { "@type": "Person", name: "Aimee Rickabus" },
        }}
      />
      <Navbar />

      {/* ═══════ HERO — Split with podcast cover + Aimee behind the mic ═══════ */}
      <section className="relative min-h-[90vh] min-h-[90svh] flex items-center overflow-hidden px-6" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(235,24,135,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(201,169,110,0.04) 0%, transparent 50%)" }} />

        <div className="max-w-[1300px] mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-16 lg:py-0">
            {/* Text */}
            <div className="lg:col-span-7">
              <TextReveal>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3" style={{ color: "#c9a96e" }}>
                  <span style={{ width: "30px", height: "1px", background: "#c9a96e", display: "inline-block" }} />
                  The Podcast
                </p>
              </TextReveal>
              <TextReveal delay={200}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.15] mb-6">
                  The conversations
                  <br />no one else is <em className="text-brand-pink italic">having</em>.
                </h1>
              </TextReveal>
              <FadeIn delay={500} y={20}>
                <p className="text-lg md:text-xl mb-8 max-w-xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#999", lineHeight: "1.8" }}>
                  Leadership. Money. Motherhood. Boundaries. Identity. The messy middle where women hold everything together — and the strategies to thrive in it.
                </p>
              </FadeIn>

              {/* Platform subscribe buttons */}
              <FadeIn delay={700} y={20}>
                <div className="flex flex-wrap md:flex-nowrap gap-2.5 mb-10">
                  {[
                    { name: "Apple Podcasts", logo: logoApplePodcasts, href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" },
                    { name: "Spotify", logo: logoSpotify, href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ" },
                    { name: "YouTube", logo: logoYouTube, href: "https://www.youtube.com/@TheManageHer" },
                    { name: "Amazon Music", logo: logoAmazonMusic, href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her" },
                  ].map((p) => (
                    <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                      style={{ background: "#111", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.06)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(235,24,135,0.2)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                      <img src={p.logo} alt={p.name} style={{ height: "16px", width: "auto", opacity: 0.8 }} />
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{p.name}</span>
                    </a>
                  ))}
                </div>
              </FadeIn>

              {/* Stats */}
              <FadeIn delay={900} y={20}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {[
                    { val: episodeCount, suffix: "+", label: "Episodes" },
                    { val: 5.0, suffix: " ★", label: "Apple Rating" },
                    { val: 50, suffix: "K+", label: "Downloads" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-serif text-3xl md:text-4xl font-bold text-brand-pink">
                        <AnimatedCounter target={s.val} suffix={s.suffix} />
                      </p>
                      <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                  {/* 4th stat — static Monday drop */}
                  <div>
                    <p className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "#c9a96e" }}>
                      Monday
                    </p>
                    <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">New Every</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Podcast iPhone mockup — transparent PNG, floats */}
            <div className="lg:col-span-5">
              <FadeIn delay={600} scale={0.95}>
                <div
                  className="relative flex flex-col items-center"
                  style={{ marginTop: "-20px" }}
                >
                  {/* Pink radial glow behind phone */}
                  <div
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                      width: "400px",
                      height: "400px",
                      transform: "translate(-50%, -50%)",
                      background:
                        "radial-gradient(circle, rgba(235,24,135,0.15) 0%, transparent 70%)",
                      filter: "blur(60px)",
                      zIndex: -1,
                    }}
                  />
                  <img
                    src="/podcast-iphone-mockup.png"
                    alt="The Manage Her® Podcast on Apple Podcasts"
                    className="animate-float relative"
                    style={{
                      maxHeight: "650px",
                      width: "auto",
                      filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))",
                    }}
                    loading="eager"
                  />
                  {/* Pink glow reflection beneath phone */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none"
                    style={{
                      width: "60%",
                      height: "40px",
                      marginTop: "-10px",
                      background:
                        "linear-gradient(to bottom, rgba(235,24,135,0.1), transparent)",
                      filter: "blur(20px)",
                    }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ INTRO STATEMENT — Warm cream split layout ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#faf8f5" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Lifestyle image */}
            <div className="lg:col-span-5">
              <FadeIn y={30}>
                <img
                  src="/podcast-iphone-lifestyle.png"
                  alt="A woman listening to The Manage Her® Podcast"
                  className="w-full object-cover"
                  style={{
                    borderRadius: "20px",
                    maxHeight: "500px",
                  }}
                  loading="lazy"
                />
              </FadeIn>
            </div>

            {/* Intro text */}
            <div className="lg:col-span-7 lg:pl-4">
              <FadeIn delay={100} y={20}>
                <p
                  className="font-sans text-[16px] leading-[2.2] mb-6"
                  style={{ color: "#666" }}
                >
                  Women lead{" "}
                  <em
                    className="text-brand-pink"
                    style={{ fontStyle: "italic" }}
                  >
                    everywhere
                  </em>
                  . In homes, in businesses, in marriages, in communities. Yet
                  so much of that leadership goes unseen and uncelebrated.{" "}
                  <strong style={{ color: "#1a1a1a" }}>
                    This show changes that.
                  </strong>
                </p>
              </FadeIn>
              <FadeIn delay={200} y={20}>
                <p
                  className="font-sans text-[16px] leading-[2.2] mb-8"
                  style={{ color: "#666" }}
                >
                  Every week, Aimee Rickabus sits down with women who are
                  running big lives. We talk about leadership, money, marriage,
                  identity, community, impact, ambition, burnout — and the
                  messy middle where women hold everything together.
                </p>
              </FadeIn>
              <FadeIn delay={300} y={20}>
                <p
                  className="font-serif text-3xl md:text-4xl italic mt-8 leading-[1.25]"
                  style={{ color: "#1a1a1a" }}
                >
                  It's time to lead like{" "}
                  <em className="text-brand-pink">yourself</em>.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WHAT YOU'LL LEARN — Dark section ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(235,24,135,0.08)" }}>
        <div className="max-w-[1200px] mx-auto">
          <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">What You'll Walk Away With</p></TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-6">
              Leadership for the <em className="text-brand-pink italic">whole</em> woman
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p className="text-center mb-16 max-w-[600px] mx-auto" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#888", fontSize: "1.1rem" }}>
              Every episode is designed to meet you exactly where you are — and move you forward.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Own Your Leadership", desc: "At home and at work — learn to recognize and claim the executive skills you already practice daily.", img: cardEmpowerment },
              { title: "Success Without Sacrifice", desc: "Build achievement that doesn't cost you your sanity, your health, or your relationships.", img: cardHolistic },
              { title: "Confidence That Sticks", desc: "Not the kind you fake — the deep, unshakeable belief that comes from knowing your worth.", img: cardGuests },
              { title: "Manage Like a CEO", desc: "Transform overwhelm into systems. Turn chaos into strategy. Lead your life like you'd lead a company.", img: cardActionable },
              { title: "Build Family Wealth", desc: "Financial literacy and wealth strategies designed for the woman building a legacy, not just a bank balance.", img: cardFinancial },
              { title: "Honor Your Energy", desc: "Emotional, physical, spiritual — learn to lead from wholeness rather than depletion.", img: cardConversations },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 80} y={30}>
                <div
                  className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    minHeight: "280px",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.9) 100%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                    <h4 className="font-serif text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="font-sans text-[13px] text-white/80 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ NEW HERE? START WITH THESE — Warm cream ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#f5f0eb" }}>
        <div className="max-w-[900px] mx-auto">
          <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4 text-center" style={{ color: "#c9a96e" }}>New Here?</p></TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight mb-6" style={{ color: "#1a1a1a" }}>
              Start with <em className="text-brand-pink italic">these</em>.
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p className="text-center mb-12 max-w-[600px] mx-auto" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#888", fontSize: "1.1rem" }}>
              If you're just discovering The Manage Her®, this curated playlist will get you hooked — and remind you exactly why you belong here.
            </p>
          </FadeIn>

          <div className="space-y-4">
            {[
              { num: "01", title: "The Story Behind The Manage Her® — Aimee's Solo Episode", cat: "Origin" },
              { num: "02", title: "Invisible Labor: Why Women's Work Is Real Leadership", cat: "Leadership" },
              { num: "03", title: "Your Money Story Was Written Before You Could Read", cat: "Financial Literacy" },
              { num: "04", title: "Burnout to Balance: Reclaiming Confidence & Purpose", cat: "Wellness" },
              { num: "05", title: "What Men Need to Hear — Bart Morse on Emotional Leadership", cat: "Relationships" },
            ].map((ep, i) => (
              <FadeIn key={ep.num} delay={i * 80} y={15}>
                <a href="https://www.youtube.com/@TheManageHer" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-5 p-5 group transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.06)" }}>
                  {/* Numbered badge with play icon */}
                  <div className="relative flex-shrink-0 flex items-center gap-3">
                    <Play size={14} className="text-brand-pink fill-brand-pink" />
                    <div className="w-12 h-12 flex items-center justify-center font-serif font-bold text-sm"
                      style={{ background: "linear-gradient(135deg, #eb1887, #ff4da6)", borderRadius: "12px", color: "#fff" }}>
                      {ep.num}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: "#c9a96e" }}>{ep.cat}</p>
                    <h4 className="font-serif text-lg font-bold group-hover:text-brand-pink transition-colors" style={{ color: "#1a1a1a" }}>{ep.title}</h4>
                  </div>
                  {/* Waveform decoration */}
                  <div
                    className="hidden sm:flex items-end gap-1 flex-shrink-0 pr-2"
                    style={{ height: "20px", opacity: 0.2 }}
                    aria-hidden="true"
                  >
                    <span style={{ width: "3px", height: "8px", background: "#eb1887", borderRadius: "2px" }} />
                    <span style={{ width: "3px", height: "18px", background: "#eb1887", borderRadius: "2px" }} />
                    <span style={{ width: "3px", height: "12px", background: "#eb1887", borderRadius: "2px" }} />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={500} y={20}>
            <div className="text-center mt-10">
              <a href="https://www.youtube.com/@TheManageHer" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:gap-3 transition-all">
                Explore All Episodes <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ BROWSE BY TOPIC — Dark ═══════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4">Browse By Topic</p></TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-12">
              Find what <em className="text-brand-pink italic">speaks</em> to you
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Leadership", count: 12 },
                { name: "Money & Wealth", count: 8 },
                { name: "Burnout", count: 6 },
                { name: "Motherhood", count: 10 },
                { name: "Marriage", count: 5 },
                { name: "Entrepreneurship", count: 9 },
                { name: "Wellness", count: 7 },
                { name: "Identity", count: 6 },
                { name: "Community", count: 4 },
                { name: "Spirituality", count: 3 },
                { name: "Boundaries", count: 8 },
                { name: "Invisible Labor", count: 5 },
              ].map((tag) => (
                <span
                  key={tag.name}
                  className="font-sans text-[13px] font-medium px-6 py-3 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                  style={{ background: "#111", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.06)", color: "#999" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(235,24,135,0.3)"; e.currentTarget.style.color = "#eb1887"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#999"; }}
                >
                  {tag.name}
                  <span className="ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>({tag.count})</span>
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ REVIEWS — Warm cream ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#faf8f5" }}>
        <div className="max-w-[1000px] mx-auto">
          <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] text-center mb-4" style={{ color: "#c9a96e" }}>What Listeners Say</p></TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight mb-16" style={{ color: "#1a1a1a" }}>
              This isn't self-help. It's <em className="text-brand-pink italic">self-recognition</em>.
            </h2>
          </TextReveal>

          {/* Featured review */}
          <FadeIn y={30}>
            <div
              className="relative p-10 md:p-14 mb-8 text-center"
              style={{
                background: "#fff",
                borderRadius: "24px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-4 left-8 font-serif pointer-events-none select-none"
                style={{
                  fontSize: "8rem",
                  lineHeight: "1",
                  color: "rgba(235,24,135,0.08)",
                }}
              >
                "
              </span>
              <div className="relative z-10">
                <div className="flex gap-1 justify-center mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={18} style={{ color: "#c9a96e", fill: "#c9a96e" }} />
                  ))}
                </div>
                <p
                  className="font-serif text-2xl md:text-3xl italic leading-[1.4] mb-6 max-w-[720px] mx-auto"
                  style={{ color: "#1a1a1a" }}
                >
                  "She put words to something I've felt for years but couldn't name. I pulled over on my commute because I was crying."
                </p>
                <p
                  className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#999" }}
                >
                  — Sarah M. · Apple Podcasts
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Finally someone who validates what we're already doing and shows us how to own it — without telling us to just 'lean in.'", author: "Jessica R.", source: "Spotify" },
              { text: "The authority of a CEO and the heart of a mom who gets it. Every working mother needs this podcast.", author: "Lauren T.", source: "Apple Podcasts" },
              { text: "I've re-listened to episodes three times. Aimee says things I didn't know I needed to hear until she said them.", author: "Megan K.", source: "Apple Podcasts" },
            ].map((review, i) => (
              <FadeIn key={review.author} delay={i * 120} y={30}>
                <div className="p-8 h-full flex flex-col" style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={14} style={{ color: "#c9a96e", fill: "#c9a96e" }} />)}</div>
                  <p className="font-serif text-[15px] italic leading-relaxed flex-1 mb-5" style={{ color: "#444" }}>"{review.text}"</p>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#bbb" }}>— {review.author} · {review.source}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={500} y={20}>
            <p className="font-serif text-xl text-center mt-12 italic" style={{ color: "#1a1a1a" }}>
              You are more capable than you know. You have <em className="text-brand-pink">already been leading</em>. We're just making it visible.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ MEET YOUR HOST — Dark with Aimee photo ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(235,24,135,0.08)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <FadeIn x={-40} y={0} duration={1200}>
                <div className="relative">
                  <div className="editorial-img overflow-hidden" style={{ borderRadius: "20px" }}>
                    <img
                      src="/aimee-podcast-chair.jpg"
                      alt="Aimee Rickabus — Host of The Manage Her® Podcast"
                      className="w-full aspect-[4/5] object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* New episode Monday badge */}
                  <div
                    className="absolute bottom-4 left-4 px-4 py-2 z-10"
                    style={{
                      background: "linear-gradient(135deg, #eb1887, #ff4da6)",
                      borderRadius: "50px",
                      boxShadow: "0 8px 20px rgba(235,24,135,0.35)",
                    }}
                  >
                    <p className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      New Episode Every Monday
                    </p>
                  </div>
                  {/* Lifestyle iPhone — editorial overlap on the right */}
                  <img
                    src="/podcast-iphone-lifestyle.png"
                    alt=""
                    aria-hidden="true"
                    className="hidden lg:block absolute pointer-events-none select-none"
                    style={{
                      right: "-40px",
                      bottom: "40px",
                      maxWidth: "200px",
                      width: "auto",
                      transform: "rotate(-5deg)",
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
                      zIndex: 20,
                    }}
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "#c9a96e" }}>Meet Your Host</p></TextReveal>
              <TextReveal delay={100}>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-[1.15] mb-6">
                  I believe the strategy, love, and intuition women pour into their families is the foundation of <em className="text-brand-pink italic">extraordinary leadership</em>.
                </h2>
              </TextReveal>
              <FadeIn delay={300} y={20}>
                <p className="font-sans text-[15px] text-muted-foreground leading-[1.9] mb-5">
                  I'm Aimee Rickabus — CEO of a nine-figure technology company, author, and mother of six. I created this podcast because I was tired of watching brilliant women shrink. Tired of invisible labor going unnamed. Tired of "lean in" being the best advice anyone could offer.
                </p>
              </FadeIn>
              <FadeIn delay={400} y={20}>
                <p className="font-sans text-[15px] text-muted-foreground leading-[1.9] mb-8">
                  Every week, I sit down and have the conversations nobody else is having — about money, power, motherhood, boundaries, and what it actually takes to lead without losing yourself. This isn't motivation fluff. It's a mirror and a map.
                </p>
              </FadeIn>
              <FadeIn delay={500} y={20}>
                <Link to="/about" className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:gap-3 transition-all">
                  Read My Full Story <ArrowRight size={14} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ LATEST EPISODE — Dark featured card ═══════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1100px] mx-auto">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">Latest Episode</p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-12">
              Just <em className="text-brand-pink italic">dropped</em>.
            </h2>
          </TextReveal>

          <FadeIn delay={200} y={30}>
            <a
              href={latestEpisode.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 md:p-10 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#111",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(235,24,135,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <img
                    src={latestEpisode.thumbnail}
                    alt={latestEpisode.title}
                    className="w-full md:w-72 object-cover"
                    style={{
                      aspectRatio: "16/9",
                      borderRadius: "16px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                    }}
                    loading="lazy"
                  />
                </div>
                {/* Episode details */}
                <div className="flex-1 text-center md:text-left">
                  <p
                    className="font-sans text-[10px] uppercase tracking-[0.2em] mb-3"
                    style={{ color: "#c9a96e" }}
                  >
                    Episode {latestEpisode.num} · {latestEpisode.date}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-[1.3] mb-4 group-hover:text-brand-pink transition-colors">
                    {latestEpisode.title}
                  </h3>
                  <p className="font-sans text-[14px] text-muted-foreground leading-relaxed mb-6 max-w-xl">
                    {latestEpisode.desc}
                  </p>
                </div>
                {/* Big play button */}
                <div className="flex-shrink-0">
                  <div
                    className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(135deg, #eb1887, #ff4da6)",
                      borderRadius: "50%",
                      boxShadow: "0 12px 32px rgba(235,24,135,0.45)",
                    }}
                  >
                    <Play size={30} className="fill-white text-white ml-1" />
                  </div>
                </div>
              </div>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ JOIN CTA — Dark ═══════ */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="absolute top-8 left-8 pointer-events-none select-none">
          <span className="font-serif text-[18rem] leading-none" style={{ color: "rgba(235,24,135,0.03)" }}>"</span>
        </div>
        <div className="max-w-[700px] mx-auto text-center relative z-10">
          <TextReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Leadership feels better in <em className="text-brand-pink italic">community</em>.
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p className="mb-10" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#888", fontSize: "1.1rem" }}>
              Join thousands of women stepping into the kind of leadership that honors the life they're actually living. New episodes every Monday.
            </p>
          </FadeIn>
          <FadeIn delay={400} y={20}>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic strength={0.2}>
                <a href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" target="_blank" rel="noopener noreferrer"
                  className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 transition-colors"
                  style={{ borderRadius: "50px" }}>
                  Subscribe Now
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link to="/book"
                  className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all"
                  style={{ borderRadius: "50px" }}>
                  Get the Book <ArrowRight size={14} />
                </Link>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ LISTEN EVERYWHERE — Dark strip ═══════ */}
      <section className="py-16 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">Listen Everywhere</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Apple Podcasts", logo: logoApplePodcasts, href: "https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475", sub: "Subscribe Free" },
              { name: "Spotify", logo: logoSpotify, href: "https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ", sub: "Stream Free" },
              { name: "YouTube", logo: logoYouTube, href: "https://www.youtube.com/@TheManageHer", sub: "Watch & Subscribe" },
              { name: "Amazon Music", logo: logoAmazonMusic, href: "https://music.amazon.com/podcasts/91c217a5-4245-4b83-8d15-8edfdde06884/the-manage-her", sub: "Listen Free" },
            ].map((platform, i) => (
              <FadeIn key={platform.name} delay={i * 80} y={15}>
                <a href={platform.href} target="_blank" rel="noopener noreferrer"
                  className="group block p-6 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#111", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(235,24,135,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}>
                  <img src={platform.logo} alt={platform.name} className="h-8 mx-auto mb-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity" loading="lazy" />
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{platform.sub}</p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;
