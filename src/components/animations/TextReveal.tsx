import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  // Above-the-fold use (hero): paint immediately and animate transform only —
  // no IntersectionObserver wait and no clip-path, which would keep the text
  // unpainted (and out of the running for LCP) until the reveal finishes.
  immediate?: boolean;
}

const TextReveal = ({ children, className, delay = 0, direction = "up", immediate = false }: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      // Two frames so the start transform is committed before transitioning.
      let id = requestAnimationFrame(() => {
        id = requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(id);
    }
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
  }, [immediate]);

  const clipFrom = direction === "up" ? "inset(100% 0 0 0)" : direction === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

  const ease = "0.8s cubic-bezier(0.77, 0, 0.175, 1)";
  const translate = visible ? "translateY(0)" : direction === "up" ? "translateY(40px)" : "translateY(0)";

  if (immediate) {
    return (
      <div ref={ref} className={cn(className)}>
        <div
          style={{
            transform: translate,
            transition: `transform ${ease} ${delay}ms`,
            willChange: "transform",
          }}
        >
          {children}
        </div>
      </div>
    );
  }

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
