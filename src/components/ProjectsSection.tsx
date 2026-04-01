import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, X, ArrowRight } from "lucide-react";

interface Project {
  title: string;
  tag: string;
  brief: string;
  tabs: {
    overview: string;
    thinking: string;
    outcome: string;
  };
}

const projects: Project[] = [
  {
    title: "Retail Behavior Analysis – Haldiram's / Samsung / Decathlon",
    tag: "Consumer Insights",
    brief: "Analyzed in-store consumer behavior patterns to optimize product placement and promotional strategies.",
    tabs: {
      overview:
        "Retail brands were seeing high footfall but low conversion. The gap between browsing and buying needed to be understood at a psychological level.",
      thinking:
        "I conducted observational studies and mapped customer journeys in-store. Identified key decision points, dwell time zones, and impulse purchase triggers. Cross-referenced with sales data to find correlations.",
      outcome:
        "Recommendations led to a projected 15% increase in impulse purchases at Haldiram's. Samsung store layout insights improved product demo engagement by an estimated 20%.",
    },
  },
  {
    title: "NGO Branding Strategy",
    tag: "Brand Building",
    brief: "Repositioned an NGO's brand identity to attract more donations and volunteers through storytelling.",
    tabs: {
      overview:
        "The NGO had strong impact but weak visibility. Their messaging was functional, not emotional. Potential supporters couldn't connect with the cause on a personal level.",
      thinking:
        "I applied the 'Hero's Journey' framework to their communication — making the beneficiary the hero and the supporter the enabler. Redesigned visual identity to feel hopeful yet urgent.",
      outcome:
        "Social media following grew 3x in 1 month. Donation inquiry rate increased by an estimated 40%. The new brand kit became their standard for all future communications.",
    },
  },
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "thinking" | "outcome">("overview");

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <FolderOpen className="text-primary" size={24} />
          <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
        </div>
        <p className="text-muted-foreground mb-10 max-w-2xl">Click any project to dive into the full case study.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                setActiveProject(i);
                setActiveTab("overview");
              }}
              className="glass-card p-6 cursor-pointer card-lift group"
            >
              <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">{project.tag}</span>
              <h3 className="font-bold text-xl mt-4 mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{project.brief}</p>
              <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                View Case Study <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {projects[activeProject].tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-3">{projects[activeProject].title}</h3>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-border/50 pb-3">
                {(["overview", "thinking", "outcome"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {tab === "thinking" ? "My Thinking" : tab}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground leading-relaxed text-base"
              >
                {projects[activeProject].tabs[activeTab]}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
