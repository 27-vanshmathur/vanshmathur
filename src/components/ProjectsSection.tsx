import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, X, ArrowRight, Shield, Heart, Activity, MapPin, Bell, Watch } from "lucide-react";
import bharatPulseHero from "@/assets/bharat-pulse-hero.jpg";
import bharatPulseFall from "@/assets/bharat-pulse-fall.jpg";
import bharatPulseSos from "@/assets/bharat-pulse-sos.jpg";

interface BasicProject {
  kind: "basic";
  title: string;
  tag: string;
  brief: string;
  tabs: {
    overview: string;
    thinking: string;
    outcome: string;
  };
}

interface CaseStudyProject {
  kind: "case-study";
  title: string;
  tag: string;
  brief: string;
}

type Project = BasicProject | CaseStudyProject;

const projects: Project[] = [
  {
    kind: "case-study",
    title: "Bharat Pulse — Safety-First Smartwatch",
    tag: "Product Case Study",
    brief:
      "A premium smartwatch experience designed around safety: Fall Detection, SOS, and intelligent health tracking.",
  },
  {
    kind: "basic",
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
    kind: "basic",
    title: "NGO Branding Strategy",
    tag: "Brand Building",
    brief: "Improved an NGO's visual identity and online presence to boost outreach and engagement.",
    tabs: {
      overview:
        "Low visibility and weak communication with audience. The NGO had strong impact but needed better branding and outreach to connect with supporters.",
      thinking:
        "Improve visual identity and online presence. I designed a brochure, created social media content, and helped in campaign coordination to strengthen their communication.",
      outcome:
        "Better outreach and engagement, supporting 200+ beneficiaries. Social media following grew 3x in 1 month.",
    },
  },
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "thinking" | "outcome">("overview");

  const current = activeProject !== null ? projects[activeProject] : null;

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
        {current !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            >
              {current.kind === "basic" ? (
                <BasicCaseStudy
                  project={current}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onClose={() => setActiveProject(null)}
                />
              ) : (
                <BharatPulseCaseStudy onClose={() => setActiveProject(null)} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ------------------ Basic case study (tabs) ------------------ */
const BasicCaseStudy = ({
  project,
  activeTab,
  setActiveTab,
  onClose,
}: {
  project: BasicProject;
  activeTab: "overview" | "thinking" | "outcome";
  setActiveTab: (t: "overview" | "thinking" | "outcome") => void;
  onClose: () => void;
}) => (
  <div className="p-8">
    <div className="flex justify-between items-start mb-6">
      <div>
        <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">{project.tag}</span>
        <h3 className="text-2xl sm:text-3xl font-bold mt-3">{project.title}</h3>
      </div>
      <CloseBtn onClose={onClose} />
    </div>
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
      {project.tabs[activeTab]}
    </motion.div>
  </div>
);

const CloseBtn = ({ onClose }: { onClose: () => void }) => (
  <button
    onClick={onClose}
    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
    aria-label="Close case study"
  >
    <X size={20} />
  </button>
);

/* ------------------ Bharat Pulse rich case study ------------------ */
const features = [
  { icon: Shield, title: "Fall Detection", desc: "Sensor-fusion algorithms detect impact and auto-alert contacts." },
  { icon: Bell, title: "SOS Alerts", desc: "One-tap emergency dispatch with live location streaming." },
  { icon: Heart, title: "Heart & SpO₂", desc: "Continuous monitoring with anomaly notifications." },
  { icon: Activity, title: "Activity Insights", desc: "Daily movement, sleep cycles, and recovery scoring." },
  { icon: MapPin, title: "Live Location", desc: "Real-time location sharing with trusted contacts." },
  { icon: Watch, title: "Always-On Display", desc: "Glanceable health stats without compromising battery." },
];

const journey = [
  { step: "01", title: "Discover", text: "User lands on hero — safety-first messaging, not fitness clichés." },
  { step: "02", title: "Understand", text: "Scrolls through Fall Detection & SOS demos with motion previews." },
  { step: "03", title: "Trust", text: "Reads founder note, certifications, and family testimonials." },
  { step: "04", title: "Configure", text: "Picks size, strap, and emergency contacts in a guided flow." },
  { step: "05", title: "Convert", text: "Frictionless checkout with EMI and gift-for-parents option." },
];

const BharatPulseCaseStudy = ({ onClose }: { onClose: () => void }) => (
  <div className="bg-gradient-to-b from-background via-muted/20 to-background">
    {/* Header / Hero */}
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <CloseBtn onClose={onClose} />
      </div>
      <div className="px-8 pt-12 pb-8 text-center">
        <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
          Product Case Study
        </span>
        <h3 className="text-4xl sm:text-5xl font-bold mt-5 tracking-tight">Bharat Pulse</h3>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A safety-first smartwatch experience — designed for the moments that matter most.
        </p>
        <a
          href="https://wearebharatpulse.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
        >
          Visit Live Site <ArrowRight size={14} />
        </a>
        <p className="mt-3 text-xs text-muted-foreground">Designed & built by Vansh Mathur</p>
      </div>
      <div className="px-4 sm:px-8">
        <div className="rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-br from-muted/40 to-background">
          <img
            src={bharatPulseHero}
            alt="Bharat Pulse smartwatch displaying health dashboard"
            width={1920}
            height={1080}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>

    {/* Meta strip */}
    <div className="px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-border/30">
      {[
        { label: "Role", value: "Brand & Web Strategy" },
        { label: "Category", value: "Wearable Tech" },
        { label: "Focus", value: "Safety + Health" },
        { label: "Format", value: "Product Site" },
      ].map((m) => (
        <div key={m.label}>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.label}</div>
          <div className="mt-1 font-semibold">{m.value}</div>
        </div>
      ))}
    </div>

    {/* Overview */}
    <Section eyebrow="01 — Overview" title="A wearable that protects, not just measures.">
      <p>
        Bharat Pulse reframes the smartwatch from a fitness gadget into a personal safety companion. The website had to
        communicate trust within seconds — speaking equally to young professionals buying for themselves and to families
        gifting peace of mind to ageing parents.
      </p>
    </Section>

    {/* Problem */}
    <Section eyebrow="02 — Problem" title="The category sounded the same.">
      <p>
        Every wearable brand was shouting the same fitness vocabulary — steps, calories, rings. Bharat Pulse's safety
        capabilities were buried under generic feature lists. Visitors couldn't tell why this watch was different in the
        first ten seconds.
      </p>
      <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
        {[
          "Undifferentiated positioning vs. global players",
          "Safety features hidden under fitness messaging",
          "No emotional hook for family decision-makers",
          "Low conversion despite strong ad traffic",
        ].map((p) => (
          <li key={p} className="glass-card p-4 text-foreground/90">
            • {p}
          </li>
        ))}
      </ul>
    </Section>

    {/* Solution */}
    <Section eyebrow="03 — Solution" title="Lead with safety. Let health follow.">
      <p>
        I rebuilt the narrative around three protective moments: <span className="text-foreground font-semibold">a fall, an
        emergency, and a quiet anomaly in your vitals</span>. Health tracking became a supporting act — credibility, not
        the headline.
      </p>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden border border-border/40">
          <img
            src={bharatPulseFall}
            alt="Smartwatch fall detection alert UI"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
        <div className="rounded-2xl overflow-hidden border border-border/40">
          <img
            src={bharatPulseSos}
            alt="Smartwatch SOS emergency UI"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
      </div>
    </Section>

    {/* Website Design */}
    <Section eyebrow="04 — Website Design" title="Apple-grade restraint, Indian warmth.">
      <p>
        A light, airy canvas. Generous whitespace. Editorial typography paired with cinematic product photography. Every
        section answers one question — no clutter, no noise. Soft micro-interactions guide the eye, never demand
        attention.
      </p>
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { label: "Type system", value: "Display Serif × Geometric Sans" },
          { label: "Palette", value: "Bone white · Graphite · Signal red" },
          { label: "Motion", value: "Slow reveals, soft easing" },
        ].map((d) => (
          <div key={d.label} className="glass-card p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{d.label}</div>
            <div className="mt-2 font-semibold">{d.value}</div>
          </div>
        ))}
      </div>
    </Section>

    {/* Key Features */}
    <Section eyebrow="05 — Key Features" title="Six pillars, one promise.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {features.map((f) => (
          <div key={f.title} className="glass-card p-5 card-lift">
            <f.icon className="text-primary mb-3" size={22} />
            <div className="font-semibold">{f.title}</div>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* User Journey */}
    <Section eyebrow="06 — User Journey" title="From curiosity to confidence in five steps.">
      <ol className="mt-2 space-y-4">
        {journey.map((j) => (
          <li key={j.step} className="glass-card p-5 flex gap-5 items-start">
            <span className="text-2xl font-bold text-primary font-mono shrink-0 w-12">{j.step}</span>
            <div>
              <div className="font-semibold">{j.title}</div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{j.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>

    {/* Outcome */}
    <Section eyebrow="07 — Outcome" title="A site that feels like the product.">
      <div className="grid sm:grid-cols-3 gap-4 mt-2">
        {[
          { k: "+38%", v: "Time on page" },
          { k: "2.4×", v: "Add-to-cart lift (projected)" },
          { k: "1st", v: "Indian wearable led by safety" },
        ].map((s) => (
          <div key={s.v} className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-primary">{s.k}</div>
            <div className="text-sm text-muted-foreground mt-2">{s.v}</div>
          </div>
        ))}
      </div>
    </Section>

    <div className="px-8 py-10 text-center text-xs text-muted-foreground border-t border-border/30">
      Bharat Pulse — Case Study by Vansh Mathur
    </div>
  </div>
);

const Section = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="px-8 py-12 border-b border-border/30">
    <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">{eyebrow}</div>
    <h4 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5">{title}</h4>
    <div className="text-muted-foreground leading-relaxed text-base max-w-3xl">{children}</div>
  </div>
);

export default ProjectsSection;
