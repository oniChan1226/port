import { motion } from "motion/react";
import PlaygroundTerminal from "../components/PlaygroundTerminal";

const Playground = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-5xl font-semibold tracking-wide"
        >
          Playground
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-neutral-500 text-md lg:text-lg leading-5"
        >
          A real shell into this portfolio — run commands, pull real data, even flip the theme or jump to a page.
          Start with <span className="text-[var(--text-base)] font-semibold">help</span>.
        </motion.p>
      </div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        <PlaygroundTerminal />
      </motion.div>
    </div>
  );
};

export default Playground;
