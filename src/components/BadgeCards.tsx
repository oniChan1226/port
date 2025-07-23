import type React from "react";

interface BadgeCardsProps {
  Icon: React.ElementType;
  title: string;
  brief: string;
};

const BadgeCards: React.FC<BadgeCardsProps> = ({ Icon, title, brief }) => {
  return (
    <div className="w-full border border-neutral-800 rounded-md p-4 space-y-3">
      <div className="flex space-x-3 items-center">
        <Icon />
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <p className="text-neutral-500 lead-5">{brief}</p>
    </div>
  )
}

export default BadgeCards