import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/animations/CursorFollower";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Magnetic from "@/components/animations/Magnetic";
import { Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BOOK_COVER = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df1d0b3f31f3.jpg";

const Book = () => (
  <div className="overflow-x-hidden page-enter">
    <CursorFollower />
    <Navbar />

    {/* Hero — cinematic */}
    <section className="py-24 md:py-36 px-6 bg-brand-cream relative overflow-hidden">
      <span className="editorial-number text-[18vw] absolute -bottom-[5vw] right-[-2vw] select-none pointer-events-none">Book</span>
      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeIn scale={0.9} className="flex justify-center order-2 lg:order-1">
          <div className="book-3d">
            <div className="book-3d-inner overflow-hidden">
              <img src={BOOK_COVER} alt="The Manage Her™ Book" className="w-56 md:w-64 lg:w-72" loading="eager" />
            </div>
          </div>
        </FadeIn>

        <div className="order-1 lg:order-2">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-4">The Book</p>
          </TextReveal>
          <TextReveal delay={150}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] mb-6">
              Unveiling invisible labor & sparking a <em className="text-brand-pink italic">revolution.</em>
            </h1>
          </TextReveal>
          <FadeIn delay={400} y={20}>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-8">
              The book that names what millions of women feel but can't articulate. From invisible labor to identity reclamation — the blueprint for women ready to lead.
            </p>
          </FadeIn>
          <FadeIn delay={500} y={20}>
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
          </FadeIn>
        </div>
      </div>
    </section>

    {/* What's Inside */}
    <section className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <TextReveal>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center mb-16">
            What's <em className="text-brand-pink italic">inside.</em>
          </h2>
        </TextReveal>

        <FadeIn delay={200} y={30}>
          <Accordion type="single" collapsible className="space-y-px">
            {[
              { title: "The Invisible Load", preview: "Why the rules weren't written for us — and why naming the invisible labor is the first step to reclaiming your power." },
              { title: "Managing Your Money", preview: "The financial literacy crash course every woman needs. Wealth building, investing, pay equity — no jargon." },
              { title: "Leading Without Permission", preview: "How to step into leadership roles before anyone offers them to you." },
              { title: "The Art of Boundaries", preview: "Setting boundaries that protect your energy, time, and ambition without the guilt trip." },
              { title: "Building Your Board", preview: "Curating the inner circle that will challenge, support, and elevate you." },
              { title: "Own Your Narrative", preview: "Taking control of your story — in the boardroom, online, and in your own mind." },
            ].map((ch, i) => (
              <AccordionItem key={i} value={`ch-${i}`} className="border-b border-border px-0">
                <AccordionTrigger className="font-serif text-xl hover:no-underline py-6 hover:text-brand-pink transition-colors text-foreground font-bold">
                  <span className="flex items-center gap-4">
                    <span className="font-serif text-sm italic text-brand-pink/30">{String(i + 1).padStart(2, "0")}</span>
                    {ch.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="font-sans text-[14px] text-muted-foreground pb-6 leading-relaxed pl-10">
                  {ch.preview}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>

    {/* Who it's for */}
    <section className="py-24 md:py-36 px-6 bg-brand-cream">
      <div className="max-w-5xl mx-auto">
        <TextReveal>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center mb-20">
            This book is for <em className="text-brand-pink italic">you</em> if…
          </h2>
        </TextReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { title: "The Corporate Climber", desc: "You're ambitious, driven, and tired of playing by rules that weren't made for you." },
            { title: "The Working Mom", desc: "You're managing everything and ready to stop surviving and start thriving." },
            { title: "The Entrepreneur", desc: "You're building something from scratch and need the real talk, not the highlight reel." },
            { title: "The Next-Gen Leader", desc: "You want the playbook that took others decades to learn." },
          ].map((p, i) => (
            <FadeIn key={p.title} delay={i * 100} y={30}>
              <div className="bg-background p-10 group hover:bg-foreground transition-colors duration-500 h-full">
                <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-background transition-colors mb-4">{p.title}</h3>
                <p className="font-sans text-[14px] text-muted-foreground group-hover:text-background/60 transition-colors leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <TextReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
            What readers are <em className="text-brand-pink italic">saying.</em>
          </h2>
        </TextReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            { text: "She put words to something I've felt for years but couldn't name.", author: "Sarah M." },
            { text: "Finally someone who validates what we're already doing and shows us how to own it.", author: "Jessica R." },
            { text: "The authority of a CEO and the heart of a mom who gets it.", author: "Lauren T." },
          ].map((r, i) => (
            <FadeIn key={r.author} delay={i * 120} y={30}>
              <div className="bg-background p-8 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} className="text-brand-gold fill-brand-gold" />)}
                </div>
                <p className="font-serif text-[15px] italic text-foreground/70 leading-relaxed flex-1 mb-6">"{r.text}"</p>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground">— {r.author}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={400} y={20}>
          <div className="text-center mt-16">
            <Magnetic strength={0.2}>
              <a
                href="https://a.co/d/by5X0fV"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-10 py-4 hover:bg-brand-pink/90 transition-colors"
              >
                Order Your Copy
              </a>
            </Magnetic>
          </div>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </div>
);

export default Book;
