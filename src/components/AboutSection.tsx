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
            I'm a marketing strategist who blends <span className="text-primary font-semibold">customer behavior</span> with <span className="text-secondary font-semibold">data-driven insights</span> to build brands that resonate. I don't just follow trends — I decode why people buy, click, and stay loyal.
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
                    My journey started with a curiosity about why people make the decisions they do. As a student, I dove deep into consumer behavior, behavioral economics, and the science behind attention.
                  </p>
                  <p>
                    Through internships at <span className="text-primary">Jio</span>, hands-on retail analysis at brands like <span className="text-primary">Haldiram's</span>, <span className="text-primary">Samsung</span>, and <span className="text-primary">Decathlon</span>, I learned that great marketing isn't about shouting louder — it's about understanding deeper.
                  </p>
                  <p>
                    Today, I approach every marketing challenge with an <span className="text-secondary font-semibold">insights-first mindset</span>: research the audience, find the psychological hook, craft a strategy, and measure impact. That's how I turn brands into movements.
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
