import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/animations/PageTransition";
import { usePageTracking } from "@/hooks/usePageTracking";
import Index from "@/pages/Index";

// Index page ships in the main bundle so the homepage is interactive
// without a chunk fetch. Every other page lazy-loads its chunk on first
// navigation — keeps the entry bundle small for first paint / TTI.
const About = lazy(() => import("@/pages/About"));
const Podcast = lazy(() => import("@/pages/Podcast"));
const Book = lazy(() => import("@/pages/Book"));
const Press = lazy(() => import("@/pages/Press"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const BlogTopic = lazy(() => import("@/pages/BlogTopic"));
const Legal = lazy(() => import("@/pages/Legal"));
const Links = lazy(() => import("@/pages/Links"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Minimal placeholder while a lazy route loads. Dark to match the
// app's near-black background so it doesn't flash white on transitions.
const RouteFallback = () => (
  <div aria-hidden="true" style={{ minHeight: "100vh", background: "#0a0a0a" }} />
);

const AnimatedRoutes = () => {
  const location = useLocation();
  usePageTracking();

  return (
    <AnimatePresence mode="wait">
      {/* Suspense lives INSIDE AnimatePresence and carries the same
          location key, so AnimatePresence still sees a keyed child and
          runs PageTransition exit animations on lazy-route navigation. */}
      <Suspense key={location.pathname} fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/podcast" element={<PageTransition><Podcast /></PageTransition>} />
          <Route path="/book" element={<PageTransition><Book /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/topic/:topic" element={<PageTransition><BlogTopic /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="/press" element={<PageTransition><Press /></PageTransition>} />
          <Route path="/legal" element={<PageTransition><Legal /></PageTransition>} />
          <Route path="/links" element={<Links />} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
