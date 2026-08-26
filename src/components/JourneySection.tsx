import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Briefcase, ArrowDown, Sparkles } from "lucide-react";

const milestones = [
  {
    num: "01",
    icon: BookOpen,
    institution: "The Cambridge International School",
    degree: "School Education",
    year: "Foundation",
    theme: "Foundation",
    description:
      "This stage represents the foundation of my academic journey, where I developed curiosity, discipline, communication and the habit of learning.",
  },
  {
    num: "02",
    icon: Briefcase,
    institution: "GGSIPU",
    college: "Lingayas Lalita Devi Institute of Management & Sciences",
    degree: "Bachelor of Business Administration",
    year: "2022",
    theme: "Business Foundation",
    description:
      "Built my foundation in business, management and marketing while developing an interest in how brands understand and influence consumer behaviour.",
  },
  {
    num: "03",
    icon: GraduationCap,
    institution: "Fortune Institute of International Business (FIIB)",
    degree: "PGDM",
    year: "2025",
    theme: "Specialisation & Growth",
    description:
      "Expanded my understanding of marketing, strategy, consumer behaviour and business problem solving, with a stronger focus on applying ideas to real business situations.",
  },
];

const JourneySection = () => {
  return (
    <section id="journey" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <GraduationCap className="text-primary" size={24} />
          <h2 className="text-3xl sm:text-4xl font-bold">My Journey</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          From curiosity to strategy, my journey has shaped how I think about brands, consumers and marketing.
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        {/* Central line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{
            transformOrigin: "top",
            background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--secondary)))",
          }}
          className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px opacity-70"
        />

        <div className="space-y-10 md:space-y-16">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            const left = i % 2 === 0;
            return (
              <motion.div
                key={m.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12"
              >
                {/* Node */}
                <span className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-7 w-3 h-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_16px_hsl(var(--primary)/0.6)]" />

                <div className={left ? "md:col-start-1 md:text-right" : "md:col-start-2"}>
                  <div className="glass-card card-lift p-6">
                    <div className={`flex items-center gap-3 mb-3 ${left ? "md:flex-row-reverse" : ""}`}>
                      <span className="text-3xl font-bold gradient-text leading-none">{m.num}</span>
                      <Icon className="text-primary" size={20} />
                    </div>
                    <span className="text-xs text-primary">{m.year}</span>
                    <h3 className="font-bold text-lg leading-snug">{m.institution}</h3>
                    <p className="text-sm text-muted-foreground">{m.degree}</p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                    <span className="inline-block mt-4 text-xs px-3 py-1 rounded-full border border-border/60 bg-muted/40 text-muted-foreground">
                      {m.theme}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center pt-10 pb-6 md:pl-0 pl-12"
        >
          <ArrowDown className="text-primary animate-float" size={20} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-2xl"
        >
          <div className="glass-card card-lift p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="text-secondary" size={18} />
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Where I Am Now</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-3">
              Marketing | Brand Communication | Digital Growth
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Combining business knowledge, consumer insight and digital thinking to build better marketing ideas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
