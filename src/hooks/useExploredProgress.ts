import { useEffect, useState } from "react";

const sections = ["about", "skills", "projects", "experience", "contact"];

export const useExploredProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const visited = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visited.has(entry.target.id)) {
            visited.add(entry.target.id);
            changed = true;
          }
        });
        if (changed) {
          setProgress(Math.round((visited.size / sections.length) * 100));
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return progress;
};
