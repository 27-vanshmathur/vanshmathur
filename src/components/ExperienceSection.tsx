import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown } from "lucide-react";

const experiences = [
  {
    role: "Summer Intern — Behavioural Finance & Investor Research",
    company: "Bajaj Capital Ltd.",
    period: "2026",
    contributions: [
      "Led a behavioural research study on investor trust and risk perception toward mutual funds, surveying 100+ retail investors",
      "Designed structured questionnaires and segmented findings across age, income, and risk-appetite cohorts",
      "Built an AI-assisted communication workflow using ChatGPT, cutting advisory drafting time by ~40%",
      "Simplified SIP, NAV, and compounding concepts into plain-language explainers used in walk-in conversations",
      "Identified 5 dominant behavioural biases driving SIP discontinuation and presented mitigation strategies to senior advisors",
    ],
    learning: "Investor decisions are 70% behaviour, 30% numbers — trust is built through clarity, not complexity. AI is a powerful co-pilot for advisory, but only when paired with human empathy.",
  },
  {
    role: "Marketing Intern",
    company: "Jio",
    period: "2024",
    contributions: [
      "Designed influencer marketing campaigns targeting Gen Z in tier-2 cities",
      "Analyzed campaign performance data to optimize ad spend allocation",
      "Created content strategies for social media platforms with 2M+ reach",
    ],
    learning: "Learned how large-scale campaigns operate and the importance of data in every marketing decision.",
  },
  {
    role: "Brand Strategist (Pro Bono)",
    company: "NGO",
    period: "2023",
    contributions: [
      "Repositioned brand identity with storytelling-first approach",
      "Designed new visual identity and communication framework",
      "Grew social media presence by 3x in 4 months",
    ],
    learning: "Branding for a cause requires emotional depth — it's not about selling, it's about making people feel part of something bigger.",
  },
];

const ExperienceSection = () => {
  const [activeExp, setActiveExp] = useState<number | null>(null);

  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-10">
          <Briefcase className="text-primary" size={24} />
          <h2 className="text-3xl sm:text-4xl font-bold">Experience</h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <div className={`absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 transition-colors ${activeExp === i ? "bg-primary border-primary" : "bg-muted border-border"}`} />

                <div
                  onClick={() => setActiveExp(activeExp === i ? null : i)}
                  className="glass-card p-6 cursor-pointer card-lift"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-primary">{exp.period}</span>
                      <h3 className="font-bold text-lg">{exp.role}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-muted-foreground transition-transform duration-300 ${activeExp === i ? "rotate-180" : ""}`}
                    />
                  </div>

                  <AnimatePresence>
                    {activeExp === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold text-primary mb-2">Key Contributions</h4>
                            <ul className="space-y-1">
                              {exp.contributions.map((c) => (
                                <li key={c} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-1">▸</span> {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-secondary mb-1">Key Learning</h4>
                            <p className="text-sm text-muted-foreground italic">{exp.learning}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
