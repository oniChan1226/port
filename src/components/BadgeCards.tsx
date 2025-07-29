import type React from "react";
import {motion} from "motion/react";

interface BadgeCardsProps {
  index: number;
  Icon: React.ElementType;
  title: string;
  brief: string;
};

const BadgeCards: React.FC<BadgeCardsProps> = ({ Icon, title, brief, index }) => {
  return (
    <motion.div
    
    initial={{ x: -40, y: 40, opacity: 0 }}
    animate={{ x: 0, y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
     className="w-full border border-neutral-800 rounded-md p-4 space-y-3">
      <div className="flex space-x-3 items-center">
        <Icon />
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <p className="text-neutral-500 lead-5">{brief}</p>
    </motion.div>
  )
}

export default BadgeCards