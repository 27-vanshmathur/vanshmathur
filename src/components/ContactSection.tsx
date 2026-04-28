import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Copy, Check, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }
    setSubmitted(true);
    toast.success("Thanks! I'll get back to you soon 😊");
  };

  const contacts = [
    {
      icon: Linkedin,
      label: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/vanshxmathur/",
      copyText: null,
    },
    {
      icon: Mail,
      label: "vanshmathur103@gmail.com",
      href: "mailto:vanshmathur103@gmail.com",
      copyText: "vanshmathur103@gmail.com",
      field: "email",
    },
    {
      icon: Phone,
      label: "+91 7303025908",
      href: "tel:+917303025908",
      copyText: "+917303025908",
      field: "phone",
    },
  ];

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Let's Connect & Build Something Impactful 🚀
          </h2>
          <p className="text-muted-foreground">
            I'm always open to discussing marketing ideas, collaborations, or opportunities.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {contacts.map((c) => (
            <div key={c.label} className="glass-card p-5 card-lift group text-center">
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3"
              >
                <c.icon className="text-primary group-hover:scale-110 transition-transform" size={28} />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{c.label}</span>
              </a>
              {c.copyText && (
                <button
                  onClick={() => copyToClipboard(c.copyText!, c.field!)}
                  className="mt-2 text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mx-auto transition-colors"
                  title="Click to copy"
                >
                  {copiedField === c.field ? <Check size={12} /> : <Copy size={12} />}
                  {copiedField === c.field ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="text-primary" size={20} />
            <h3 className="text-xl font-bold">Quick Message</h3>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-lg font-semibold text-primary">Thanks! I'll get back to you soon 😊</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="glow-btn w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
