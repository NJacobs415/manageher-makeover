import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BOOK_COVER = "https://assets.cdn.filesafe.space/JzYUXEAehZEve2vuOdqM/media/69a0c0f9fd70df1d0b3f31f3.jpg";

const Book = () => (
  <div className="overflow-x-hidden">
    <Navbar />

    {/* Hero — Amy-style clean layout */}
    <section className="bg-brand-ice py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="flex justify-center order-2 lg:order-1">
          <div className="book-3d opacity-0 animate-scale-in">
            <div className="book-3d-inner overflow-hidden">
              <img src={BOOK_COVER} alt="The Manage Her™ Book" className="w-56 md:w-64 lg:w-72" loading="eager" />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4 animate-fade-in">The Book</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-pink leading-[1.1] mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            Unveiling Invisible Labor & Sparking a Leadership Revolution
          </h1>
          <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
            The book that names what millions of women feel but can't articulate. From invisible labor to identity reclamation, this is the blueprint for women who are done shrinking and ready to lead.
          </p>
          <div className="flex flex-wrap gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
            <Button className="bg-brand-gold hover:bg-brand-gold/90 text-foreground px-7 h-11 font-sans text-sm font-bold uppercase tracking-[0.08em]" asChild>
              <a href="https://a.co/d/by5X0fV" target="_blank" rel="noopener noreferrer">Order on Amazon →</a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* What's Inside — clean accordion */}
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-pink text-center mb-12">
            What's Inside
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <Accordion type="single" collapsible className="space-y-2.5">
            {[
              { title: "The Invisible Load", preview: "Why the rules weren't written for us — and why naming the invisible labor is the first step to reclaiming your power." },
              { title: "Managing Your Money", preview: "The financial literacy crash course every woman needs. Wealth building, investing, pay equity — no jargon, just clarity." },
              { title: "Leading Without Permission", preview: "How to step into leadership roles before anyone offers them to you. You don't need a title to lead." },
              { title: "The Art of Boundaries", preview: "Setting boundaries that protect your energy, time, and ambition without the guilt trip." },
              { title: "Building Your Board", preview: "Curating the inner circle that will challenge, support, and elevate you — your personal board of directors." },
              { title: "Own Your Narrative", preview: "Taking control of your story — in the boardroom, online, and in your own mind." },
            ].map((ch, i) => (
              <AccordionItem key={i} value={`ch-${i}`} className="bg-card px-5 border border-border">
                <AccordionTrigger className="font-serif text-lg hover:no-underline py-4 hover:text-brand-pink transition-colors text-brand-navy">
                  {ch.title}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-[15px] text-muted-foreground pb-4 leading-relaxed">
                  {ch.preview}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>

    {/* Who it's for */}
    <section className="py-20 md:py-28 px-6 bg-brand-ice">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-pink text-center mb-14">
            This book is for you if…
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { title: "The Corporate Climber", desc: "You're ambitious, driven, and tired of playing by rules that weren't made for you." },
            { title: "The Working Mom", desc: "You're managing everything and ready to stop surviving and start thriving on your terms." },
            { title: "The Entrepreneur", desc: "You're building something from scratch and need the real talk, not the highlight reel." },
            { title: "The Next-Gen Leader", desc: "You're early in your career and want the playbook that took others decades to learn." },
          ].map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 100}>
              <div className="bg-background p-7 shadow-sm hover:shadow-md transition-all group h-full border border-border">
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-pink transition-colors">{p.title}</h3>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-pink text-center mb-14">
            What readers are saying
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { text: "I listened to the first episode on my commute and pulled over because I was crying. She put words to something I've felt for years.", author: "Sarah M." },
            { text: "Finally someone who doesn't just tell women to 'lean in' — Aimee validates what we're already doing and shows us how to own it.", author: "Jessica R." },
            { text: "Aimee speaks with the authority of a CEO and the heart of a mom who gets it. Every working mother needs this.", author: "Lauren T." },
          ].map((r, i) => (
            <ScrollReveal key={r.author} delay={i * 120}>
              <div className="bg-card p-6 shadow-sm h-full flex flex-col border border-border">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} className="text-brand-gold fill-brand-gold" />)}
                </div>
                <p className="font-serif text-[15px] italic text-brand-navy/80 leading-relaxed flex-1 mb-4">"{r.text}"</p>
                <p className="font-sans text-sm font-bold text-brand-navy">— {r.author}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={400}>
          <div className="text-center mt-12">
            <Button className="bg-brand-gold hover:bg-brand-gold/90 text-foreground px-8 h-12 font-sans text-sm font-bold uppercase tracking-[0.08em]" asChild>
              <a href="https://a.co/d/by5X0fV" target="_blank" rel="noopener noreferrer">Order Your Copy →</a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
  </div>
);

export default Book;
