import { type ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom";
  alignments?: string;
}

const Tooltip = ({ content, children, position = "top", alignments }: TooltipProps) => {
  const posClasses =
    position === "top"
      ? "bottom-full"
      : "top-full";

  return (
    <div className="relative group inline-block">
      {children}
      <span
        className={`absolute pointer-events-none text-md ${posClasses} ${alignments} left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-100 text-neutral-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50`}
      >
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
