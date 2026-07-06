import { Link } from 'react-router-dom';
import type React from 'react';
import { motion } from 'motion/react';
import { Meteors } from './ui/meteors';

interface QuickActionProps {
  Icon: React.ElementType;
  title: string;
  brief: string;
  actionText: string;
  to: string;
  backgroundStyle?: "m" | "s";
}

const QuickAction: React.FC<QuickActionProps> = ({
  Icon,
  title,
  brief,
  actionText,
  to,
}) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="h-full w-full relative overflow-hidden border border-neutral-700 hover:border-neutral-600 p-6 rounded-md bg-primary text-sm transition-colors duration-300"
    >
      <Meteors number={15} />
      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: -6, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-full border border-neutral-700 bg-neutral-800 p-3 w-fit mb-4"
        >
          <Icon size={20} />
        </motion.div>
        <div className="mb-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-neutral-500 text-sm">{brief}</p>
        </div>
        <motion.div whileTap={{ scale: 0.96 }} className="inline-block mt-4">
          <Link
            to={to}
            className="inline-block bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 hover:bg-neutral-700 hover:border-[var(--accent-1,#38bdf8)]/40 duration-300"
          >
            {actionText}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuickAction;
