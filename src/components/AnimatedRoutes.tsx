import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/animations/PageTransition";
import { usePageTracking } from "@/hooks/usePageTracking";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Podcast from "@/pages/Podcast";
import Book from "@/pages/Book";
import Press from "@/pages/Press";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Legal from "@/pages/Legal";
import Links from "@/pages/Links";
import NotFound from "@/pages/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();
  usePageTracking();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/podcast" element={<PageTransition><Podcast /></PageTransition>} />
        <Route path="/book" element={<PageTransition><Book /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/press" element={<PageTransition><Press /></PageTransition>} />
        <Route path="/legal" element={<PageTransition><Legal /></PageTransition>} />
        <Route path="/links" element={<Links />} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
