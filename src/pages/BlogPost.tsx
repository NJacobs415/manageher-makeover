// ─── Dynamic Blog Post Page ───
// src/pages/BlogPost.tsx
// Reads individual episode JSON from public/blog/{slug}.json
// Renders enhanced show notes with key takeaways, timestamps, quotes, and CTAs

import { useState, useEffect, useMemo, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Magnetic from "@/components/animations/Magnetic";
import SEO from "@/components/SEO";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Clock,
  Calendar,
  Share2,
  Check,
  ExternalLink,
} from "lucide-react";

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

// ── Prose styles for the rendered HTML content ──
// Targets .prose-tmh which wraps the dangerouslySetInnerHTML block.
// Tuned for the warm cream (#faf8f5) content section — dark readable type.
const proseCss = `
.prose-tmh h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.25;
}
.prose-tmh p {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 15px;
  line-height: 2;
  color: #3a3a3a;
  margin-bottom: 1.5rem;
}
.prose-tmh strong {
  color: #1a1a1a;
  font-weight: 600;
}
.prose-tmh em {
  color: #eb1887;
  font-style: italic;
}
.prose-tmh a {
  color: #eb1887;
  text-decoration: underline;
  transition: color 0.2s ease;
}
.prose-tmh a:hover {
  color: #ff4da6;
}
.prose-tmh ul,
.prose-tmh ol {
  color: #3a3a3a;
  font-size: 15px;
  line-height: 2;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}
.prose-tmh li {
  margin-bottom: 0.5rem;
}
`;

// Extract YouTube video ID from watch URLs or youtu.be short links
const getYouTubeId = (url: string): string => {
  if (!url) return "";
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : "";
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Fetch the blog post JSON
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
        document.title = `${data.title} | The Manage Her® Podcast`;
      })
      .catch(() => {
        setLoading(false);
        navigate("/blog", { replace: true });
      });
  }, [slug, navigate]);

  // Reading progress bar — updates on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Copy URL to clipboard
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Clipboard API unavailable — silently ignore
    }
  };

  // Split content at h3 headings so we can sprinkle pull quotes between sections.
  // Positive lookahead (?=<h3) keeps the h3 opener with the following section.
  const contentSections = useMemo(() => {
    if (!post?.content) return [];
    return post.content.split(/(?=<h3)/);
  }, [post?.content]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0a0a0a" }}
      >
        <p className="font-serif text-xl text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (!post) return null;

  const videoId = getYouTubeId(post.youtubeUrl);

  return (
    <>
      <SEO
        title={`${post.title} | The Manage Her® Podcast`}
        description={post.metaDescription || post.excerpt}
        image={post.thumbnail}
        url={`https://themanageher.com/blog/${post.slug}`}
        type="article"
      />
      {/* Prose styles for dangerouslySetInnerHTML content */}
      <style>{proseCss}</style>

      {/* Reading progress bar — sibling of page-enter so fixed positioning is viewport-relative */}
      <div
        className="fixed top-0 left-0 right-0 pointer-events-none"
        style={{ height: "3px", zIndex: 9999 }}
      >
        <div
          style={{
            height: "100%",
            width: `${scrollProgress}%`,
            background: "#eb1887",
            transition: "width 0.1s ease-out",
          }}
        />
      </div>

      <div className="overflow-x-hidden page-enter">
        <Navbar />

        {/* ═══════ HERO — Episode header (dark) ═══════ */}
        <section
          className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6"
          style={{ background: "#0a0a0a" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(235,24,135,0.04) 0%, transparent 50%)",
            }}
          />
          <div className="max-w-[900px] mx-auto relative z-10">
            {/* Back link */}
            <FadeIn y={10}>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-brand-pink transition-colors mb-8"
              >
                <ArrowLeft size={14} /> All Episodes
              </Link>
            </FadeIn>

            {/* Episode meta */}
            <FadeIn delay={100} y={20}>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 bg-brand-pink text-primary-foreground"
                  style={{ borderRadius: "6px" }}
                >
                  Episode {post.episodeNumber}
                </span>
                <span className="flex items-center gap-1 font-sans text-[11px] text-muted-foreground">
                  <Calendar size={12} />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
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

            {/* Guest + Share row */}
            <FadeIn delay={300} y={15}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {post.guestName && (
                  <p className="font-sans text-[13px]">
                    <span className="text-muted-foreground">with </span>
                    <span style={{ color: "#c9a96e" }}>{post.guestName}</span>
                  </p>
                )}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.15em] transition-colors"
                  style={{
                    color: copied ? "#eb1887" : "rgba(255,255,255,0.5)",
                  }}
                  aria-label="Copy link to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Share2 size={14} /> Copy Link
                    </>
                  )}
                </button>
              </div>
            </FadeIn>

            {/* Listen buttons */}
            <FadeIn delay={400} y={20}>
              <div className="flex flex-wrap gap-3">
                <a
                  href={post.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-brand-pink/90 transition-colors"
                  style={{ borderRadius: "50px" }}
                >
                  <Play size={14} className="fill-current" /> Watch on YouTube
                </a>
                {post.spotifyUrl && (
                  <a
                    href={post.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-6 py-3 hover:border-brand-pink hover:text-brand-pink transition-all"
                    style={{ borderRadius: "50px" }}
                  >
                    Listen on Spotify
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════ YOUTUBE EMBED ═══════ */}
        <section className="px-6 pb-4" style={{ background: "#0a0a0a" }}>
          <FadeIn delay={500} y={30}>
            <div className="max-w-[900px] mx-auto">
              {videoId ? (
                <div
                  style={{
                    aspectRatio: "16/9",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    style={{ border: 0 }}
                  />
                </div>
              ) : (
                <div
                  className="overflow-hidden"
                  style={{ borderRadius: "20px" }}
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full"
                    style={{ aspectRatio: "16/9", objectFit: "cover" }}
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </FadeIn>
        </section>

        {/* ═══════ CONTENT AREA — Warm cream ═══════ */}
        <section
          className="py-16 md:py-24 px-6"
          style={{ background: "#faf8f5" }}
        >
          <div className="max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main content — 8 cols */}
              <div className="lg:col-span-8">
                {/* Excerpt */}
                <FadeIn y={20}>
                  <p
                    className="font-sans text-[16px] leading-[1.9] mb-10 pb-10"
                    style={{
                      color: "#3a3a3a",
                      borderBottom: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    {post.excerpt}
                  </p>
                </FadeIn>

                {/* Key Takeaways — white card */}
                {post.keyTakeaways?.length > 0 && (
                  <FadeIn delay={100} y={20}>
                    <div
                      className="mb-12 p-8"
                      style={{
                        background: "#fff",
                        borderRadius: "24px",
                        border: "1px solid rgba(0,0,0,0.05)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                      }}
                    >
                      <h2
                        className="font-serif text-2xl font-bold mb-6"
                        style={{ color: "#1a1a1a" }}
                      >
                        Key <em className="text-brand-pink italic">Takeaways</em>
                      </h2>
                      <div className="space-y-4">
                        {post.keyTakeaways.map((takeaway, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div
                              className="w-7 h-7 flex-shrink-0 flex items-center justify-center font-sans text-[10px] font-bold mt-0.5"
                              style={{
                                background:
                                  "linear-gradient(135deg, #eb1887, #ff4da6)",
                                borderRadius: "8px",
                                color: "#fff",
                              }}
                            >
                              {i + 1}
                            </div>
                            <p
                              className="font-sans text-[14px] leading-relaxed"
                              style={{ color: "#3a3a3a" }}
                            >
                              {takeaway}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}

                {/* Hero pull quote — the first one, featured above the content */}
                {post.pullQuotes?.[0] && (
                  <FadeIn delay={200} y={20}>
                    <blockquote
                      className="my-10 pl-6"
                      style={{ borderLeft: "3px solid #eb1887" }}
                    >
                      <p
                        className="font-serif text-xl md:text-2xl italic leading-[1.4] mb-2"
                        style={{ color: "#1a1a1a" }}
                      >
                        "{post.pullQuotes[0].text}"
                      </p>
                      {post.pullQuotes[0].timestamp && (
                        <span
                          className="font-sans text-[10px] uppercase tracking-[0.15em]"
                          style={{ color: "#888" }}
                        >
                          at {post.pullQuotes[0].timestamp}
                        </span>
                      )}
                    </blockquote>
                  </FadeIn>
                )}

                {/* Content sections interleaved with remaining pull quotes */}
                <FadeIn delay={300} y={20}>
                  <div>
                    {contentSections.map((section, i) => {
                      const sprinkled = post.pullQuotes?.[i + 1];
                      return (
                        <Fragment key={i}>
                          <div
                            className="prose-tmh"
                            dangerouslySetInnerHTML={{ __html: section }}
                          />
                          {sprinkled && (
                            <blockquote
                              className="my-12 py-8 px-8"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(235,24,135,0.04), rgba(201,169,110,0.03))",
                                borderLeft: "3px solid #eb1887",
                                borderRadius: "0 16px 16px 0",
                              }}
                            >
                              <p
                                className="font-serif text-lg md:text-xl italic leading-[1.5] mb-2"
                                style={{ color: "#2a2a2a" }}
                              >
                                "{sprinkled.text}"
                              </p>
                              {sprinkled.timestamp && (
                                <span
                                  className="font-sans text-[10px] uppercase tracking-[0.15em]"
                                  style={{ color: "#888" }}
                                >
                                  at {sprinkled.timestamp}
                                </span>
                              )}
                            </blockquote>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </FadeIn>

                {/* Guest Bio — white card with gold border */}
                {post.guestBio && (
                  <FadeIn delay={400} y={20}>
                    <div
                      className="mt-12 p-8"
                      style={{
                        background: "#fff",
                        borderRadius: "24px",
                        border: "1px solid rgba(201,169,110,0.5)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                      }}
                    >
                      <p
                        className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] mb-3"
                        style={{ color: "#c9a96e" }}
                      >
                        About The Guest
                      </p>
                      <h3
                        className="font-serif text-xl font-bold mb-3"
                        style={{ color: "#1a1a1a" }}
                      >
                        {post.guestName}
                      </h3>
                      <p
                        className="font-sans text-[14px] leading-relaxed"
                        style={{ color: "#555" }}
                      >
                        {post.guestBio}
                      </p>
                    </div>
                  </FadeIn>
                )}
              </div>

              {/* Sidebar — 4 cols, dark cards against cream */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Timestamps */}
                  {post.timestamps?.length > 0 && (
                    <FadeIn delay={200} y={20}>
                      <div
                        className="p-7"
                        style={{
                          background: "#111",
                          borderRadius: "24px",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <h3 className="font-serif text-lg font-bold text-white mb-4">
                          Timestamps
                        </h3>
                        <div className="space-y-3">
                          {post.timestamps.map((ts, i) => (
                            <a
                              key={i}
                              href={`${post.youtubeUrl}&t=${ts.time}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-3 group hover:bg-white/[0.03] -mx-2 px-2 py-1 rounded-lg transition-colors"
                            >
                              <span className="font-mono text-[12px] text-brand-pink font-semibold shrink-0 mt-0.5">
                                {ts.time}
                              </span>
                              <span className="font-sans text-[13px] text-white/60 group-hover:text-white transition-colors leading-snug">
                                {ts.label}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  )}

                  {/* Topics */}
                  <FadeIn delay={300} y={20}>
                    <div
                      className="p-7"
                      style={{
                        background: "#111",
                        borderRadius: "24px",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <h3 className="font-serif text-lg font-bold text-white mb-4">
                        Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {post.topics.map((topic) => (
                          <Link
                            key={topic}
                            to={`/blog?topic=${topic}`}
                            className="font-sans text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 transition-colors hover:bg-brand-pink/20"
                            style={{
                              background: "rgba(235,24,135,0.12)",
                              color: "#eb1887",
                              borderRadius: "50px",
                            }}
                          >
                            {topic}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </FadeIn>

                  {/* Listen CTA */}
                  <FadeIn delay={400} y={20}>
                    <div
                      className="p-7"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(235,24,135,0.14), rgba(201,169,110,0.08))",
                        borderRadius: "24px",
                        border: "1px solid rgba(235,24,135,0.18)",
                      }}
                    >
                      <h3 className="font-serif text-lg font-bold text-white mb-3">
                        Listen to this episode
                      </h3>
                      <p className="font-sans text-[13px] text-white/60 mb-4">
                        Available on all major platforms.
                      </p>
                      <div className="space-y-2">
                        <a
                          href={post.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-sans text-[12px] text-white/80 hover:text-brand-pink transition-colors"
                        >
                          <ExternalLink size={12} /> YouTube
                        </a>
                        {post.spotifyUrl && (
                          <a
                            href={post.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-sans text-[12px] text-white/80 hover:text-brand-pink transition-colors"
                          >
                            <ExternalLink size={12} /> Spotify
                          </a>
                        )}
                        {post.appleUrl && (
                          <a
                            href={post.appleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-sans text-[12px] text-white/80 hover:text-brand-pink transition-colors"
                          >
                            <ExternalLink size={12} /> Apple Podcasts
                          </a>
                        )}
                      </div>
                    </div>
                  </FadeIn>

                  {/* Book CTA */}
                  <FadeIn delay={500} y={20}>
                    <Link
                      to="/book"
                      className="block p-7 group transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: "#111",
                        borderRadius: "24px",
                        border: "1px solid rgba(201,169,110,0.15)",
                      }}
                    >
                      <p
                        className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] mb-2"
                        style={{ color: "#c9a96e" }}
                      >
                        The Book
                      </p>
                      <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-brand-pink transition-colors">
                        The Manage Her
                        <span
                          style={{
                            fontSize: "0.45em",
                            verticalAlign: "super",
                            fontStyle: "normal",
                          }}
                        >
                          ®
                        </span>
                      </h3>
                      <p className="font-sans text-[12px] text-white/60 mb-3">
                        Unveiling Invisible Labor & Sparking a Leadership
                        Revolution
                      </p>
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

        {/* ═══════ ENJOYED THIS EPISODE — Podcast subscribe (dark) ═══════ */}
        <section
          className="py-16 px-6"
          style={{
            background: "#111",
            borderTop: "1px solid rgba(235,24,135,0.08)",
          }}
        >
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Enjoyed this episode?{" "}
              <em className="text-brand-pink italic">Subscribe</em> for more.
            </h2>
            <p className="font-sans text-[14px] text-muted-foreground mb-6">
              New episodes every Monday. Leadership, money, motherhood, and the
              invisible work that runs the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic strength={0.2}>
                <a
                  href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow inline-flex items-center gap-2 bg-brand-pink text-primary-foreground font-sans text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-pink/90 transition-colors"
                  style={{ borderRadius: "50px" }}
                >
                  Subscribe Now
                </a>
              </Magnetic>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border border-foreground/15 px-8 py-4 hover:border-brand-pink hover:text-brand-pink transition-all"
                style={{ borderRadius: "50px" }}
              >
                More Episodes <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
