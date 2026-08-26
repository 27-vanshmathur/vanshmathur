import { motion } from "framer-motion";
import { Rocket, BarChart3 } from "lucide-react";
import photoAsset from "@/assets/main-photo.png.asset.json";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full opacity-10 blur-3xl animate-float" style={{ background: "hsl(195, 100%, 50%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full opacity-10 blur-3xl animate-float" style={{ background: "hsl(260, 80%, 60%)", animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 flex justify-center"
        >
          <div className="relative group">
            <img
              src={photoAsset.url}
              alt="Vansh Mathur professional portrait"
              className="w-36 h-44 sm:w-44 sm:h-56 md:w-48 md:h-60 object-cover object-top rounded-2xl border border-border/60 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute -inset-1 rounded-2xl bg-primary/10 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4"
        >
          Hi, I'm{" "}
          <span className="gradient-text">Vansh Mathur</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4"
        >
          Marketing Strategist | Brand Communication | Digital Growth
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm sm:text-base text-muted-foreground/80 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          PGDM student at FIIB with a passion for marketing strategy, consumer insights, and brand building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="glow-btn w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
          >
            <Rocket size={18} /> Explore My Work
          </button>
          <button
            onClick={() => scrollTo("experience")}
            className="glow-btn w-full sm:w-auto px-6 py-3 rounded-lg border border-secondary/40 text-secondary font-semibold flex items-center justify-center gap-2 hover:bg-secondary/10"
          >
            <BarChart3 size={18} /> My Impact
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
