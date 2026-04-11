import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Magnetic from "@/components/animations/Magnetic";
import { ArrowRight, Heart, Star, BookOpen, Mic, Briefcase, Baby, Award } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const AIMEE_PHOTO =
  "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df73543f31f1.jpg";

const About = () => {
  const [activeIdentity, setActiveIdentity] = useState(0);

  const identities = [
    {
      title: "CEO",
      desc: "I run a nine-figure technology company serving Fortune 500 clients — PepsiCo, Ford, and some of the world's largest enterprises. I walked into the PepsiCo headquarters five months pregnant and closed the deal. Because that's what we do.",
    },
    {
      title: "Mother of Six",
      desc: "Five of my babies were born at home. One was 11 pounds. I learned self-hypnosis for childbirth, danced through labor to reggae music, and discovered that the fastest way through any challenge isn't to run from it — it's to breathe through it.",
    },
    {
      title: "Author",
      desc: "I wrote The Manage Her® at 3am between feedings, with a company to run in the morning. It's the book that finally names the invisible labor women carry — and gives you permission to call it what it is: leadership.",
    },
    {
      title: "Podcast Host",
      desc: "Every week, I sit down with extraordinary women and have the conversations nobody else is having — about money, power, motherhood, boundaries, and what it actually takes to lead without losing yourself.",
    },
    {
      title: "Serial Entrepreneur",
      desc: "My first company at 22 was flipping 1920s houses. Then came a film production company, a prenatal protein powder brand, and eventually Tomahawk. I even sold my car to fund our first tech venture. Someone's going to do it — why not you?",
    },
    {
      title: "Daughter of Entrepreneurs",
      desc: "My mother won the Ernst & Young Entrepreneur of the Year Award in 1988. She started the first mail-order pharmacy in America. My father had a PhD from NYU. Entrepreneurship isn't something I chose — it's something I inherited.",
    },
  ];

  const timeline = [
    { year: "2000", title: "Film School Over Law School", desc: "Standing at Chapman's law school orientation, I looked across the street at the film school and thought: that's where I belong. I switched on the spot and never looked back.", color: "pink" },
    { year: "2003", title: "First Company at 22", desc: "Bought a run-down 1922 duplex for $198K in Orange County and started flipping houses. My parents nicknamed me 'Bank of Aimee' because I'd been saving babysitting money in a leather sack since I was nine.", color: "gold" },
    { year: "2008", title: "Motherhood Changes Everything", desc: "My first son Julian arrived via home birth during the financial crisis. Three and a half hours start to finish. Birth taught me: the quickest way through any challenge isn't to run from it — it's to embrace it fully.", color: "pink" },
    { year: "2011", title: "Love, Round Two", desc: "Reconnected with an old friend through a Craigslist apartment ad (yes, really). Gabriel was born. We got married in December at our family church — Pastor Ty married our whole little family together.", color: "gold" },
    { year: "2012", title: "Sold My Car, Started a Company", desc: "I believed in Brenden's talent completely. I sold my car, we launched Mohawk Network Solutions, and he grew it from zero to $15 million. When you bet on the right people, magic happens.", color: "pink" },
    { year: "2014", title: "Tomahawk Is Born", desc: "Co-founded Tomahawk Information Solutions — our value-added IT reseller. Three companies, three kids under six. Bonkers. But I'd learned how to delegate. As my husband said: 'We're gonna need a full-time nanny.'", color: "gold" },
    { year: "2020", title: "CEO, Homeschool Principal, Pregnant", desc: "Became CEO of Tomahawk. COVID hit. Schools shut down. I converted our bonus room into 'Travelers Academy' and ran a homeschool pod for 10 kids. Oh, and I was pregnant with Indy. I cried every day. Then I got back up.", color: "pink" },
    { year: "2022", title: "PepsiCo Comes Calling", desc: "Walked into PepsiCo's headquarters in Plano, Texas — five months pregnant — and won a contract to manage 168 software publishers. Became WBENC certified. Found my tribe.", color: "gold" },
    { year: "2024", title: "Awards & Recognition", desc: "NAWBO's Remarkable Woman Award for Innovation. PepsiCo's 'Voice of the Vendor' panelist. Marquis Who's Who. OC Business Journal Women in Business nominee. My parents' dream — in full bloom.", color: "pink" },
    { year: "2025", title: "The Manage Her® Is Born", desc: "Launched the podcast, published the book, built the movement. Because I got tired of watching brilliant women shrink. The revolution isn't coming — it's here.", color: "gold" },
  ];

  return (
    <div className="overflow-x-hidden page-enter">
      <SEO
        title="About Aimee Rickabus | The Manage Her®"
        description="CEO of a nine-figure tech company, bestselling author, podcast host, and mother of six."
        url="https://themanageher.com/about"
      />
      <Navbar />

      {/* ═══════ HERO — Personality first ═══════ */}
      <section className="relative min-h-[90vh] min-h-[90svh] flex items-center overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            <div className="lg:col-span-7 py-20 lg:py-0 lg:pr-16">
              <TextReveal>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "#c9a96e" }}>Meet Aimee</p>
              </TextReveal>
              <TextReveal delay={200}>
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.15] mb-6">
                  I get it.<br /><em className="text-brand-pink italic">I've been there.</em>
                </h1>
              </TextReveal>
              <FadeIn delay={500} y={20}>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed max-w-lg mb-4">
                  CEO of a nine-figure tech company. Author. Podcast host. Mother of six. Serial entrepreneur since 22. Yoga practitioner. Home birther. Homeschool principal (reluctantly). Sold my car to fund my husband's company. Still remembers the Trader Joe's list.
                </p>
              </FadeIn>
              <FadeIn delay={700} y={20}>
                <p className="mb-8" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#999", fontSize: "1.15rem", lineHeight: "1.8" }}>
                  Very into: morning yoga, reggae music during labor, flipping 1920s houses, and raising humans who know their worth. Avoiding "lean in" advice since forever.
                </p>
              </FadeIn>
              <FadeIn delay={900} y={20}>
                <a href="#story" className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:gap-3 transition-all">
                  Read My Story <ArrowRight size={14} />
                </a>
              </FadeIn>
            </div>

            <div className="lg:col-span-5 relative flex items-end">
              <img
                src="/Aimee-HeroTransparent.png"
                alt="Aimee Rickabus"
                className="w-full object-contain"
                style={{ maxHeight: "85vh" }}
                loading="eager"
              />
              {/* Left-edge fade so the image blends into the dark text column */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #0a0a0a 0%, transparent 30%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ORIGIN STORY — Warm cream ═══════ */}
      <section id="story" className="py-24 md:py-36 px-6" style={{ background: "#faf8f5" }}>
        <div className="max-w-[1000px] mx-auto">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "#c9a96e" }}>The Beginning</p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-8" style={{ color: "#1a1a1a" }}>
              My mom started the first mail-order pharmacy in America. My dad had a PhD from NYU. I was their <em className="text-brand-pink italic">science experiment</em>.
            </h2>
          </TextReveal>
          <FadeIn delay={300} y={20}>
            <p className="font-sans text-[15px] leading-[1.9] mb-5" style={{ color: "#666" }}>
              I come from a long line of people who build things. My mother — born with spina bifida, brilliant beyond measure — created an entire industry from a three-page business plan typed on a typewriter. She won the Ernst & Young Entrepreneur of the Year Award when I was nine. I sat in that audience and knew: this is what I'm going to do.
            </p>
          </FadeIn>
          <FadeIn delay={400} y={20}>
            <p className="font-sans text-[15px] leading-[1.9] mb-5" style={{ color: "#666" }}>
              My parents took me to board meetings. They had me folding t-shirts off the production line at their screen printing company. They never treated me like a child — they treated me like a capable being. That confidence became my foundation.
            </p>
          </FadeIn>
          <FadeIn delay={500} y={20}>
            <p className="font-sans text-[15px] leading-[1.9] mb-5" style={{ color: "#666" }}>
              At 22, I bought my first property — a run-down 1922 duplex — and fell in love with restoring things. I fancied myself a preservationist, using my art history degree to bring old houses back to life. My parents called me "Bank of Aimee" because I'd been saving babysitting money in a leather sack since I was nine.
            </p>
          </FadeIn>
          <FadeIn delay={600} y={20}>
            <div className="p-8 mt-8" style={{ background: "#fff", borderRadius: "20px", borderLeft: "3px solid #eb1887" }}>
              <p className="font-serif text-xl md:text-2xl italic leading-[1.5]" style={{ color: "#1a1a1a" }}>
                "Someone is going to do it — why not you?" That thought has lived in my head since I was 22. It's never left.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ "THINGS I ANSWER TO" — Identity cards ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(235,24,135,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">A Few Things I Answer To</p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-16">
              I'm all of these at <em className="text-brand-pink italic">once</em>.
            </h2>
          </TextReveal>

          {/* Identity tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {identities.map((id, i) => (
              <button
                key={id.title}
                onClick={() => setActiveIdentity(i)}
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-2.5 transition-all duration-300"
                style={{
                  background: activeIdentity === i ? "hsl(var(--brand-pink))" : "#111",
                  color: activeIdentity === i ? "#fff" : "#888",
                  borderRadius: "50px",
                  border: `1px solid ${activeIdentity === i ? "transparent" : "rgba(255,255,255,0.05)"}`,
                  cursor: "pointer",
                }}
              >
                {id.title}
              </button>
            ))}
          </div>

          {/* Active identity card */}
          <div
            className="p-10 md:p-14 text-center transition-all duration-500"
            style={{ background: "#111", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", minHeight: "200px" }}
          >
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              {identities[activeIdentity].title}
            </h3>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {identities[activeIdentity].desc}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ THE MOMENT — Emotional turning point ═══════ */}
      <section className="py-24 md:py-32 px-6" style={{ background: "#f5f0eb" }}>
        <div className="max-w-[900px] mx-auto">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4 text-center" style={{ color: "#c9a96e" }}>The Turning Point</p>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <blockquote className="text-center">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.4] italic mb-6" style={{ color: "#1a1a1a" }}>
                "I realized the skills I used to run my home — planning, coaching, strategy, crisis management — weren't optional. They were <span className="text-brand-pink not-italic font-bold">assets</span>. The same skills CEOs use to build empires. The only difference? No one gave me the title."
              </p>
            </blockquote>
          </FadeIn>
          <FadeIn delay={400} y={20}>
            <p className="font-sans text-[15px] text-center leading-[1.9] max-w-[700px] mx-auto mt-8" style={{ color: "#666" }}>
              That realization changed everything. I stopped compartmentalizing. I stopped apologizing. And I started The Manage Her® — because if no one was going to name what women do every single day as leadership, then I would.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ TIMELINE — Visual journey ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="max-w-[800px] mx-auto">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">The Journey</p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-16">
              How I got <em className="text-brand-pink italic">here</em>.
            </h2>
          </TextReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, rgba(235,24,135,0.3), rgba(201,169,110,0.3))" }} />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <FadeIn key={item.year} delay={i * 60} y={20}>
                  <div className="flex gap-6 md:gap-10 items-start pl-2">
                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0 w-12 md:w-16 flex items-center justify-center">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: item.color === "pink" ? "#eb1887" : "#c9a96e", boxShadow: `0 0 12px ${item.color === "pink" ? "rgba(235,24,135,0.4)" : "rgba(201,169,110,0.4)"}` }}
                      />
                    </div>

                    <div className="flex-1 pb-2">
                      <span
                        className="font-serif text-sm italic mb-1 block"
                        style={{ color: item.color === "pink" ? "#eb1887" : "#c9a96e" }}
                      >
                        {item.year}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WHAT I BELIEVE — Dark cards ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1200px] mx-auto">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">What I Believe</p>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-16">
              Leadership isn't a <em className="text-brand-pink italic">title</em>. It's what you do every day.
            </h2>
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Motherhood Is Leadership", desc: "Strategic planning, emotional intelligence, crisis management, people development — you've been practicing executive skills since your first child was born." },
              { num: "02", title: "Boundaries Are Power", desc: "Your feelings and needs are important. Recognizing them and honoring them isn't selfish — it's the foundation of every healthy relationship and successful career." },
              { num: "03", title: "Failure Is a Process", desc: "My mother taught me how to fail — and how to get back up. Rarely do we do things perfectly, especially when we're learning. That's called beginner's mind." },
              { num: "04", title: "Your Voice Matters", desc: "Nice Girl Syndrome kept me silent for years. The moment I found my voice — in my marriage, my company, my life — everything shifted." },
              { num: "05", title: "Women Hold the World Together", desc: "We've been creating SOPs, managing budgets, leading teams, and running operations since forever. We deserve models that honor how we actually live." },
              { num: "06", title: "Someone's Going to Do It", desc: "Why not you? That question has been the engine behind every company I've started, every risk I've taken, and every time I chose courage over comfort." },
            ].map((belief, i) => (
              <FadeIn key={belief.title} delay={i * 80} y={30}>
                <div
                  className="p-8 h-full transition-all duration-300 hover:-translate-y-1 relative"
                  style={{ background: "#0a0a0a", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
                >
                  <span className="font-serif text-4xl italic absolute top-6 right-8" style={{ color: "rgba(201,169,110,0.08)" }}>{belief.num}</span>
                  <h4 className="font-serif text-xl font-bold text-foreground mb-3">{belief.title}</h4>
                  <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">{belief.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MY MOTHER'S DAUGHTER — Editorial split ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#faf8f5" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image column */}
            <div className="lg:col-span-5">
              <FadeIn y={30}>
                <div className="editorial-img" style={{ borderRadius: "20px", overflow: "hidden" }}>
                  <img
                    src="/aimee-casual-bw.jpg"
                    alt="Aimee Rickabus"
                    className="w-full object-cover"
                    style={{ aspectRatio: "3 / 4" }}
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            </div>

            {/* Text column */}
            <div className="lg:col-span-7 lg:pl-4">
              <TextReveal>
                <p
                  className="font-sans text-[10px] uppercase tracking-[0.3em] mb-6"
                  style={{ color: "#c9a96e" }}
                >
                  My Mother's Daughter
                </p>
              </TextReveal>
              <FadeIn delay={150} y={20}>
                <blockquote
                  className="relative font-serif text-2xl md:text-3xl italic leading-[1.4] mb-10 pl-6"
                  style={{
                    color: "#1a1a1a",
                    borderLeft: "3px solid #eb1887",
                  }}
                >
                  "My mother was a masterclass in perseverance. She
                  demonstrated, time and again, how to never give up. Through
                  her, I learned: failure is an option, but it's not the end of
                  the road."
                </blockquote>
              </FadeIn>
              <FadeIn delay={300} y={20}>
                <p
                  className="font-sans text-[15px] leading-[1.9]"
                  style={{ color: "#666" }}
                >
                  I was raised to fail well — to get back up, try something
                  else, and see every challenge as an adventure. In yoga, we
                  call it beginner's mind. A mindset of openness, curiosity,
                  and freedom from preconceived notions. I've carried it into
                  every company I've built, every birth I've breathed through,
                  and every Monday morning I've shown up for.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FUN FACTS — Personality section ═══════ */}
      <section className="py-20 px-6" style={{ background: "#faf8f5" }}>
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h3 className="font-serif text-2xl md:text-3xl text-center mb-12" style={{ color: "#1a1a1a" }}>
              A few things that make <em className="text-brand-pink italic">me</em>, me
            </h3>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { emoji: "⚾", text: "Baseball mom energy, every single weekend" },
              { emoji: "🧘", text: "Lifelong yoga practitioner — it saved me more than once" },
              { emoji: "🏠", text: "Fell in love with flipping 1920s houses at 22" },
              { emoji: "🎬", text: "Chose film school over law school on orientation day" },
              { emoji: "🤰", text: "Five home births. One was 11 pounds. Yes, really." },
              { emoji: "🎵", text: "Danced through labor to reggae music" },
              { emoji: "🛒", text: "CEO who still remembers the Trader Joe's list" },
              { emoji: "💰", text: "Parents nicknamed me 'Bank of Aimee' at age nine" },
            ].map((fact, i) => (
              <FadeIn key={fact.text} delay={i * 60} y={15}>
                <div
                  className="p-6 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="text-3xl mb-3">{fact.emoji}</div>
                  <p className="font-sans text-[13px] leading-relaxed" style={{ color: "#666" }}>{fact.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PULL QUOTE ═══════ */}
      <section
        className="py-24 md:py-32 px-6 relative overflow-hidden"
        style={{ background: "#0a0a0a", borderTop: "1px solid rgba(235,24,135,0.1)", borderBottom: "1px solid rgba(235,24,135,0.1)" }}
      >
        <div className="absolute top-8 left-8 pointer-events-none select-none">
          <span className="font-serif text-[18rem] leading-none" style={{ color: "rgba(235,24,135,0.03)" }}>"</span>
        </div>
        <FadeIn>
          <blockquote className="max-w-4xl mx-auto text-center relative z-10">
            <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground leading-[1.2] italic">
              "You are more powerful than any job title has <span className="text-brand-pink not-italic font-bold">ever named</span>. It's time to claim that power — gracefully, unapologetically, together."
            </p>
            <footer className="font-sans text-[10px] uppercase tracking-[0.3em] mt-8" style={{ color: "#888" }}>— Aimee Rickabus</footer>
          </blockquote>
        </FadeIn>
      </section>

      {/* ═══════ EXPLORE MORE — Cross-links ═══════ */}
      <section className="py-20 px-6" style={{ background: "#111" }}>
        <div className="max-w-[1200px] mx-auto">
          <TextReveal>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Go deeper with The Manage Her<span style={{ fontSize: ".45em", verticalAlign: "super", fontStyle: "normal" }}>®</span>
            </h2>
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "The Podcast", desc: "Weekly conversations about leadership, money, motherhood, and the invisible work that runs the world.", link: "/podcast", cta: "Start Listening" },
              { title: "The Book", desc: "The book that names what millions of women feel but can't articulate. Available in paperback, Kindle, and Audible.", link: "/book", cta: "Get Your Copy" },
              { title: "Press & Speaking", desc: "Book Aimee for your next keynote, conference, or media feature. Five signature topics that move audiences.", link: "/press", cta: "Book Aimee" },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 100} y={20}>
                <Link
                  to={card.link}
                  className="block p-8 h-full group transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#0a0a0a", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(235,24,135,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
                >
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

export default About;
