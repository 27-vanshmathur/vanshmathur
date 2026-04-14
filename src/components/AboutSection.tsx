import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, User } from "lucide-react";

const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <User className="text-primary" size={24} />
          <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
        </div>

        <div className="glass-card p-8 card-lift">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I'm a PGDM student at <span className="text-primary font-semibold">FIIB</span> with a strong interest in <span className="text-primary font-semibold">marketing strategy</span>, <span className="text-secondary font-semibold">brand building</span>, and <span className="text-primary font-semibold">customer behavior</span>. I enjoy understanding how people think and using that insight to create better marketing decisions.
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 text-muted-foreground leading-relaxed border-t border-border/50 pt-6">
                  <p>
                    I like working with both creativity and data to solve real business problems. My journey started with a curiosity about why people make the decisions they do.
                  </p>
                  <p>
                    I've worked on influencer marketing campaigns, retail analysis, and branding projects, where I focused on improving visibility, engagement, and customer experience.
                  </p>
                  <p>
                    I'm someone who likes to <span className="text-secondary font-semibold">think practically</span>, learn fast, and build ideas that actually work in the real world.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-300"
          >
            {expanded ? "Show Less" : "Read My Story"}
            <ChevronRight size={16} className={`transition-transform duration-300 ${expanded ? "rotate-90" : ""}`} />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
