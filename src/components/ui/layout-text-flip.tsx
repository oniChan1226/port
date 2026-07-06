import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";

export const LayoutTextFlip = ({
  text,
  words,
  duration = 2600,
  className,
  wordClassName,
}: {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
  wordClassName?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <>
      <motion.span
        layout
        layoutId="layout-text-flip-subtext"
        className={cn("font-semibold tracking-wide", className)}
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className="relative inline-block w-fit overflow-hidden py-0.5 font-semibold tracking-wide"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentIndex}
            initial={{ y: -32, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 32, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className={cn("inline-block whitespace-nowrap", wordClassName)}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
