import React, { Suspense } from "react";
import FallBack from "./FallBack";
import { motion } from "motion/react";

interface LazyWrapperProps {
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const LazyWrapper: React.FC<LazyWrapperProps> = ({ Component }) => {
  return (
    <Suspense fallback={<FallBack />}>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Component />
      </motion.div>
    </Suspense>
  );
};

export default LazyWrapper;
