import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const chapters = [
  { title: "Chapter 1: The Wake-Up Call", preview: "Why the rules weren't written for us — and why that's actually our greatest advantage." },
  { title: "Chapter 2: Managing Your Money", preview: "The financial literacy crash course every woman needs but no one taught us in school." },
  { title: "Chapter 3: Leading Without Permission", preview: "How to step into leadership roles before anyone offers them to you." },
  { title: "Chapter 4: The Art of Saying No", preview: "Setting boundaries that protect your energy, time, and ambition." },
  { title: "Chapter 5: Building Your Board", preview: "Curating the inner circle that will challenge, support, and elevate you." },
  { title: "Chapter 6: Own Your Narrative", preview: "Taking control of your story — in the boardroom, online, and in your own mind." },
];

const reviews = [
  { text: "This book is the mentor I wish I had 10 years ago. Aimee's honesty and strategy are the perfect combination.", author: "Christina M." },
  { text: "I highlighted almost every page. This isn't just a book — it's a blueprint for building the life you deserve.", author: "Priya S." },
  { text: "Raw, real, and actionable. Aimee doesn't sugarcoat anything, and that's exactly what we need right now.", author: "Lauren T." },
];

const Book = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 section-padding" style={{ background: "linear-gradient(180deg, hsl(340 40% 95%), hsl(270 30% 94%), hsl(35 50% 96%))" }}>
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <div className="book-3d">
                <div className="book-3d-inner w-64 md:w-72 aspect-[2/3] bg-gradient-to-br from-brand-pink/90 to-brand-hot-pink rounded-lg shadow-2xl flex flex-col items-center justify-center p-8 text-primary-foreground opacity-0 animate-scale-in">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] opacity-80 mb-4">A Book by</p>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-center leading-tight mb-4">
                    THE<br /><em>MANAGE</em><br />HER
                  </h2>
                  <div className="w-14 h-px bg-primary-foreground/40 my-3" />
                  <p className="font-sans text-sm opacity-80">Aimee Rickabus</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand-gold font-medium mb-4 animate-fade-in">
                Now Available
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 opacity-0 animate-fade-in-up">
                Your blueprint for <em className="text-brand-pink">unapologetic success.</em>
              </h1>
              <p className="font-sans text-lg text-brand-warm-gray leading-relaxed mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                Part memoir, part manifesto — this is the guide for women who are ready to stop 
                managing everyone else's expectations and start managing their own legacy.
              </p>
              <div className="flex items-center gap-2 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-brand-gold fill-brand-gold" />
                ))}
                <span className="font-sans text-sm text-muted-foreground ml-2">200+ five-star reviews</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <Button className="bg-brand-navy hover:bg-brand-navy/90 text-primary-foreground rounded-full px-8 py-6 font-sans text-sm shadow-lg">
                  Order on Amazon →
                </Button>
                <Button variant="outline" className="border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5 rounded-full px-8 py-6 font-sans text-sm">
                  Barnes & Noble
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Preview */}
      <section className="section-padding bg-card">
        <div className="editorial-container max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Inside the <em className="text-brand-pink">book</em>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Accordion type="single" collapsible className="space-y-3">
              {chapters.map((ch, i) => (
                <AccordionItem key={i} value={`ch-${i}`} className="bg-background rounded-xl px-6 border border-border">
                  <AccordionTrigger className="font-serif text-lg hover:no-underline py-5 hover:text-brand-pink">
                    {ch.title}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-brand-warm-gray pb-5 leading-relaxed">
                    {ch.preview}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(35 50% 96%), hsl(340 40% 96%))" }}>
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                This book is for <em className="text-brand-pink">you</em> if…
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "The Corporate Climber", description: "You're ambitious, driven, and tired of playing by rules that weren't made for you." },
              { title: "The Entrepreneur", description: "You're building something from scratch and need the real talk, not the highlight reel." },
              { title: "The Working Mom", description: "You're managing everything and ready to stop surviving and start thriving." },
              { title: "The Next-Gen Leader", description: "You're early in your career and want the playbook that took others decades to learn." },
            ].map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 100}>
                <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-brand-pink transition-colors">{p.title}</h3>
                  <p className="font-sans text-brand-warm-gray leading-relaxed">{p.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-card">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                What readers are <em className="text-brand-pink">saying</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reviews.map((r, i) => (
              <ScrollReveal key={r.author} delay={i * 150}>
                <div className="bg-background rounded-2xl p-8 shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <p className="font-serif text-lg italic leading-relaxed mb-6 text-brand-navy/80">"{r.text}"</p>
                  <p className="font-sans text-sm text-muted-foreground">— {r.author}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-16">
              <Button className="bg-brand-navy hover:bg-brand-navy/90 text-primary-foreground rounded-full px-10 py-6 font-sans text-sm shadow-lg">
                Get Your Copy Today →
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;
