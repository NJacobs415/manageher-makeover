import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  // Show the final value with no count-up (prerendered first load).
  instant?: boolean;
}

const AnimatedCounter = ({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
  instant = false,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(instant ? target : 0);
  const [hasStarted, setHasStarted] = useState(instant);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (instant) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, instant]);

  useEffect(() => {
    if (!hasStarted || instant) return;

    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration, instant]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
