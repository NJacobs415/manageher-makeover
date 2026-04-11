import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

const TextReveal = ({ children, className, delay = 0, direction = "up" }: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const clipFrom = direction === "up" ? "inset(100% 0 0 0)" : direction === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

  return (
    <div ref={ref} className={cn(className)}>
      <div
        style={{
          clipPath: visible ? "inset(0 0 0 0)" : clipFrom,
          transform: visible ? "translateY(0)" : direction === "up" ? "translateY(40px)" : "translateY(0)",
          transition: `clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1) ${delay}ms, transform 0.8s cubic-bezier(0.77, 0, 0.175, 1) ${delay}ms`,
          willChange: "clip-path, transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TextReveal;
