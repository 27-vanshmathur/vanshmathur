import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Star, Trophy, Download, X } from "lucide-react";

const RecruiterSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 glow-btn bg-secondary text-secondary-foreground px-4 py-3 rounded-full font-semibold text-sm flex items-center gap-2 animate-glow-pulse"
      >
        <Eye size={16} /> Recruiter? Click This
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-lg p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold gradient-text">Why Hire Vansh?</h3>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Star className="text-primary mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-semibold">Top Strengths</h4>
                    <p className="text-sm text-muted-foreground">Consumer psychology expertise, data-driven decision making, creative brand strategy, fast learner with startup energy.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="text-secondary mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-semibold">Key Achievements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                      <li>▸ 2M+ impressions on Jio influencer campaign</li>
                      <li>▸ 35% CPA reduction through campaign optimization</li>
                      <li>▸ 3x social growth for NGO rebrand in 4 months</li>
                      <li>▸ Retail behavior insights for top Indian brands</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Eye className="text-primary mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-semibold">The Vansh Difference</h4>
                    <p className="text-sm text-muted-foreground">I don't just execute — I think. Every strategy starts with a deep understanding of human behavior and ends with measurable impact.</p>
                  </div>
                </div>
              </div>

              <button className="glow-btn mt-8 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2">
                <Download size={16} /> Download Resume
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecruiterSection;
