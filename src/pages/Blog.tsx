// ─── Blog Index Page ───
// src/pages/Blog.tsx
// Reads all blog post JSON files from public/blog/posts.json (an index file)
// and renders them as a grid of episode cards

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, Play, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useEpisodeCount } from "@/hooks/useEpisodeCount";
import SEO from "@/components/SEO";

interface BlogPostMeta {
  slug: string;
  title: string;
  episodeNumber: number;
  guestName: string;
  publishedAt: string;
  duration: string;
  thumbnail: string;
  excerpt: string;
  topics: string[];
  youtubeUrl: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const episodeCount = useEpisodeCount();

  useEffect(() => {
    fetch("/blog/posts.json")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]));
  }, []);

  const allTopics = [...new Set(posts.flatMap((p) => p.topics))].sort();
  const filtered = filter
    ? posts.filter((p) => p.topics.includes(filter))
    : posts;

  return (
    <div className="overflow-x-hidden page-enter">
      <SEO
        title="Blog | The Manage Her®"
        description="Key takeaways, quotes, and insights from every episode of The Manage Her® Podcast."
        url="https://themanageher.com/blog"
      />
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section
        className="py-28 md:py-40 px-6 relative overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(235,24,135,0.05) 0%, transparent 50%)" }} />
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "#c9a96e" }}>The Blog</p>
          </TextReveal>
          <TextReveal delay={100}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-[1.15] mb-6">
              Every episode,<br /><em className="text-brand-pink italic">unpacked</em>.
            </h1>
          </TextReveal>
          <FadeIn delay={300} y={20}>
            <p className="max-w-[600px] mx-auto" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#888", fontSize: "1.15rem", lineHeight: "1.8" }}>
              Key takeaways, memorable quotes, timestamps, and full transcripts from {episodeCount}+ episodes of The Manage Her® Podcast.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ TOPIC FILTERS ═══════ */}
      {allTopics.length > 0 && (
        <section className="py-8 px-6" style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter(null)}
              className="font-sans text-[11px] font-medium px-5 py-2 transition-all duration-300 cursor-pointer"
              style={{
                background: !filter ? "hsl(var(--brand-pink))" : "#0a0a0a",
                color: !filter ? "#fff" : "#888",
                borderRadius: "50px",
                border: `1px solid ${!filter ? "transparent" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              All Episodes
            </button>
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setFilter(topic)}
                className="font-sans text-[11px] font-medium px-5 py-2 transition-all duration-300 cursor-pointer"
                style={{
                  background: filter === topic ? "hsl(var(--brand-pink))" : "#0a0a0a",
                  color: filter === topic ? "#fff" : "#888",
                  borderRadius: "50px",
                  border: `1px solid ${filter === topic ? "transparent" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ═══════ POSTS GRID ═══════ */}
      <section className="py-16 md:py-24 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1200px] mx-auto">
          {filtered.length === 0 ? (
            <FadeIn y={20}>
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-foreground mb-4">Coming soon</p>
                <p className="font-sans text-[14px] text-muted-foreground">
                  Blog posts for each episode are being generated automatically. Check back soon.
                </p>
                <Link to="/podcast" className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink mt-6 hover:gap-3 transition-all">
                  Listen to the Podcast <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 80} y={30}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(235,24,135,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-500 flex items-center justify-center">
                        <div className="w-12 h-12 bg-brand-pink text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500" style={{ borderRadius: "50%" }}>
                          <Play size={18} className="fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute top-3 left-3 font-sans text-[9px] font-bold uppercase tracking-[0.1em] px-3 py-1 bg-brand-pink text-primary-foreground" style={{ borderRadius: "6px" }}>
                        Ep. {post.episodeNumber}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="flex items-center gap-1 font-sans text-[10px] text-muted-foreground">
                          <Calendar size={10} />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1 font-sans text-[10px] text-muted-foreground">
                          <Clock size={10} />
                          {post.duration}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-brand-pink transition-colors mb-2">
                        {post.title}
                      </h3>
                      {post.guestName && (
                        <p className="font-sans text-[11px] uppercase tracking-[0.1em] mb-3" style={{ color: "#c9a96e" }}>
                          with {post.guestName}
                        </p>
                      )}
                      <p className="font-sans text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.topics.slice(0, 3).map((topic) => (
                          <span key={topic} className="font-sans text-[9px] uppercase tracking-[0.1em] px-2 py-1" style={{ background: "rgba(235,24,135,0.06)", color: "#eb1887", borderRadius: "50px" }}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
