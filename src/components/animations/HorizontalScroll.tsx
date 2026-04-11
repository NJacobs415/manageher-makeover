import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

const HorizontalScroll = ({ children, className }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    if (!container || !scrollContent) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const containerH = container.offsetHeight;

      if (rect.top < viewH && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (containerH + viewH)));
        const maxScroll = scrollContent.scrollWidth - window.innerWidth;
        setTranslateX(-progress * maxScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)} style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 px-6 lg:px-10 transition-transform duration-100 ease-out"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
