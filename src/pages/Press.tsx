import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Mail, Mic, Users, TrendingUp, Heart } from "lucide-react";

const speakingTopics = [
  { icon: TrendingUp, title: "Financial Literacy for Women", description: "Actionable strategies for building wealth, investing wisely, and achieving financial independence." },
  { icon: Users, title: "Women in Leadership", description: "Breaking barriers, leading with authenticity, and redefining what power looks like." },
  { icon: Heart, title: "Owning Your Narrative", description: "Taking control of your personal brand, story, and legacy — unapologetically." },
  { icon: Mic, title: "The Power of Podcasting", description: "Building a platform, growing an audience, and turning your voice into influence." },
];

const mediaLogos = ["Forbes", "Inc.", "Entrepreneur", "Bloomberg", "HuffPost", "ABC News", "Fast Company", "Business Insider"];

const Press = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 section-padding" style={{ background: "linear-gradient(180deg, hsl(270 30% 94%), hsl(340 40% 95%), hsl(35 50% 96%))" }}>
        <div className="editorial-container text-center max-w-3xl mx-auto">
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand-pink font-medium mb-4 animate-fade-in">
            Press & Speaking
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up">
            Let's <em className="text-brand-pink">collaborate.</em>
          </h1>
          <p className="font-sans text-lg text-brand-warm-gray mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Aimee is available for speaking engagements, media appearances, 
            brand partnerships, and podcast guest features.
          </p>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="section-padding bg-card">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Speaking <em className="text-brand-pink">topics</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {speakingTopics.map((topic, i) => (
              <ScrollReveal key={topic.title} delay={i * 100}>
                <div className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center mb-5 group-hover:bg-brand-pink/20 transition-colors">
                    <topic.icon size={22} className="text-brand-pink" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">{topic.title}</h3>
                  <p className="font-sans text-brand-warm-gray leading-relaxed">{topic.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* As Seen In */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(35 50% 96%), hsl(340 40% 96%))" }}>
        <div className="editorial-container text-center">
          <ScrollReveal>
            <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand-pink font-medium mb-8">
              As Seen In
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {mediaLogos.map((name, i) => (
              <ScrollReveal key={name} delay={i * 60}>
                <span className="font-serif text-xl md:text-2xl italic text-brand-navy/20 hover:text-brand-navy/40 transition-colors">
                  {name}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="section-padding bg-brand-pink text-primary-foreground">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 !text-primary-foreground">
                Press Kit
              </h2>
              <p className="font-sans opacity-80 leading-relaxed mb-8">
                Download Aimee's official press kit including high-resolution headshots, 
                brand assets, bio, and show information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary-foreground text-brand-pink hover:bg-primary-foreground/90 rounded-full px-8 py-5 font-sans text-sm">
                  <Download size={16} className="mr-2" />
                  Download Press Kit
                </Button>
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 py-5 font-sans text-sm">
                  <Download size={16} className="mr-2" />
                  Headshots
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                    <span className="font-sans text-xs opacity-40 uppercase tracking-widest">Photo {i}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-card">
        <div className="editorial-container max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Speaking <em className="text-brand-pink">inquiry</em>
              </h2>
              <p className="font-sans text-brand-warm-gray">
                Fill out the form below and our team will get back to you within 48 hours.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input placeholder="Your Name" className="rounded-full h-12 font-sans text-sm px-5" />
                <Input type="email" placeholder="Email Address" className="rounded-full h-12 font-sans text-sm px-5" />
              </div>
              <Input placeholder="Organization / Event Name" className="rounded-full h-12 font-sans text-sm px-5" />
              <Input placeholder="Event Date & Location" className="rounded-full h-12 font-sans text-sm px-5" />
              <Textarea
                placeholder="Tell us about your event and what you're looking for..."
                rows={5}
                className="rounded-xl font-sans text-sm resize-none px-5 py-4"
              />
              <Button className="w-full bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground rounded-full py-6 font-sans text-sm shadow-lg shadow-brand-pink/20">
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
