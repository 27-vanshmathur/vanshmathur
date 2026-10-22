import { motion } from "framer-motion";
import { useExploredProgress } from "@/hooks/useExploredProgress";

const ProgressBar = () => {
  const progress = useExploredProgress();

  if (progress === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="h-1 bg-muted/30">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, hsl(195, 100%, 50%), hsl(260, 80%, 60%))" }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default ProgressBar;
