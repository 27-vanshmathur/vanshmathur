import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Brain, BarChart3 } from "lucide-react";

const roles = [
  "Marketing Strategist",
  "Customer Behavior Enthusiast",
  "Brand Growth Specialist",
  "Data-Driven Thinker",
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(role.substring(0, displayText.length + 1));
          if (displayText.length === role.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setDisplayText(role.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float" style={{ background: "hsl(195, 100%, 50%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl animate-float" style={{ background: "hsl(260, 80%, 60%)", animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-bold mb-6"
        >
          Hi, I'm{" "}
          <span className="gradient-text">Vansh Mathur</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-10 mb-10 flex items-center justify-center"
        >
          <span className="text-xl sm:text-2xl text-primary font-mono">
            {displayText}
          </span>
          <span className="w-0.5 h-7 bg-primary ml-1 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="glow-btn px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2"
          >
            <Rocket size={18} /> Explore My Work
          </button>
          <button
            onClick={() => scrollTo("problem-solving")}
            className="glow-btn px-6 py-3 rounded-lg border border-primary/40 text-primary font-semibold flex items-center gap-2 hover:bg-primary/10"
          >
            <Brain size={18} /> How I Think
          </button>
          <button
            onClick={() => scrollTo("experience")}
            className="glow-btn px-6 py-3 rounded-lg border border-secondary/40 text-secondary font-semibold flex items-center gap-2 hover:bg-secondary/10"
          >
            <BarChart3 size={18} /> My Impact
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
