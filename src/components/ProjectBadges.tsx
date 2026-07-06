import { Star } from "lucide-react";
import type { Project } from "../data/ProjectsData";

const badgeBase = "text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap";

export function StatusBadge({ status, className = "" }: { status?: Project["status"]; className?: string }) {
  if (status === "live") {
    return (
      <span className={`${badgeBase} bg-green-100 border-green-300 text-green-700 dark:bg-green-900/40 dark:border-green-700/50 dark:text-green-400 ${className}`}>
        Live
      </span>
    );
  }
  if (status === "in-development") {
    return (
      <span className={`${badgeBase} bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-900/40 dark:border-amber-700/50 dark:text-amber-400 ${className}`}>
        In Development
      </span>
    );
  }
  return null;
}

export function FeaturedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${badgeBase} inline-flex items-center gap-1 bg-violet-100 border-violet-400 text-violet-800 dark:bg-violet-900/40 dark:border-violet-700/50 dark:text-violet-300 ${className}`}
    >
      <Star size={11} className="fill-current" />
      Featured
    </span>
  );
}

export function TagBadge({ tag, className = "" }: { tag: string; className?: string }) {
  return (
    <span
      className={`text-xs lg:text-sm font-semibold rounded-lg border border-neutral-700 px-2 py-1 whitespace-nowrap ${className}`}
      style={{ color: "var(--text-base)" }}
    >
      {tag}
    </span>
  );
}
