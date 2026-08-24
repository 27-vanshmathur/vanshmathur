import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Journey", id: "journey" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [isDark, setIsDark] = useState(() => !document.documentElement.classList.contains("light"));

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.add("light");
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/30 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-lg font-bold gradient-text">
          VM
        </button>
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                active === id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <div className="flex items-center gap-1 sm:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <MobileMenu active={active} scrollTo={scrollTo} />
        </div>
      </div>
    </motion.nav>
  );
};

const MobileMenu = ({ active, scrollTo }: { active: string; scrollTo: (id: string) => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button onClick={() => setOpen(!open)} className="p-2 text-muted-foreground hover:text-foreground">
        <div className="space-y-1.5">
          <span className={`block w-5 h-0.5 bg-current transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-14 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/30 p-4 flex flex-col gap-2"
        >
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setOpen(false); }}
              className={`px-4 py-2 rounded-md text-sm font-medium text-left transition-all ${
                active === id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
