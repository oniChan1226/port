import { motion } from "motion/react";
import {
  Cat, PanelLeftClose, Palette, Rocket, SlidersHorizontal, Sparkles, Star, Terminal,
  type LucideIcon,
} from "lucide-react";
import type { FeedType } from "../data/FeedData";

const ICONS: Record<string, LucideIcon> = {
  Terminal, Palette, PanelLeftClose, Star, Sparkles, SlidersHorizontal, Cat, Rocket,
};

const TYPE_STYLES: Record<FeedType, string> = {
  shipped: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:border-green-700/50 dark:text-green-400",
  improved: "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900/40 dark:border-sky-700/50 dark:text-sky-400",
  fixed: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:border-amber-700/50 dark:text-amber-400",
  note: "bg-violet-100 text-violet-700 border-violet-300 dark:bg-violet-900/40 dark:border-violet-700/50 dark:text-violet-400",
};

interface FeedViewProps {
  timestamp: string;
  title: string;
  description: string;
  icon: string;
  type: FeedType;
  index: number;
  isLast?: boolean;
}

const FeedView: React.FC<FeedViewProps> = ({ timestamp, title, description, icon, type, index, isLast }) => {
  const Icon = ICONS[icon] ?? Sparkles;
  const date = new Date(timestamp);
  const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.06 }}
      className="relative flex gap-4 pb-8"
    >
      {/* Timeline rail */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        <div className="w-9 h-9 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center z-10">
          <Icon size={16} className="text-neutral-400" />
        </div>
        {!isLast && <div className="w-px flex-1 bg-neutral-800 mt-1" />}
      </div>

      {/* Content */}
      <motion.div
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex-1 min-w-0 pb-1 -mt-0.5"
      >
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${TYPE_STYLES[type]}`}>
            {type}
          </span>
          <span className="text-xs text-neutral-500">{formatted}</span>
        </div>
        <h2 className="text-lg font-semibold leading-snug" style={{ color: "var(--text-base)" }}>{title}</h2>
        <p className="text-sm text-neutral-500 leading-6 mt-1">{description}</p>
      </motion.div>
    </motion.div>
  );
};

export default FeedView;
