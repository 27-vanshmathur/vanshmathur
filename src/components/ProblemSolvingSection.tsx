import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, Users, Megaphone } from "lucide-react";

const frameworks = {
  "Brand Growth": {
    icon: TrendingUp,
    steps: [
      { title: "Audit & Research", desc: "Deep-dive into brand perception, competitor positioning, and market gaps." },
      { title: "Consumer Insight Mining", desc: "Identify unmet needs and emotional triggers through qualitative + quantitative research." },
      { title: "Strategic Positioning", desc: "Craft a unique value proposition that resonates with the target audience." },
      { title: "Execution & Measurement", desc: "Launch, A/B test, iterate. Track brand health metrics and optimize." },
    ],
  },
  "Customer Retention": {
    icon: Users,
    steps: [
      { title: "Churn Analysis", desc: "Map where and why customers drop off using behavioral data." },
      { title: "Segmentation", desc: "Group customers by lifecycle stage, value, and engagement patterns." },
      { title: "Personalized Engagement", desc: "Design targeted re-engagement campaigns based on segment insights." },
      { title: "Loyalty Loop Design", desc: "Create feedback loops and reward systems that increase lifetime value." },
    ],
  },
  "Campaign Strategy": {
    icon: Megaphone,
    steps: [
      { title: "Objective Setting", desc: "Define clear, measurable goals aligned with business outcomes." },
      { title: "Audience Mapping", desc: "Build detailed personas and identify the right channels to reach them." },
      { title: "Creative Strategy", desc: "Develop messaging and creative that cuts through noise with psychological hooks." },
      { title: "Optimize & Scale", desc: "Use real-time data to optimize spend, creative, and targeting for maximum ROI." },
    ],
  },
};

type FrameworkKey = keyof typeof frameworks;

const ProblemSolvingSection = () => {
  const [active, setActive] = useState<FrameworkKey | null>(null);

  return (
    <section id="problem-solving" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-primary" size={24} />
          <h2 className="text-3xl sm:text-4xl font-bold">How I Solve Marketing Problems</h2>
        </div>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Pick a challenge and see my structured thinking framework in action.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {(Object.keys(frameworks) as FrameworkKey[]).map((key) => {
            const Icon = frameworks[key].icon;
            return (
              <button
                key={key}
                onClick={() => setActive(active === key ? null : key)}
                className={`glow-btn px-5 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                  active === key
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                <Icon size={18} /> {key}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-bold mb-6 text-primary">{active} Framework</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {frameworks[active].steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 rounded-lg bg-muted/30"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{step.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ProblemSolvingSection;
