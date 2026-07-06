import type React from "react";
import { motion } from "motion/react";

interface PageTitleProps {
  title: string;
  brief?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, brief }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="text-3xl lg:text-5xl font-semibold tracking-wide leading-tight">
        {title}
      </h1>
      {brief && (
        <p className="mt-2 text-base lg:text-lg text-neutral-400/90 leading-relaxed">
          {brief}
        </p>
      )}
    </motion.div>
  );
};

export default PageTitle;
