import { Link } from 'react-router-dom';
import type React from 'react';
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
    <div className="h-full w-full relative overflow-hidden border border-neutral-700 p-6 rounded-md bg-primary text-sm">
      <Meteors number={15} />
      <div className="relative z-10">
        <div className="rounded-full border border-neutral-700 bg-neutral-800 p-3 w-fit mb-4">
          <Icon size={20} />
        </div>
        <div className="mb-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-neutral-500 text-sm">{brief}</p>
        </div>
        <Link
          to={to}
          className="inline-block bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 mt-4 hover:bg-neutral-700 duration-300"
        >
          {actionText}
        </Link>
      </div>
    </div>
  );
};

export default QuickAction;
