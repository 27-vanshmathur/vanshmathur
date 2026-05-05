import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";

const skills = [
  {
    name: "Brand Strategy",
    emoji: "🎯",
    example: "Developed positioning frameworks for NGO branding that increased donor perception and trust metrics.",
  },
  {
    name: "Data Analysis",
    emoji: "📊",
    example: "Used Excel and analytics tools to measure campaign performance at Jio, optimizing ad spend allocation.",
  },
  {
    name: "Digital Marketing",
    emoji: "🚀",
    example: "Ran end-to-end digital campaigns including SEO, social media, and paid ads with measurable ROI tracking.",
  },
  {
    name: "Market Research",
    emoji: "🔍",
    example: "Conducted competitor analysis for Samsung and Decathlon retail strategies, identifying whitespace opportunities.",
  },
  {
    name: "Content Strategy",
    emoji: "✍️",
    example: "Created content calendars and storytelling frameworks that boosted engagement rates across social platforms.",
  },
];

const SkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <Lightbulb className="text-primary" size={24} />
          <h2 className="text-3xl sm:text-4xl font-bold">Skills & Expertise</h2>
        </div>
        <p className="text-muted-foreground mb-10 max-w-2xl">Click any skill to see how I've applied it in real projects.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveSkill(activeSkill === i ? null : i)}
              className="glass-card p-6 cursor-pointer card-lift group"
            >
              <div className="text-3xl mb-3">{skill.emoji}</div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{skill.name}</h3>

              <AnimatePresence>
                {activeSkill === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted-foreground mt-2 border-t border-border/50 pt-3">{skill.example}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-primary/60 mt-2 font-mono">
                {activeSkill === i ? "Click to close" : "Click to explore →"}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
