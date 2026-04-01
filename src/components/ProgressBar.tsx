import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = ["about", "skills", "projects", "experience", "problem-solving", "contact"];

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisitedSections((prev) => {
              const next = new Set(prev);
              next.add(entry.target.id);
              return next;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setProgress(Math.round((visitedSections.size / sections.length) * 100));
  }, [visitedSections]);

  if (progress === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="h-1 bg-muted/30">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, hsl(195, 100%, 50%), hsl(260, 80%, 60%))" }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="absolute right-4 top-3 text-xs font-mono text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
        {progress}% explored
      </div>
    </motion.div>
  );
};

export default ProgressBar;
