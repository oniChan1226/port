import type React from "react";
import { motion } from "motion/react";

interface BadgeCardsProps {
  index: number;
  Icon: React.ElementType;
  title: string;
  brief: string;
}

const BadgeCards: React.FC<BadgeCardsProps> = ({ Icon, title, brief, index }) => {
  return (
    <motion.div
      initial={{ x: -40, y: 40, opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -3 }}
      className="w-full border border-neutral-700 hover:border-neutral-600 rounded-md p-4 space-y-3 bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300"
    >
      <div className="flex space-x-3 items-center">
        <motion.span whileHover={{ scale: 1.15, rotate: -8 }} transition={{ type: "spring", stiffness: 300 }}>
          <Icon />
        </motion.span>
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <p className="text-neutral-500 lead-5">{brief}</p>
    </motion.div>
  );
};

export default BadgeCards;
