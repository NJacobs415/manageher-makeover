import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Mail, Mic, Users, TrendingUp, Heart } from "lucide-react";

const Press = () => (
  <div className="overflow-x-hidden">
    <Navbar />

    {/* Hero */}
    <section className="bg-brand-ice py-20 md:py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4 animate-fade-in">Press & Speaking</p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-brand-pink mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
          Let's Collaborate.
        </h1>
        <p className="font-sans text-[15px] text-muted-foreground max-w-xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          Aimee is available for speaking engagements, media appearances, brand partnerships, and podcast guest features.
        </p>
      </div>
    </section>

    {/* Speaking Topics */}
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-pink text-center mb-14">
            Speaking Topics
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: TrendingUp, title: "Financial Literacy for Women", desc: "Actionable strategies for building wealth, investing wisely, and achieving financial independence — no jargon, just clarity." },
            { icon: Users, title: "Women in Leadership", desc: "Breaking barriers, leading with authenticity, and redefining what power looks like in the modern workplace." },
            { icon: Heart, title: "Owning Your Narrative", desc: "Taking control of your personal brand, story, and legacy — unapologetically." },
            { icon: Mic, title: "The Power of Podcasting", desc: "Building a platform, growing an audience, and turning your voice into influence and impact." },
          ].map((t, i) => (
            <ScrollReveal key={t.title} delay={i * 100}>
              <div className="bg-card p-7 shadow-sm hover:shadow-md transition-all group h-full border border-border">
                <div className="w-11 h-11 bg-brand-blush flex items-center justify-center mb-4 group-hover:bg-brand-pink/10 transition-colors">
                  <t.icon size={20} className="text-brand-pink" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3">{t.title}</h3>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* As Seen In */}
    <section className="py-10 px-6 bg-brand-ice border-y border-border">
      <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-center text-muted-foreground/50 mb-6">As Seen In</p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {["NAWBO", "Apple Podcasts", "Spotify", "Amazon Music", "YouTube"].map((n) => (
          <span key={n} className="font-serif text-xl md:text-2xl font-bold text-brand-navy/15">{n}</span>
        ))}
      </div>
    </section>

    {/* Press Kit */}
    <section className="bg-brand-pink py-16 md:py-20 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Press Kit</h2>
          <p className="font-sans text-primary-foreground/80 text-[15px] leading-relaxed mb-7">
            Download Aimee's official press kit including high-resolution headshots, brand assets, bio, and show information.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-brand-gold hover:bg-brand-gold/90 text-foreground px-6 h-11 font-sans text-sm font-bold uppercase tracking-[0.08em]">
              <Download size={15} className="mr-2" /> Download Press Kit
            </Button>
            <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-6 h-11 font-sans text-sm font-bold uppercase tracking-[0.08em]">
              <Download size={15} className="mr-2" /> Headshots
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-primary-foreground/10 flex items-center justify-center">
                <span className="font-sans text-[10px] text-primary-foreground/30 uppercase tracking-widest">Photo {i}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Booking Form */}
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-pink mb-3">
              Book Aimee
            </h2>
            <p className="font-sans text-[15px] text-muted-foreground">Fill out the form and our team will respond within 48 hours.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Your Name" className="h-11 px-5 font-sans text-sm" />
              <Input type="email" placeholder="Email Address" className="h-11 px-5 font-sans text-sm" />
            </div>
            <Input placeholder="Organization / Event Name" className="h-11 px-5 font-sans text-sm" />
            <Input placeholder="Event Date & Location" className="h-11 px-5 font-sans text-sm" />
            <Textarea placeholder="Tell us about your event and what you're looking for..." rows={5} className="font-sans text-sm resize-none px-5 py-3" />
            <Button className="w-full bg-brand-pink hover:bg-brand-pink/90 text-primary-foreground h-12 font-sans text-sm font-bold uppercase tracking-[0.08em]">
              <Mail size={15} className="mr-2" /> Submit Inquiry
            </Button>
          </form>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
  </div>
);

export default Press;
