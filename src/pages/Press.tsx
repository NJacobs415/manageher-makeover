import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/animations/CursorFollower";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Magnetic from "@/components/animations/Magnetic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Mail, Mic, Users, TrendingUp, Heart } from "lucide-react";

const Press = () => (
  <div className="overflow-x-hidden page-enter">
    <CursorFollower />
    <Navbar />

    {/* Hero */}
    <section className="py-28 md:py-40 px-6 bg-brand-cream relative overflow-hidden">
      <span className="editorial-number text-[15vw] absolute -bottom-[3vw] left-[-1vw] select-none pointer-events-none">Press</span>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <TextReveal>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-4">Press & Speaking</p>
        </TextReveal>
        <TextReveal delay={150}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.95] mb-6">
            Let's <em className="text-brand-pink italic">collaborate.</em>
          </h1>
        </TextReveal>
        <FadeIn delay={400} y={20}>
          <p className="font-sans text-[15px] text-muted-foreground max-w-md mx-auto leading-relaxed">
            Aimee is available for speaking engagements, media appearances, brand partnerships, and podcast guest features.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Speaking Topics */}
    <section className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <TextReveal>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center mb-20">
            Speaking <em className="text-brand-pink italic">topics.</em>
          </h2>
        </TextReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { icon: TrendingUp, title: "Financial Literacy for Women", desc: "Actionable strategies for building wealth, investing wisely, and achieving financial independence." },
            { icon: Users, title: "Women in Leadership", desc: "Breaking barriers, leading with authenticity, and redefining power in the modern workplace." },
            { icon: Heart, title: "Owning Your Narrative", desc: "Taking control of your personal brand, story, and legacy — unapologetically." },
            { icon: Mic, title: "The Power of Podcasting", desc: "Building a platform, growing an audience, and turning your voice into impact." },
          ].map((t, i) => (
            <FadeIn key={t.title} delay={i * 100} y={30}>
              <div className="bg-background p-10 group hover:bg-foreground transition-colors duration-500 h-full">
                <t.icon size={24} className="text-brand-pink mb-6 group-hover:text-brand-gold transition-colors" />
                <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-background transition-colors mb-4">{t.title}</h3>
                <p className="font-sans text-[14px] text-muted-foreground group-hover:text-background/60 transition-colors leading-relaxed">{t.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* As Seen In */}
    <section className="py-12 px-6 border-y border-border">
      <FadeIn>
        <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-center text-muted-foreground/40 mb-6">As Seen In</p>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {["NAWBO", "Apple Podcasts", "Spotify", "Amazon Music", "YouTube"].map((n) => (
            <span key={n} className="font-serif text-lg md:text-xl italic text-foreground/10">{n}</span>
          ))}
        </div>
      </FadeIn>
    </section>

    {/* Press Kit */}
    <section className="py-24 md:py-36 px-6 bg-foreground">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeIn x={-40} y={0}>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-background/30 mb-4">Media Resources</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6">Press Kit</h2>
          <p className="font-sans text-[14px] text-background/50 leading-relaxed mb-8">
            Download high-resolution headshots, brand assets, bio, and show information.
          </p>
          <div className="flex flex-wrap gap-4">
            <Magnetic strength={0.2}>
              <button className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-4">
                <Download size={14} /> Press Kit
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button className="inline-flex items-center gap-2 border border-background/20 text-background font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-4 hover:border-brand-pink hover:text-brand-pink transition-all">
                <Download size={14} /> Headshots
              </button>
            </Magnetic>
          </div>
        </FadeIn>
        <FadeIn delay={200} x={40} y={0}>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-background/5 flex items-center justify-center">
                <span className="font-sans text-[9px] text-background/15 uppercase tracking-widest">Photo {i}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Booking Form */}
    <section className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-xl mx-auto">
        <TextReveal>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Book <em className="text-brand-pink italic">Aimee.</em>
            </h2>
            <p className="font-sans text-[14px] text-muted-foreground">Our team responds within 48 hours.</p>
          </div>
        </TextReveal>
        <FadeIn delay={200} y={30}>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Your Name" className="h-12 px-5 font-sans text-sm border-border" />
              <Input type="email" placeholder="Email" className="h-12 px-5 font-sans text-sm border-border" />
            </div>
            <Input placeholder="Organization / Event" className="h-12 px-5 font-sans text-sm border-border" />
            <Input placeholder="Date & Location" className="h-12 px-5 font-sans text-sm border-border" />
            <Textarea placeholder="Tell us about your event..." rows={5} className="font-sans text-sm resize-none px-5 py-3 border-border" />
            <Magnetic strength={0.15}>
              <button className="btn-glow w-full bg-foreground text-background h-12 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors">
                <Mail size={14} /> Submit Inquiry
              </button>
            </Magnetic>
          </form>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </div>
);

export default Press;
