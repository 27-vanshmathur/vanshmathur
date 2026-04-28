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
            Management graduate currently pursuing a <span className="text-primary font-semibold">Post Graduate Diploma in Management (PGDM)</span> at <span className="text-primary font-semibold">Fortune Institute of International Business (FIIB)</span>, with a strong focus on <span className="text-primary font-semibold">marketing</span>, <span className="text-secondary font-semibold">consumer insights</span>, and <span className="text-primary font-semibold">data-driven decision-making</span>.
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
                    Gained hands-on experience as a <span className="text-secondary font-semibold">Marketing & Growth Intern at Reliance Jio</span>, contributing to influencer marketing campaigns, cross-platform digital promotions, and performance analysis. Worked on campaign metrics, market research, and competitor analysis to support strategies aimed at improving brand visibility and customer engagement.
                  </p>
                  <p>
                    Proficient in <span className="text-primary font-semibold">MS Excel (Advanced)</span>, with working knowledge of <span className="text-primary font-semibold">Power BI</span>, <span className="text-primary font-semibold">Python</span>, and <span className="text-primary font-semibold">Zoho Sheets</span>.
                  </p>
                  <p>
                    Actively seeking entry-level opportunities in <span className="text-secondary font-semibold">marketing, growth, analytics, or management</span>, where I can apply analytical thinking, contribute to strategic initiatives, and drive meaningful business outcomes.
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
