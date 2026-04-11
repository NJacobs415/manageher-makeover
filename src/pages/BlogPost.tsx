// ─── Dynamic Blog Post Page ───
// src/pages/BlogPost.tsx
// Reads individual episode JSON from public/blog/{slug}.json
// Renders enhanced show notes with key takeaways, timestamps, quotes, and CTAs

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Magnetic from "@/components/animations/Magnetic";
import { ArrowLeft, ArrowRight, Play, Clock, Calendar, Share2, Bookmark, ExternalLink } from "lucide-react";

interface BlogPostData {
  slug: string;
  title: string;
  episodeNumber: number;
  guestName: string;
  guestBio: string;
  publishedAt: string;
  duration: string;
  thumbnail: string;
  youtubeUrl: string;
  spotifyUrl: string;
  appleUrl: string;
  excerpt: string;
  topics: string[];
  keyTakeaways: string[];
  pullQuotes: { text: string; timestamp?: string }[];
  timestamps: { time: string; label: string }[];
  content: string; // HTML or markdown body
  metaDescription: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/blog/${slug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
        // Set page title
        document.title = `${data.title} | The Manage Her® Podcast`;
      })
      .catch(() => {
        setLoading(false);
        navigate("/blog", { replace: true });
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <p className="font-serif text-xl text-muted-foreground animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="overflow-x-hidden page-enter">
      <Navbar />

      {/* ═══════ HERO — Episode header ═══════ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(235,24,135,0.04) 0%, transparent 50%)" }} />
        <div className="max-w-[900px] mx-auto relative z-10">
          {/* Back link */}
          <FadeIn y={10}>
            <Link to="/blog" className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-brand-pink transition-colors mb-8">
              <ArrowLeft size={14} /> All Episodes
            </Link>
          </FadeIn>

          {/* Episode meta */}
          <FadeIn delay={100} y={20}>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 bg-brand-pink text-primary-foreground" style={{ borderRadius: "6px" }}>
                Episode {post.episodeNumber}
              </span>
              <span className="flex items-center gap-1 font-sans text-[11px] text-muted-foreground">
                <Calendar size={12} />
                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1 font-sans text-[11px] text-muted-foreground">
                <Clock size={12} />
                {post.duration}
              </span>
            </div>
          </FadeIn>

          {/* Title */}
          <TextReveal delay={200}>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4">
              {post.title}
            </h1>
          </TextReveal>

          {/* Guest */}
          {post.guestName && (
            <FadeIn delay={300} y={15}>
              <p className="font-sans text-[13px] mb-6">
                <span className="text-muted-foreground">with </span>
                <span style={{ color: "#c9a96e" }}>{post.guestName}</span>
              </p>
            </FadeIn>
          )}

          {/* Listen buttons */}
          <FadeIn delay={400} y={20}>
            <div className="flex flex-wrap gap-3">
              <a href={post.youtubeUrl} target="_blank" rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-brand-pink/90 transition-colors"
                style={{ borderRadius: "50px" }}>
                <Play size={14} className="fill-current" /> Watch on YouTube
              </a>
              {post.spotifyUrl && (
                <a href={post.spotifyUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-6 py-3 hover:border-brand-pink hover:text-brand-pink transition-all"
                  style={{ borderRadius: "50px" }}>
                  Listen on Spotify
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ THUMBNAIL ═══════ */}
      <section className="px-6" style={{ background: "#0a0a0a" }}>
        <FadeIn delay={500} y={30}>
          <div className="max-w-[900px] mx-auto overflow-hidden" style={{ borderRadius: "20px" }}>
            <img src={post.thumbnail} alt={post.title} className="w-full" style={{ aspectRatio: "16/9", objectFit: "cover" }} loading="eager" />
          </div>
        </FadeIn>
      </section>

      {/* ═══════ CONTENT AREA ═══════ */}
      <section className="py-16 md:py-24 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main content — 8 cols */}
            <div className="lg:col-span-8">
              {/* Excerpt */}
              <FadeIn y={20}>
                <p className="font-sans text-[16px] text-foreground/80 leading-[1.9] mb-10 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {post.excerpt}
                </p>
              </FadeIn>

              {/* Key Takeaways */}
              {post.keyTakeaways?.length > 0 && (
                <FadeIn delay={100} y={20}>
                  <div className="mb-12 p-8" style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(235,24,135,0.1)" }}>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                      Key <em className="text-brand-pink italic">Takeaways</em>
                    </h2>
                    <div className="space-y-4">
                      {post.keyTakeaways.map((takeaway, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center font-sans text-[10px] font-bold mt-0.5"
                            style={{ background: "linear-gradient(135deg, #eb1887, #ff4da6)", borderRadius: "8px", color: "#fff" }}>
                            {i + 1}
                          </div>
                          <p className="font-sans text-[14px] text-foreground/80 leading-relaxed">{takeaway}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Pull Quotes */}
              {post.pullQuotes?.length > 0 && post.pullQuotes.map((quote, i) => (
                <FadeIn key={i} delay={200 + i * 100} y={20}>
                  <blockquote className="my-10 pl-6" style={{ borderLeft: "3px solid #eb1887" }}>
                    <p className="font-serif text-xl md:text-2xl italic text-foreground leading-[1.4] mb-2">
                      "{quote.text}"
                    </p>
                    {quote.timestamp && (
                      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        at {quote.timestamp}
                      </span>
                    )}
                  </blockquote>
                </FadeIn>
              ))}

              {/* Full content */}
              <FadeIn delay={300} y={20}>
                <div
                  className="prose-tmh font-sans text-[15px] text-foreground/70 leading-[2]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{
                    lineHeight: "2",
                  }}
                />
              </FadeIn>

              {/* Guest Bio */}
              {post.guestBio && (
                <FadeIn delay={400} y={20}>
                  <div className="mt-12 p-8" style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(201,169,110,0.1)" }}>
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#c9a96e" }}>About The Guest</p>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">{post.guestName}</h3>
                    <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">{post.guestBio}</p>
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Sidebar — 4 cols */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Timestamps */}
                {post.timestamps?.length > 0 && (
                  <FadeIn delay={200} y={20}>
                    <div className="p-6" style={{ background: "#111", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-4">Timestamps</h3>
                      <div className="space-y-3">
                        {post.timestamps.map((ts, i) => (
                          <a key={i} href={`${post.youtubeUrl}&t=${ts.time}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-start gap-3 group hover:bg-white/[0.02] -mx-2 px-2 py-1 rounded-lg transition-colors">
                            <span className="font-mono text-[12px] text-brand-pink font-semibold shrink-0 mt-0.5">{ts.time}</span>
                            <span className="font-sans text-[13px] text-muted-foreground group-hover:text-foreground transition-colors leading-snug">{ts.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}

                {/* Topics */}
                <FadeIn delay={300} y={20}>
                  <div className="p-6" style={{ background: "#111", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-4">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.topics.map((topic) => (
                        <Link key={topic} to={`/blog?topic=${topic}`}
                          className="font-sans text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 transition-colors hover:bg-brand-pink/10 hover:text-brand-pink"
                          style={{ background: "rgba(235,24,135,0.06)", color: "#eb1887", borderRadius: "50px" }}>
                          {topic}
                        </Link>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                {/* Listen CTA */}
                <FadeIn delay={400} y={20}>
                  <div className="p-6" style={{ background: "linear-gradient(135deg, rgba(235,24,135,0.08), rgba(201,169,110,0.06))", borderRadius: "16px", border: "1px solid rgba(235,24,135,0.1)" }}>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-3">Listen to this episode</h3>
                    <p className="font-sans text-[13px] text-muted-foreground mb-4">Available on all major platforms.</p>
                    <div className="space-y-2">
                      <a href={post.youtubeUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 font-sans text-[12px] text-foreground hover:text-brand-pink transition-colors">
                        <ExternalLink size={12} /> YouTube
                      </a>
                      {post.spotifyUrl && (
                        <a href={post.spotifyUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 font-sans text-[12px] text-foreground hover:text-brand-pink transition-colors">
                          <ExternalLink size={12} /> Spotify
                        </a>
                      )}
                      {post.appleUrl && (
                        <a href={post.appleUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 font-sans text-[12px] text-foreground hover:text-brand-pink transition-colors">
                          <ExternalLink size={12} /> Apple Podcasts
                        </a>
                      )}
                    </div>
                  </div>
                </FadeIn>

                {/* Book CTA */}
                <FadeIn delay={500} y={20}>
                  <Link to="/book" className="block p-6 group transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "#111", borderRadius: "16px", border: "1px solid rgba(201,169,110,0.1)" }}>
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "#c9a96e" }}>The Book</p>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-brand-pink transition-colors">The Manage Her®</h3>
                    <p className="font-sans text-[12px] text-muted-foreground mb-3">Unveiling Invisible Labor & Sparking a Leadership Revolution</p>
                    <span className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-pink group-hover:gap-2 transition-all">
                      Get Your Copy <ArrowRight size={12} />
                    </span>
                  </Link>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ LISTEN CTA ═══════ */}
      <section className="py-16 px-6" style={{ background: "#111", borderTop: "1px solid rgba(235,24,135,0.08)" }}>
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            Enjoyed this episode? <em className="text-brand-pink italic">Subscribe</em> for more.
          </h2>
          <p className="font-sans text-[14px] text-muted-foreground mb-6">New episodes every Monday. Leadership, money, motherhood, and the invisible work that runs the world.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic strength={0.2}>
              <a href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475" target="_blank" rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 transition-colors"
                style={{ borderRadius: "50px" }}>
                Subscribe Now
              </a>
            </Magnetic>
            <Link to="/blog" className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all"
              style={{ borderRadius: "50px" }}>
              More Episodes <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
