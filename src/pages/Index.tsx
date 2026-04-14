import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProblemSolvingSection from "@/components/ProblemSolvingSection";
import RecruiterSection from "@/components/RecruiterSection";
import ContactSection from "@/components/ContactSection";
import ProgressBar from "@/components/ProgressBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ProgressBar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ProblemSolvingSection />
      <ContactSection />
      <RecruiterSection />

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-muted-foreground border-t border-border/30">
        <p>Built with passion by <span className="text-primary font-semibold">Vansh Mathur</span></p>
      </footer>
    </div>
  );
};

export default Index;
