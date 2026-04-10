import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Play, Mail, Mic, Users, TrendingUp, Heart } from "lucide-react";

const speakingTopics = [
  { icon: TrendingUp, title: "Financial Literacy for Women", description: "Actionable strategies for building wealth, investing wisely, and achieving financial independence." },
  { icon: Users, title: "Women in Leadership", description: "Breaking barriers, leading with authenticity, and redefining what power looks like." },
  { icon: Heart, title: "Owning Your Narrative", description: "Taking control of your personal brand, story, and legacy — unapologetically." },
  { icon: Mic, title: "The Power of Podcasting", description: "Building a platform, growing an audience, and turning your voice into influence." },
];

const mediaLogos = ["Forbes", "Inc.", "Entrepreneur", "Bloomberg", "HuffPost", "ABC News", "Fast Company", "Business Insider"];

const Press = () => {
  return (
    <div className="bg-brand-dark text-brand-cream overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 section-padding">
        <div className="editorial-container text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-4 animate-fade-in">
            Press & Speaking
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up">
            Let's <span className="italic text-brand-pink">Collaborate</span>
          </h1>
          <p className="font-sans text-brand-cream/60 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Aimee is available for speaking engagements, media appearances, brand partnerships, 
            and podcast guest features.
          </p>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="section-padding bg-brand-cream text-brand-dark">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-pink mb-4">On Stage</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Speaking <span className="italic">Topics</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {speakingTopics.map((topic, i) => (
              <ScrollReveal key={topic.title} delay={i * 100}>
                <div className="p-8 border border-brand-dark/10 hover:border-brand-pink/30 transition-all duration-500 group">
                  <topic.icon size={28} className="text-brand-pink mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-serif text-2xl font-bold mb-3">{topic.title}</h3>
                  <p className="font-sans text-brand-dark/70 leading-relaxed">{topic.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media Logos */}
      <section className="section-padding">
        <div className="editorial-container text-center">
          <ScrollReveal>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-10">
              As Seen In
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {mediaLogos.map((name, i) => (
              <ScrollReveal key={name} delay={i * 80}>
                <span className="font-serif text-xl md:text-2xl italic text-brand-cream/25 hover:text-brand-cream/50 transition-colors">
                  {name}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="section-padding bg-gradient-to-r from-brand-dark via-[hsl(328,30%,12%)] to-brand-dark">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-pink mb-4">For Media</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Press <span className="italic text-brand-gold">Kit</span>
              </h2>
              <p className="font-sans text-brand-cream/60 leading-relaxed mb-8">
                Download Aimee's official press kit including high-resolution headshots, 
                brand assets, bio, and show information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark rounded-none px-8 py-5 font-sans uppercase tracking-widest text-xs font-semibold">
                  <Download size={16} className="mr-2" />
                  Download Press Kit
                </Button>
                <Button variant="outline" className="border-brand-cream/20 text-brand-cream hover:bg-brand-cream/10 rounded-none px-8 py-5 font-sans uppercase tracking-widest text-xs">
                  <Download size={16} className="mr-2" />
                  Headshots
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-brand-gold/10 to-brand-pink/10 border border-brand-cream/10 flex items-center justify-center">
                    <span className="font-sans text-xs text-brand-cream/30 uppercase tracking-widest">Photo {i}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="editorial-container max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold mb-4">Book Aimee</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Speaking <span className="italic text-brand-pink">Inquiry</span>
              </h2>
              <p className="font-sans text-brand-cream/60">
                Fill out the form below and our team will get back to you within 48 hours.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  placeholder="Your Name"
                  className="bg-transparent border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 rounded-none h-12 font-sans"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 rounded-none h-12 font-sans"
                />
              </div>
              <Input
                placeholder="Organization / Event Name"
                className="bg-transparent border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 rounded-none h-12 font-sans"
              />
              <Input
                placeholder="Event Date & Location"
                className="bg-transparent border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 rounded-none h-12 font-sans"
              />
              <Textarea
                placeholder="Tell us about your event and what you're looking for..."
                rows={5}
                className="bg-transparent border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 rounded-none font-sans resize-none"
              />
              <Button className="w-full bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-none py-6 font-sans uppercase tracking-widest text-xs">
                <Mail size={16} className="mr-2" />
                Submit Inquiry
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
