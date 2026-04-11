import { useState, useEffect } from "react";

const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 300);
          setTimeout(() => setHidden(true), 1200);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 60);
    return () => clearInterval(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-foreground"
      style={{
        clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
        transition: "clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    >
      <div className="text-center">
        <p className="font-serif text-3xl md:text-5xl text-background tracking-tight mb-2">
          The Manage<em className="text-brand-pink italic">Her</em>
          <span className="text-brand-pink text-lg align-super">™</span>
        </p>
        <div className="w-48 h-px bg-background/20 mx-auto mt-6 overflow-hidden">
          <div
            className="h-full bg-brand-pink transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
