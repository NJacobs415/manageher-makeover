import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const chapters = [
  { title: "Chapter 1: The Wake-Up Call", preview: "Why the rules weren't written for us — and why that's actually our greatest advantage." },
  { title: "Chapter 2: Managing Your Money", preview: "The financial literacy crash course every woman needs but no one taught us in school." },
  { title: "Chapter 3: Leading Without Permission", preview: "How to step into leadership roles before anyone offers them to you." },
  { title: "Chapter 4: The Art of Saying No", preview: "Setting boundaries that protect your energy, time, and ambition." },
  { title: "Chapter 5: Building Your Board", preview: "Curating the inner circle that will challenge, support, and elevate you." },
  { title: "Chapter 6: Own Your Narrative", preview: "Taking control of your story — in the boardroom, online, and in your own mind." },
];

const personas = [
  { title: "The Corporate Climber", description: "You're ambitious, driven, and tired of playing by rules that weren't made for you." },
  { title: "The Entrepreneur", description: "You're building something from scratch and need the real talk, not the highlight reel." },
  { title: "The Working Mom", description: "You're managing everything and ready to stop surviving and start thriving." },
  { title: "The Next-Gen Leader", description: "You're early in your career and want the playbook that took others decades to learn." },
];

const reviews = [
  { text: "This book is the mentor I wish I had 10 years ago. Aimee's honesty and strategy are the perfect combination.", author: "Christina M.", stars: 5 },
  { text: "I highlighted almost every page. This isn't just a book — it's a blueprint for building the life you deserve.", author: "Priya S.", stars: 5 },
  { text: "Raw, real, and actionable. Aimee doesn't sugarcoat anything, and that's exactly what we need right now.", author: "Lauren T.", stars: 5 },
];

const Book = () => {
  return (
    <div className="bg-brand-dark text-brand-cream overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 section-padding">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Book */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="book-3d">
                <div className="book-3d-inner w-72 md:w-80 aspect-[2/3] bg-gradient-to-br from-brand-gold/30 via-brand-pink/20 to-brand-dark border border-brand-gold/20 shadow-2xl flex flex-col items-center justify-center p-10 animate-glow-pulse">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-6">A Book by</p>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-center leading-tight mb-4">
                    THE<br />
                    <span className="italic text-brand-gold">MANAGE</span>HER
                  </h2>
                  <div className="w-16 h-px bg-brand-gold/40 my-4" />
                  <p className="font-sans text-sm text-brand-cream/60 text-center">Aimee Rickabus</p>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-pink mb-4 animate-fade-in">
                The Book
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 opacity-0 animate-fade-in-up">
                Your Blueprint for <span className="italic text-brand-gold">Unapologetic Success</span>
              </h1>
              <p className="font-sans text-brand-cream/70 leading-relaxed mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                Part memoir, part manifesto — The Manage Her is the definitive guide for women who 
                are ready to stop managing everyone else's expectations and start managing their own legacy.
              </p>
              <div className="flex items-center gap-2 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-brand-gold fill-brand-gold" />
                ))}
                <span className="font-sans text-sm text-brand-cream/50 ml-2">200+ five-star reviews</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark rounded-none px-10 py-6 font-sans uppercase tracking-widest text-xs font-semibold">
                  Order on Amazon →
                </Button>
                <Button variant="outline" className="border-brand-cream/20 text-brand-cream hover:bg-brand-cream/10 rounded-none px-10 py-6 font-sans uppercase tracking-widest text-xs">
                  Barnes & Noble
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Preview */}
      <section className="section-padding">
        <div className="editorial-container max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-4">Inside the Book</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Chapter <span className="italic text-brand-pink">Preview</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Accordion type="single" collapsible className="space-y-3">
              {chapters.map((ch, i) => (
                <AccordionItem
                  key={i}
                  value={`chapter-${i}`}
                  className="border border-brand-cream/10 hover:border-brand-gold/30 transition-colors px-6"
                >
                  <AccordionTrigger className="font-serif text-lg hover:no-underline text-brand-cream hover:text-brand-gold py-5">
                    {ch.title}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-brand-cream/60 pb-5">
                    {ch.preview}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* Who This Book Is For */}
      <section className="section-padding bg-brand-cream text-brand-dark">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-pink mb-4">Who It's For</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                This Book Is <span className="italic">For You</span> If…
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {personas.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 100}>
                <div className="p-8 border border-brand-dark/10 hover:border-brand-pink/30 transition-all duration-500 group">
                  <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-brand-pink transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-sans text-brand-dark/70 leading-relaxed">{p.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-4">Reader Reviews</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                What Readers Are <span className="italic text-brand-pink">Saying</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <ScrollReveal key={r.author} delay={i * 150}>
                <div className="p-8 border border-brand-cream/10 relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(r.stars)].map((_, j) => (
                      <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <p className="font-serif text-lg italic leading-relaxed mb-6 text-brand-cream/80">
                    "{r.text}"
                  </p>
                  <p className="font-sans text-sm text-brand-cream/50">— {r.author}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={400}>
            <div className="text-center mt-16">
              <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark rounded-none px-12 py-6 font-sans uppercase tracking-widest text-xs font-semibold">
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
