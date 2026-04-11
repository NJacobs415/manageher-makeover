import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const Parallax = ({ children, speed = 0.3, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const viewH = window.innerHeight;
        const center = rect.top + rect.height / 2 - viewH / 2;
        const y = center * speed * -1;
        ref.current.style.transform = `translateY(${y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
};

export default Parallax;
