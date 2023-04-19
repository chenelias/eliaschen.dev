import { motion, AnimatePresence } from "framer-motion";

export default function SiteTransitions({ children }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{
        // type: "spring",
        // stiffness: 400,
        // damping: 10,
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
