import { Link } from 'react-router-dom';
import type React from 'react';
import { SparklesCore } from './ui/sparkles';
import { Meteors } from './ui/meteors';

interface QuickActionProps {
  Icon: React.ElementType;
  title: string;
  brief: string;
  actionText: string;
  to: string;
  backgroundStyle?: "m" | "s";
};

const QuickAction: React.FC<QuickActionProps> = ({ Icon, title, brief, actionText, to, backgroundStyle = "m" }) => {
  return (
    <div className='relative overflow-hidden border border-neutral-800 p-6 rounded-md bg-primary text-sm'>

      {/* Sparkles in background */}
      {backgroundStyle === "m" ? <Meteors number={15} /> : (<div className="absolute inset-0 z-0 pointer-events-none">
        <SparklesCore background="transparent" maxSize={0.4} particleDensity={40} />
      </div>)}

      {/* Foreground content */}
      <div className="relative z-10">
        <div className='rounded-full border border-neutral-800/70 bg-neutral-800/95 p-3 w-fit mb-4'>
          <Icon size={20} />
        </div>
        <div className='mb-1'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <p className='text-neutral-500 text-sm'>{brief}</p>
        </div>
        <Link
          to={to}
          className='inline-block bg-neutral-800 border border-neutral-700/50 rounded-md px-3 py-2 mt-4 hover:bg-neutral-800/60 hover:text-white/70 duration-300'
        >
          {actionText}
        </Link>
      </div>
    </div>
  )
}

export default QuickAction;
