import { motion } from "motion/react";
import type { FeedType } from "../data/FeedData";

interface FeedViewProps {
  timestamp: string;
  title: string;
  description: string;
  type: FeedType;
  index: number;
}

const FeedView: React.FC<FeedViewProps> = ({ timestamp, title, description, type, index }) => {
  const date = new Date(timestamp);
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index, 4) * 0.05 }}
      className="grid grid-cols-[44px_1fr] sm:grid-cols-[56px_1fr] gap-x-4 py-5 border-b border-neutral-800/70 last:border-0"
    >
      <div className="pt-0.5">
        <div className="text-lg font-semibold leading-none" style={{ color: "var(--text-base)" }}>{day}</div>
        <div className="text-[0.65rem] text-neutral-500 uppercase tracking-wide mt-1">{weekday}</div>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-base" style={{ color: "var(--text-base)" }}>{title}</h3>
          <span className="text-xs text-neutral-500 capitalize">{type}</span>
        </div>
        <p className="text-sm text-neutral-500 leading-6 mt-1">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeedView;
