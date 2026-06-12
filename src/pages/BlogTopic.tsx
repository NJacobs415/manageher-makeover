import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, Play, Clock, Calendar } from "lucide-react";
import SEO from "@/components/SEO";
import { slugToTopic, topicToSlug } from "@/lib/topicSlug";

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

const BlogTopic = () => {
  const { topic: topicSlug } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/blog/posts.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const allTopics = [...new Set(posts.flatMap((p) => p.topics))];
  const topic = topicSlug ? slugToTopic(topicSlug, allTopics) : null;

  useEffect(() => {
    if (loaded && posts.length > 0 && !topic) navigate("/blog", { replace: true });
  }, [loaded, posts.length, topic, navigate]);

  const filtered = topic
    ? [...posts]
        .filter((p) => p.topics.includes(topic))
        .sort((a, b) => {
          const dateDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          if (dateDiff !== 0) return dateDiff;
          return b.episodeNumber - a.episodeNumber;
        })
    : [];

  const sisterTopics = allTopics
    .filter((t) => t !== topic)
    .map((t) => ({ name: t, count: posts.filter((p) => p.topics.includes(t)).length }))
    .filter((t) => t.count >= 2)
    .sort((a, b) => b.count - a.count)
    .slice(0, 9);

  const seoTitle = topic
    ? `${topic} Episodes | The Manage Her® Podcast`
    : "Blog | The Manage Her®";
  const seoDescription = topic
    ? `${filtered.length} podcast episodes on ${topic.toLowerCase()} from The Manage Her® — real conversations with women redefining leadership, hosted by Aimee Rickabus.`
    : "Show notes for every episode of The Manage Her® Podcast.";
  const canonicalUrl = topic
    ? `https://themanageher.com/blog/topic/${topicSlug}/`
    : "https://themanageher.com/blog/";

  return (
    <div className="overflow-x-hidden page-enter">
      <SEO
        title={seoTitle}
        description={seoDescription}
        url={canonicalUrl}
        jsonLd={
          topic
            ? {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: `${topic} — The Manage Her® Podcast`,
                url: canonicalUrl,
                description: seoDescription,
                isPartOf: {
                  "@type": "PodcastSeries",
                  name: "The Manage Her Podcast",
                  url: "https://themanageher.com/podcast/",
                },
                breadcrumb: {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://themanageher.com/" },
                    { "@type": "ListItem", position: 2, name: "Blog", item: "https://themanageher.com/blog/" },
                    { "@type": "ListItem", position: 3, name: topic, item: canonicalUrl },
                  ],
                },
              }
            : undefined
        }
      />
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <TextReveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "#c9a96e" }}>
              Topic
            </p>
          </TextReveal>
          <TextReveal delay={100}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {topic ? (
                <>
                  Episodes on <em className="text-brand-pink italic">{topic}</em>
                </>
              ) : (
                "Loading…"
              )}
            </h1>
          </TextReveal>
          {topic && (
            <FadeIn delay={200} y={20}>
              <p
                className="max-w-[640px] mx-auto"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  color: "#999",
                  fontSize: "1.2rem",
                  lineHeight: "1.7",
                }}
              >
                {filtered.length} {filtered.length === 1 ? "conversation" : "conversations"} on{" "}
                {topic.toLowerCase()} from The Manage Her® — real talk with women redefining what
                leadership looks like.
              </p>
            </FadeIn>
          )}
          <FadeIn delay={400} y={20}>
            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:gap-3 transition-all"
              >
                ← All episodes
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Episode grid ─── */}
      <section className="py-20 px-6" style={{ background: "#faf8f5" }}>
        <div className="max-w-[1200px] mx-auto">
          {filtered.length === 0 && loaded && topic && (
            <p className="text-center" style={{ color: "#666" }}>
              No episodes found for this topic yet.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <FadeIn key={post.slug} delay={Math.min(i, 6) * 60} y={20}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    overflow: "hidden",
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      width={640}
                      height={360}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.3)" }}>
                      <div className="w-14 h-14 rounded-full bg-brand-pink flex items-center justify-center">
                        <Play size={20} className="text-white fill-white ml-1" />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1" style={{ background: "rgba(0,0,0,0.7)", color: "#fff", borderRadius: "50px" }}>
                      Ep {post.episodeNumber}
                    </span>
                  </div>
                  <div className="p-5">
                    {post.guestName && (
                      <p className="font-sans text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: "#c9a96e" }}>
                        {post.guestName}
                      </p>
                    )}
                    <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-brand-pink transition-colors" style={{ color: "#1a1a1a", lineHeight: 1.3 }}>
                      {post.title}
                    </h3>
                    <p className="font-sans text-[13px] mb-3" style={{ color: "#666", lineHeight: 1.6 }}>
                      {post.excerpt.slice(0, 130)}…
                    </p>
                    <div className="flex items-center gap-4 font-sans text-[11px]" style={{ color: "#999" }}>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sister topics ─── */}
      {sisterTopics.length > 0 && (
        <section className="py-16 md:py-20 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
          <div className="max-w-[900px] mx-auto text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-pink mb-4">More topics</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-10">
              Keep <em className="text-brand-pink italic">exploring</em>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {sisterTopics.map((t) => (
                <Link
                  key={t.name}
                  to={`/blog/topic/${topicToSlug(t.name)}/`}
                  className="font-sans text-[13px] font-medium px-6 py-3 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#111", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.06)", color: "#999" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(235,24,135,0.3)";
                    e.currentTarget.style.color = "#eb1887";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "#999";
                  }}
                >
                  {t.name}
                  <span className="ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>({t.count})</span>
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:gap-3 transition-all"
              >
                Browse all episodes <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogTopic;
