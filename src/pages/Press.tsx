import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Magnetic from "@/components/animations/Magnetic";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { ArrowRight, Download, Mail, Phone, Check, Copy, Users, Award, Mic, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Press = () => {
  const [copiedBio, setCopiedBio] = useState<string | null>(null);

  const copyBio = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedBio(label);
      setTimeout(() => setCopiedBio(null), 2000);
    });
  };

  const shortBio = `Aimee Rickabus is the CEO of a nine-figure technology company serving Fortune 500 clients including PepsiCo and Ford, a bestselling author, host of The Manage Her® Podcast, and a mother of six. A serial entrepreneur since age 22, she is the recipient of the NAWBO Orange County Remarkable Woman Award for Innovation and a WBENC-certified business leader. Her book, "The Manage Her: Unveiling Invisible Labor & Sparking a Leadership Revolution," puts words to what millions of women feel but can't articulate — and gives them permission to own it.`;

  const fullBio = `Aimee Rickabus is a serial entrepreneur, bestselling author, podcast host, and mother of six who has spent two decades proving that motherhood and leadership aren't separate pursuits — they're the same skill set.

As CEO of Tomahawk Information Solutions, Aimee leads a nine-figure technology company serving Fortune 500 clients including PepsiCo, Ford, and major insurance and oil & gas enterprises. She co-founded the company with her husband in 2014 after selling her car to fund their first tech venture — and has since grown it into a nationally recognized WBENC-certified women-owned business.

Before tech, Aimee built and sold companies in real estate, film production, and prenatal nutrition — starting her first company at age 22 when she purchased and restored a 1920s duplex in Orange County. She holds a Master's degree from Chapman University's Dodge College of Film and Media Arts.

Aimee is the author of "The Manage Her: Unveiling Invisible Labor & Sparking a Leadership Revolution" and host of The Manage Her® Podcast, where she leads weekly conversations about leadership, financial literacy, entrepreneurship, and the invisible work that runs the world. Her second book, "Unlocking Human Potential," releases May 2026.

She is the recipient of the NAWBO Orange County Remarkable Woman Award for Innovation, a PepsiCo "Voice of the Vendor" panelist, and has been listed in Marquis Who's Who. She serves on the Board of Directors of Children's Health Defense.

Aimee lives in Southern California with her husband Brenden, their six children — Julian, Gabriel, Daniel, Indy, Paul, and their youngest — and an entrepreneurial spirit inherited from her mother, who won the Ernst & Young Entrepreneur of the Year Award in 1988.

For speaking inquiries, media appearances, and brand partnerships: info@themanageher.com | (310) 365-6368`;

  return (
    <div className="overflow-x-hidden page-enter">
      <Navbar />

      {/* ═══════ HERO — Speaker photo + credentials ═══════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(201,169,110,0.06) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(235,24,135,0.04) 0%, transparent 50%)" }} />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            <div className="lg:col-span-7 py-20 lg:py-0 lg:pr-16">
              <TextReveal>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3" style={{ color: "#c9a96e" }}>
                  <span style={{ width: "30px", height: "1px", background: "#c9a96e", display: "inline-block" }} />
                  Press & Speaking
                </p>
              </TextReveal>
              <TextReveal delay={200}>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[1.05] mb-6">
                  Book Aimee
                  <br />to <em className="text-brand-pink italic">Speak</em>.
                </h1>
              </TextReveal>
              <FadeIn delay={500} y={20}>
                <p className="font-serif text-xl md:text-2xl italic text-foreground leading-snug mb-8 pl-5" style={{ borderLeft: "2px solid #eb1887" }}>
                  Women aren't aspiring leaders.
                  <br />We're <em className="text-brand-pink">already leading</em>.
                </p>
              </FadeIn>
              <FadeIn delay={700} y={20}>
                <div className="flex flex-wrap gap-4 mb-10">
                  <Magnetic strength={0.2}>
                    <a href="#booking" className="btn-glow inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 transition-all"
                      style={{ background: "linear-gradient(135deg, #c9a96e, #dfc08a)", color: "#0a0a0a", borderRadius: "50px", boxShadow: "0 4px 24px rgba(201,169,110,0.3)" }}>
                      Request Aimee for Your Event
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a href="#media-kit" className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all"
                      style={{ borderRadius: "50px" }}>
                      <Download size={14} /> Media Kit
                    </a>
                  </Magnetic>
                </div>
              </FadeIn>
              <FadeIn delay={900} y={20}>
                <div className="flex gap-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {[
                    { val: 9, suffix: "-Figure", label: "Company" },
                    { val: 6, suffix: "", label: "Children" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-serif text-2xl font-bold text-foreground">
                        <AnimatedCounter target={s.val} suffix={s.suffix} />
                      </p>
                      <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                  <div>
                    <p className="font-serif text-2xl font-bold" style={{ color: "#c9a96e" }}>Fortune 500</p>
                    <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Clients Served</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold" style={{ color: "#c9a96e" }}>NAWBO ★</p>
                    <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Remarkable Woman</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Speaker photo */}
            <div className="lg:col-span-5 relative h-full min-h-[500px] lg:min-h-[85vh]">
              <div className="absolute inset-0 overflow-hidden">
                <img src="/aimee-professional-1.jpg" alt="Aimee Rickabus — Keynote Speaker" className="w-full h-full object-cover" style={{ objectPosition: "center top" }} loading="eager" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0a0a0a 0%, transparent 25%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0a0a 0%, transparent 15%)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SIGNATURE KEYNOTES — Dark ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="max-w-[1200px] mx-auto">
          <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">Signature Keynotes</p></TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-6">
              Aimee's Signature <em className="text-brand-pink italic">Speaking Themes</em>
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p className="text-center mb-16 max-w-[600px] mx-auto" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#888", fontSize: "1.1rem" }}>
              Every talk is customized to your audience. These are the core messages Aimee brings to stages nationwide.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "Invisible Labor → Visible Leadership", desc: "Revealing how home-management skills translate directly to executive influence. The boardroom skills women practice at the kitchen table.", tags: ["Women's Conferences", "Corporate"] },
              { num: "02", title: "Women, Money & The Power of Self-Trust", desc: "What happens when women believe they can own wealth, not just manage it. Financial confidence starts with identity — not spreadsheets.", tags: ["Financial Literacy", "Entrepreneurship"] },
              { num: "03", title: "Burnout-Proofing Women Leaders", desc: "Leadership that honors the emotional, physical, and professional realities of modern womanhood. Sustainability, not sacrifice.", tags: ["Wellness", "HR & Culture"] },
              { num: "04", title: "Leading from the Homefront", desc: "Stories and strategies for mothers who balance high-level leadership with being fully present for their families.", tags: ["Motherhood", "Community"] },
            ].map((theme, i) => (
              <FadeIn key={theme.num} delay={i * 100} y={30}>
                <div className="p-8 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}>
                  <span className="font-serif text-4xl italic block mb-4" style={{ color: "rgba(201,169,110,0.15)" }}>{theme.num}</span>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">{theme.title}</h3>
                  <p className="font-sans text-[14px] text-muted-foreground leading-relaxed mb-4">{theme.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {theme.tags.map((tag) => (
                      <span key={tag} className="font-sans text-[10px] uppercase tracking-[0.1em] px-3 py-1" style={{ background: "rgba(201,169,110,0.08)", color: "#c9a96e", borderRadius: "50px", border: "1px solid rgba(201,169,110,0.12)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
            {/* Wide keynote */}
            <FadeIn delay={500} y={30} className="md:col-span-2">
              <div className="p-8 transition-all duration-300 hover:-translate-y-1"
                style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", borderTop: "2px solid #c9a96e" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderTopColor = "#c9a96e"; }}>
                <span className="font-serif text-4xl italic block mb-4" style={{ color: "rgba(201,169,110,0.15)" }}>05</span>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">Revolutionizing Workplace Culture</h3>
                <p className="font-sans text-[14px] text-muted-foreground leading-relaxed mb-4">How organizations can recognize and reward the full leadership capacity of women — from the C-suite to the carpool lane. A wake-up call that transforms company culture from the inside out.</p>
                <div className="flex flex-wrap gap-2">
                  {["Corporate Keynote", "DEI", "Leadership Summit"].map((tag) => (
                    <span key={tag} className="font-sans text-[10px] uppercase tracking-[0.1em] px-3 py-1" style={{ background: "rgba(201,169,110,0.08)", color: "#c9a96e", borderRadius: "50px", border: "1px solid rgba(201,169,110,0.12)" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ WHY EVENT PLANNERS LOVE AIMEE — Warm cream ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#faf8f5" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "#c9a96e" }}>For Event Planners</p></TextReveal>
              <TextReveal delay={100}>
                <h2 className="font-serif text-3xl md:text-4xl font-bold leading-[1.15] mb-6" style={{ color: "#1a1a1a" }}>
                  Why planners <em className="text-brand-pink italic">love</em> working with Aimee
                </h2>
              </TextReveal>
              <FadeIn delay={300} y={20}>
                <p className="font-sans text-[15px] leading-[1.9] mb-8" style={{ color: "#666" }}>
                  Aimee illuminates the hidden leadership women practice every day, bringing humor, strategy, and lived wisdom to stages and corporate events nationwide. Her message reshapes the way companies and communities talk about women's leadership.
                </p>
              </FadeIn>
              <FadeIn delay={400} y={20}>
                <div className="flex flex-wrap gap-2">
                  {["CEOs & Founders", "Corporate Leaders", "Military Spouses", "Working Mothers", "Homeschooling Families", "Women Returning to Work"].map((tag) => (
                    <span key={tag} className="font-sans text-[11px] font-medium px-4 py-2" style={{ background: "rgba(235,24,135,0.06)", color: "#eb1887", borderRadius: "50px", border: "1px solid rgba(235,24,135,0.1)" }}>{tag}</span>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={300} y={30}>
              <div className="p-8" style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <h3 className="font-serif text-xl font-bold mb-6" style={{ color: "#1a1a1a" }}>The Aimee Advantage</h3>
                <div className="space-y-4">
                  {[
                    "High-energy, relatable speaker with national credibility",
                    "Customizable topics for corporate, community, and conference audiences",
                    "Equally impactful for large summits and intimate events",
                    "Professional, prepared, and delightful to collaborate with",
                    "Speaks from real experience as a nine-figure CEO and mother of six",
                    "Pre-event consultation and post-event audience resources included",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "linear-gradient(135deg, #c9a96e, #dfc08a)", borderRadius: "8px" }}>
                        <Check size={14} style={{ color: "#0a0a0a" }} />
                      </div>
                      <p className="font-sans text-[14px] leading-relaxed" style={{ color: "#666" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ COPY-READY BIOS — Dark ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(235,24,135,0.08)" }}>
        <div className="max-w-[900px] mx-auto">
          <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">Speaker Bios</p></TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-16">
              Copy-ready <em className="text-brand-pink italic">bios</em>
            </h2>
          </TextReveal>

          {/* Short bio */}
          <FadeIn delay={200} y={30}>
            <div className="p-8 mb-6" style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", borderTop: "2px solid #eb1887" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1" style={{ background: "rgba(235,24,135,0.08)", color: "#eb1887", borderRadius: "50px" }}>Short Bio</span>
                <button onClick={() => copyBio(shortBio, "short")} className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-brand-pink transition-colors cursor-pointer" style={{ background: "none", border: "none" }}>
                  {copiedBio === "short" ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy to Clipboard</>}
                </button>
              </div>
              <p className="font-sans text-[14px] text-muted-foreground leading-[1.9]">{shortBio}</p>
            </div>
          </FadeIn>

          {/* Full bio */}
          <FadeIn delay={300} y={30}>
            <div className="p-8" style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", borderTop: "2px solid #c9a96e" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1" style={{ background: "rgba(201,169,110,0.08)", color: "#c9a96e", borderRadius: "50px" }}>Full Bio</span>
                <button onClick={() => copyBio(fullBio, "full")} className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-brand-pink transition-colors cursor-pointer" style={{ background: "none", border: "none" }}>
                  {copiedBio === "full" ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy to Clipboard</>}
                </button>
              </div>
              <div className="font-sans text-[14px] text-muted-foreground leading-[1.9] whitespace-pre-line">{fullBio}</div>
            </div>
          </FadeIn>

          <FadeIn delay={400} y={20}>
            <p className="text-center mt-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#888", fontSize: "1rem" }}>
              Need a custom length? Email us and we'll tailor it to your needs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ MEDIA KIT — Warm cream ═══════ */}
      <section id="media-kit" className="py-24 md:py-36 px-6" style={{ background: "#f5f0eb" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="p-10 md:p-14" style={{ background: "#fff", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
                    Download Aimee's <em className="text-brand-pink italic">Media Kit</em>
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed mb-6" style={{ color: "#888" }}>
                    Everything you need to feature, introduce, or promote Aimee — from approved bios and headshots to brand guidelines and speaking topics.
                  </p>
                  <h4 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#c9a96e" }}>What's Included</h4>
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {["Short & Full Bios", "High-Res Headshots", "Brand Logos", "Speaking Topics", "Book Cover Assets", "Social Media Links", "Fun Facts & Stats", "Contact Info"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check size={12} style={{ color: "#c9a96e" }} />
                        <span className="font-sans text-[12px]" style={{ color: "#666" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href="/TheManageHerMediaKit2026.pdf" target="_blank" className="btn-glow inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-3 transition-all"
                      style={{ background: "linear-gradient(135deg, #c9a96e, #dfc08a)", color: "#0a0a0a", borderRadius: "50px" }}>
                      <Download size={14} /> Download PDF
                    </a>
                    <a href="mailto:info@themanageher.com?subject=Media%20Inquiry" className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-3 transition-all"
                      style={{ border: "1px solid rgba(0,0,0,0.15)", borderRadius: "50px", color: "#666" }}>
                      <Mail size={14} /> Media Inquiry
                    </a>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <div className="relative">
                    {/* Stacked pages illustration */}
                    {[2, 1, 0].map((i) => (
                      <div key={i} className="w-48 h-64 absolute" style={{
                        background: "#faf8f5",
                        borderRadius: "12px",
                        border: "1px solid rgba(0,0,0,0.08)",
                        transform: `rotate(${i * 3 - 3}deg) translateX(${i * 4}px)`,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                        zIndex: 3 - i,
                      }} />
                    ))}
                    <div className="w-48 h-64 relative z-10 flex flex-col items-center justify-center" style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
                      <img src="/M_Logo_Pink.png" alt="" style={{ height: "40px", width: "auto", mixBlendMode: "multiply", marginBottom: "12px" }} />
                      <p className="font-serif text-sm font-bold" style={{ color: "#1a1a1a" }}>Media Kit</p>
                      <p className="font-sans text-[9px] uppercase tracking-[0.15em]" style={{ color: "#bbb" }}>2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ AUDIENCE TAKEAWAYS — Dark ═══════ */}
      <section className="py-24 md:py-36 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(235,24,135,0.08)" }}>
        <div className="max-w-[1200px] mx-auto">
          <TextReveal><p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4 text-center">What Your Audience Gets</p></TextReveal>
          <TextReveal delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-16">
              Every audience leaves <em className="text-brand-pink italic">transformed</em>
            </h2>
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Immediate Recognition", desc: "Audience members finally see their invisible work as leadership — and leave with language to own it." },
              { icon: Award, title: "Actionable Frameworks", desc: "Not just inspiration — real tools for boundaries, financial confidence, and burnout-proof leadership." },
              { icon: Mic, title: "Standing Ovation Energy", desc: "Aimee brings humor, vulnerability, and CEO-level authority to every stage. Audiences don't just listen — they feel it." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 120} y={30}>
                <div className="p-8 h-full text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(235,24,135,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}>
                  <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #eb1887, #ff4da6)", borderRadius: "16px", boxShadow: "0 8px 24px rgba(235,24,135,0.2)" }}>
                    <item.icon size={24} style={{ color: "#fff" }} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-foreground mb-3">{item.title}</h4>
                  <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ BOOKING CTA — Dark with gold accents ═══════ */}
      <section id="booking" className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.04), rgba(235,24,135,0.03))" }} />
        <div className="max-w-[700px] mx-auto text-center relative z-10">
          <TextReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Let's create something <em style={{ color: "#c9a96e", fontStyle: "italic" }}>powerful</em> together
            </h2>
          </TextReveal>
          <FadeIn delay={200} y={20}>
            <p className="mb-8" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#888", fontSize: "1.15rem", lineHeight: "1.8" }}>
              Ready to book Aimee for your next event? Tell us about your audience and your goals — and we'll make something unforgettable happen.
            </p>
          </FadeIn>
          <FadeIn delay={300} y={20}>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <a href="mailto:info@themanageher.com" className="flex items-center gap-2 font-sans text-[14px] transition-colors hover:text-brand-pink" style={{ color: "#c9a96e" }}>
                <Mail size={16} /> info@themanageher.com
              </a>
              <a href="tel:+13103656368" className="flex items-center gap-2 font-sans text-[14px] transition-colors hover:text-brand-pink" style={{ color: "#c9a96e" }}>
                <Phone size={16} /> (310) 365-6368
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={400} y={20}>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic strength={0.2}>
                <a href="mailto:info@themanageher.com?subject=Speaking%20Inquiry" className="btn-glow inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 transition-all"
                  style={{ background: "linear-gradient(135deg, #c9a96e, #dfc08a)", color: "#0a0a0a", borderRadius: "50px", boxShadow: "0 4px 24px rgba(201,169,110,0.3)" }}>
                  Request Aimee for Your Event <ArrowRight size={14} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="#media-kit" className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all"
                  style={{ borderRadius: "50px" }}>
                  <Download size={14} /> Download Media Kit
                </a>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ EXPLORE MORE ═══════ */}
      <section className="py-20 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1200px] mx-auto">
          <TextReveal>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Explore The Manage Her<span style={{ fontSize: ".45em", verticalAlign: "super", fontStyle: "normal" }}>®</span>
            </h2>
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "The Podcast", desc: "Weekly conversations about leadership, money, motherhood, and the invisible work that runs the world.", link: "/podcast", cta: "Start Listening" },
              { title: "The Book", desc: "The bestselling book that names what millions of women feel but can't articulate.", link: "/book", cta: "Get Your Copy" },
              { title: "About Aimee", desc: "CEO. Author. Mother of six. Serial entrepreneur since 22. The full story.", link: "/about", cta: "Read Her Story" },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 100} y={20}>
                <Link to={card.link} className="block p-8 h-full group transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}
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

export default Press;
