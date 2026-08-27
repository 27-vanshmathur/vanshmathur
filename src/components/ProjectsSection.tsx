import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, X, ArrowRight, Shield, Heart, Activity, MapPin, Bell, Watch, Brain, Gauge, LineChart, Sparkles, Repeat, MessageSquare, ExternalLink } from "lucide-react";
import bharatPulseHero from "@/assets/bharat-pulse-hero.jpg";
import bharatPulseFall from "@/assets/bharat-pulse-fall.jpg";
import bharatPulseSos from "@/assets/bharat-pulse-sos.jpg";
import wealthLensHero from "@/assets/wealthlens-hero.jpg";

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
  kind: "case-study" | "wealthlens" | "crocs";
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
    kind: "crocs",
    title: "Crocs India",
    tag: "Brand Strategy · Consumer Behaviour · Gen Z · Social Media",
    brief:
      "Decoding how Crocs turned an unconventional product into a culturally relevant and self expressive brand, and developing a Gen Z focused campus strategy.",
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
  {
    kind: "wealthlens",
    title: "WealthLens AI",
    tag: "AI · FinTech · Consumer Behaviour · Product Strategy",
    brief: "AI powered investor intelligence dashboard.",
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
              <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">{project.tag}</span>
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
              ) : current.kind === "crocs" ? (
                <CrocsCaseStudy onClose={() => setActiveProject(null)} />
              ) : current.kind === "wealthlens" ? (
                <WealthLensCaseStudy onClose={() => setActiveProject(null)} />

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
        <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">{project.tag}</span>
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
        <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
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
            <span className="text-2xl font-bold text-primary shrink-0 w-12">{j.step}</span>
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

/* ------------------ WealthLens AI case study ------------------ */
const wlFeatures = [
  { icon: Brain, title: "AI Portfolio Insights", desc: "AI analyses portfolio information and presents important observations in simple language." },
  { icon: Gauge, title: "Risk Perception Analysis", desc: "Helps identify whether an investor's perceived risk aligns with the risk profile of their investments." },
  { icon: Activity, title: "Investor Behaviour Insights", desc: "Highlights behavioural patterns that may influence investment decisions." },
  { icon: Repeat, title: "SIP Intelligence", desc: "Helps investors understand SIP progress, consistency and long term investment behaviour." },
  { icon: MessageSquare, title: "Personalised Explanations", desc: "Converts complex financial information into easy to understand explanations." },
  { icon: LineChart, title: "Portfolio Health Score", desc: "A simple visual score representing overall portfolio health based on selected parameters." },
];

const wlJourney = [
  "Investor enters basic investment information",
  "WealthLens analyses portfolio",
  "AI identifies behavioural and risk patterns",
  "Dashboard generates insights",
  "Investor receives personalised explanations",
  "Investor makes more informed decisions",
];

const WealthLensCaseStudy = ({ onClose }: { onClose: () => void }) => {
  const goTo = (id: string) => {
    onClose();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  return (
    <div className="bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <CloseBtn onClose={onClose} />
        </div>
        <div className="px-6 sm:px-8 pt-12 pb-8 text-center">
          <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
            AI + FinTech + Investor Behaviour + Product Strategy
          </span>
          <h3 className="text-4xl sm:text-5xl font-bold mt-5 tracking-tight">WealthLens AI</h3>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            An AI powered investor intelligence concept designed to simplify mutual fund investing by combining
            investor behaviour, risk perception, portfolio insights, and personalised explanations into one
            intuitive dashboard.
          </p>
          <p className="mt-4 text-xs text-muted-foreground max-w-2xl mx-auto">
            An AI powered solution concept developed as part of my PGDM CIP project with reference to Bajaj Capital Ltd.
            It is a student led concept — not a commercially deployed Bajaj Capital product.
          </p>
        </div>
        <div className="px-4 sm:px-8">
          <div className="rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-br from-muted/40 to-background">
            <img
              src={wealthLensHero}
              alt="WealthLens AI investor intelligence dashboard concept"
              width={1920}
              height={1088}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-border/30">
        {[
          { label: "Role", value: "Research & Product Strategy" },
          { label: "Category", value: "AI + FinTech" },
          { label: "Focus", value: "Investor Behaviour" },
          { label: "Format", value: "Concept Dashboard" },
        ].map((m) => (
          <div key={m.label}>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.label}</div>
            <div className="mt-1 font-semibold">{m.value}</div>
          </div>
        ))}
      </div>

      <Section eyebrow="Context" title="Built from behavioural research.">
        <p>
          Developed as part of my PGDM CIP project with reference to Bajaj Capital Ltd. Research focus:{" "}
          <span className="text-foreground font-semibold">
            “A Behavioural Analysis of Investor Trust and Risk Perception Towards Mutual Fund Investments.”
          </span>{" "}
          The study explored how investor trust, risk perception, financial understanding and behavioural factors
          influence mutual fund investment decisions. WealthLens AI was conceptualised as a practical AI enabled
          solution to make investment information easier to understand and more actionable.
        </p>
      </Section>

      <Section eyebrow="01 — The Problem" title="Financial information feels complicated.">
        <p>
          Mutual fund investors often struggle to understand portfolio performance, risk, market movements and whether
          their investments align with their personal risk perception. That complexity creates uncertainty and reduces
          investor confidence.
        </p>
      </Section>

      <Section eyebrow="02 — The Insight" title="Decisions are behavioural, not just financial.">
        <p>
          Investment decisions are not driven purely by financial returns. Investor trust, risk perception, financial
          understanding and behavioural responses influence how investors interpret and act on investment information.
        </p>
      </Section>

      <Section eyebrow="03 — The Solution" title="Complex data, translated into personal insight.">
        <p>
          WealthLens AI is a conceptual AI powered investor intelligence dashboard that translates complex investment
          information into simple, personalised insights.
        </p>
        <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
          {[
            "Portfolio performance",
            "Risk level",
            "Investment behaviour",
            "SIP progress",
            "Fund level insights",
            "Risk perception",
            "Personalised AI explanations",
          ].map((s) => (
            <li key={s} className="glass-card p-4 text-foreground/90">• {s}</li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="04 — Key Features" title="Six intelligent building blocks.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {wlFeatures.map((f) => (
            <div key={f.title} className="glass-card p-5 card-lift">
              <f.icon className="text-primary mb-3" size={22} />
              <div className="font-semibold">{f.title}</div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="05 — User Journey" title="From raw numbers to informed decisions.">
        <ol className="mt-2 space-y-3">
          {wlJourney.map((j, i) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 flex gap-4 items-center"
            >
              <span className="text-lg font-bold text-primary shrink-0 w-8">{`0${i + 1}`}</span>
              <span className="text-sm sm:text-base text-foreground/90">{j}</span>
            </motion.li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="06 — My Role" title="A student led product and research project.">
        <div className="grid sm:grid-cols-2 gap-3 text-sm mt-2">
          {[
            "Market and consumer research",
            "Investor behaviour analysis",
            "Problem identification",
            "AI solution conceptualisation",
            "Dashboard and UX thinking",
            "Product positioning",
            "Marketing and communication strategy",
          ].map((r) => (
            <div key={r} className="glass-card p-4 text-foreground/90">• {r}</div>
          ))}
        </div>
      </Section>

      <Section eyebrow="07 — Expected Impact" title="Potential value, not claimed results.">
        <div className="grid sm:grid-cols-2 gap-3 text-sm mt-2">
          {[
            "Simplifies complex investment information",
            "Improves investor understanding",
            "Makes risk easier to interpret",
            "Encourages more informed decision making",
            "Creates a more personalised investor experience",
            "Bridges the gap between financial data and investor understanding",
          ].map((r) => (
            <div key={r} className="glass-card p-4 text-foreground/90">• {r}</div>
          ))}
        </div>
      </Section>

      <Section eyebrow="08 — What I Learned" title="Consumer insight to communication.">
        <div className="flex flex-wrap gap-2 mb-5 text-xs">
          {["Consumer Insight", "Problem Definition", "AI Solution", "Product Experience", "Communication"].map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold">{s}</span>
          ))}
        </div>
        <p>
          Building WealthLens showed me how marketing, consumer behaviour, AI and product thinking work together to
          solve a real business problem — research uncovers the behaviour, the behaviour defines the problem, AI shapes
          the solution, product design makes it usable, and communication makes it believable.
        </p>
      </Section>

      {/* Interactive CTA */}
      <div className="px-6 sm:px-8 py-12 text-center border-b border-border/30">
        <a
          href="https://chatgpt.com/g/g-6a391c88bc748191834d12f69a6a292c-wealthlens-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
        >
          <Sparkles size={16} /> Explore WealthLens AI <ExternalLink size={14} />
        </a>
        <p className="mt-3 text-sm text-muted-foreground">Explore the interactive AI concept behind this project.</p>
      </div>

      {/* Final CTA */}
      <div className="px-6 sm:px-8 py-12 text-center">
        <h4 className="text-xl sm:text-2xl font-bold mb-5">Interested in how I approach real business problems?</h4>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => goTo("projects")}
            className="px-6 py-3 rounded-full glass-card font-semibold text-sm hover:text-primary transition-all"
          >
            View More Projects
          </button>
          <button
            onClick={() => goTo("contact")}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};


/* ------------------ Crocs India case study ------------------ */
const crocsTabs = ["overview", "thinking", "outcome"] as const;
type CrocsTab = (typeof crocsTabs)[number];

const CrocsCaseStudy = ({ onClose }: { onClose: () => void }) => {
  const [tab, setTab] = useState<CrocsTab>("overview");

  const goTo = (id: string) => {
    onClose();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  return (
    <div className="bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="relative px-6 sm:px-8 pt-12 pb-8 text-center">
        <div className="absolute top-4 right-4 z-10">
          <CloseBtn onClose={onClose} />
        </div>
        <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
          Brand Strategy · Consumer Behaviour · Gen Z · Social Media
        </span>
        <h3 className="text-4xl sm:text-5xl font-bold mt-5 tracking-tight">Crocs India</h3>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          How an “ugly” shoe became a cultural identity — and how that same self expression can be activated on
          Indian campuses through <span className="text-foreground font-semibold">Croc Campus Canvas</span>.
        </p>
        <p className="mt-4 text-xs text-muted-foreground max-w-2xl mx-auto">
          An independent academic brand strategy project. Not an official Crocs India campaign. “Your Crocs, Your
          Rang” is referenced as an existing Crocs India campaign.
        </p>
      </div>

      <div className="px-6 sm:px-8 pb-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-border/30">
        {[
          { label: "Role", value: "Brand & Campaign Strategy" },
          { label: "Category", value: "Fashion / Lifestyle" },
          { label: "Audience", value: "Gen Z, 18–24" },
          { label: "Focus", value: "Self Expression" },
        ].map((m) => (
          <div key={m.label}>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.label}</div>
            <div className="mt-1 font-semibold">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-6 sm:px-8 pt-8">
        <div className="flex flex-wrap gap-2 border-b border-border/50 pb-3">
          {crocsTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {t === "thinking" ? "My Thinking" : t}
            </button>
          ))}
        </div>
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {tab === "overview" && (
          <>
            <Section eyebrow="Problem" title="Individuality is accepted, but not activated.">
              <p>
                Crocs India has already made self expression acceptable through “Come As You Are” and “Your Crocs,
                Your Rang”. But among Indian college students, Crocs is still bought as a comfort shoe first. The
                brand owns comfort and quirk, yet the everyday cultural moment — the campus — remains unclaimed.
                There is a visible gap between <span className="text-foreground font-semibold">“My Crocs”</span>{" "}
                (personal styling) and <span className="text-foreground font-semibold">“Our Crocs”</span> (shared
                community identity).
              </p>
            </Section>

            <Section eyebrow="Context" title="An unconventional product turned identity object.">
              <ul className="space-y-3 list-disc pl-5">
                <li>Crocs won by leaning into being polarising instead of apologising for it.</li>
                <li>Jibbitz turned a mass produced clog into a personal canvas.</li>
                <li>Meme culture and collabs made the brand feel in on the joke.</li>
                <li>Comfort became a lifestyle stance, not a compromise.</li>
              </ul>
            </Section>
          </>
        )}

        {tab === "thinking" && (
          <>
            <Section eyebrow="Insight" title="Gen Z doesn’t buy shoes, they buy signals.">
              <p className="mb-5">
                I decoded the brand through three lenses:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 not-prose">
                {[
                  { t: "The Jester", d: "Humour, memes and self aware quirk make the brand socially safe to love." },
                  { t: "The Creator", d: "Jibbitz convert a product into a personal, editable identity statement." },
                  { t: "Campus Culture", d: "College is where Gen Z identity is performed, copied and amplified." },
                ].map((c) => (
                  <div key={c.t} className="glass-card p-5">
                    <div className="font-semibold mb-2 text-foreground">{c.t}</div>
                    <p className="text-sm text-muted-foreground">{c.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6">
                The core insight: <span className="text-foreground font-semibold">“Come As You Are” made
                individuality acceptable. “Croc Campus Canvas” makes it shareable.</span>
              </p>
            </Section>

            <Section eyebrow="Strategy" title="Croc Campus Canvas.">
              <p className="mb-5">
                A campus first activation that turns individual styling into collective culture — every campus
                becomes a canvas, every student becomes a creator.
              </p>
              <div className="space-y-4">
                {[
                  { n: "01", t: "Campus Ambassadors", d: "Student creators host styling drops and represent their campus identity." },
                  { n: "02", t: "Jibbitz Design Prompts", d: "Monthly themes — exam week, fest season, hostel life — spark personal charm stories." },
                  { n: "03", t: "UGC Challenges", d: "Campus vs campus styling battles with a shared hashtag and reposts on brand handles." },
                  { n: "04", t: "Fest Activations", d: "Pop up Jibbitz bars at college fests convert participation into product trial." },
                  { n: "05", t: "Creator Loop", d: "Best student content gets amplified, pulling the next wave of creators in." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <div className="text-primary font-bold">{s.n}</div>
                    <div>
                      <div className="font-semibold text-foreground">{s.t}</div>
                      <p className="text-sm">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section eyebrow="Social Media Strategy" title="Instagram as the playground.">
              <ul className="space-y-3 list-disc pl-5">
                <li><span className="text-foreground font-semibold">Reels:</span> styling transitions, hostel room to campus walk.</li>
                <li><span className="text-foreground font-semibold">Carousels:</span> “what your Jibbitz say about you” identity content.</li>
                <li><span className="text-foreground font-semibold">Stories:</span> polls, charm voting, campus leaderboards.</li>
                <li><span className="text-foreground font-semibold">Creator seeding:</span> micro campus creators over celebrity spend.</li>
              </ul>
            </Section>
          </>
        )}

        {tab === "outcome" && (
          <>
            <Section eyebrow="Result" title="A campaign ready framework, not a slide deck.">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                {[
                  { v: "3", l: "Strategic lenses" },
                  { v: "5", l: "Campaign mechanics" },
                  { v: "1", l: "Ownable platform idea" },
                  { v: "Gen Z", l: "Audience focus" },
                ].map((m) => (
                  <div key={m.l}>
                    <div className="text-3xl font-bold text-primary">{m.v}</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{m.l}</div>
                  </div>
                ))}
              </div>
              <p>
                The project delivered a complete, executable Gen Z strategy: positioning rationale, the Croc Campus
                Canvas platform, campus ambassadorship model, UGC and Jibbitz mechanics, a social content system, and
                brand outreach material — all built on documented consumer behaviour rather than assumption.
              </p>
            </Section>

            <Section eyebrow="What I Learned" title="Culture is built, not bought.">
              <div className="flex flex-wrap gap-2 mb-5 text-xs">
                {["Brand Strategy", "Consumer Behaviour", "Gen Z Insight", "Campaign Thinking", "Creative Communication"].map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold">{s}</span>
                ))}
              </div>
              <p>
                Crocs taught me that the strongest brands don’t chase relevance — they give people a way to express
                who they already are. Strategy’s job is to hand the audience the canvas and get out of the way.
              </p>
            </Section>
          </>
        )}
      </motion.div>

      {/* Final CTA */}
      <div className="px-6 sm:px-8 py-12 text-center">
        <h4 className="text-xl sm:text-2xl font-bold mb-5">Want to see how I build brand strategy end to end?</h4>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => goTo("projects")}
            className="px-6 py-3 rounded-full glass-card font-semibold text-sm hover:text-primary transition-all"
          >
            View More Projects
          </button>
          <button
            onClick={() => goTo("contact")}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

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
    <div className="text-xs uppercase tracking-widest text-primary mb-3">{eyebrow}</div>
    <h4 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5">{title}</h4>
    <div className="text-muted-foreground leading-relaxed text-base max-w-3xl">{children}</div>
  </div>
);

export default ProjectsSection;
