import { useState } from "react";
import { motion } from "motion/react";
import PlaygroundTerminal from "../components/PlaygroundTerminal";
import RequestFlowPlayground from "../components/RequestFlowPlayground";

const EXPERIENCES = [
  {
    id: "terminal",
    label: "Terminal",
    tagline: (
      <>
        A real shell into this portfolio — run commands, pull real data, even flip the theme or jump to a page.
        Start with <span className="text-[var(--text-base)] font-semibold">help</span>.
      </>
    ),
    Component: PlaygroundTerminal,
  },
  {
    id: "flow",
    label: "Request Flow",
    tagline: (
      <>
        Pick a scenario and watch it actually travel through the system — load balancer, queue, parallel AI
        scoring pipeline, all of it. This is the real architecture behind JobJen, animated.
      </>
    ),
    Component: RequestFlowPlayground,
  },
];

const Playground = () => {
  const [activeId, setActiveId] = useState(EXPERIENCES[0].id);
  const active = EXPERIENCES.find((e) => e.id === activeId) ?? EXPERIENCES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-5xl font-semibold tracking-wide"
        >
          Playground
        </motion.h1>
        <motion.p
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-neutral-500 text-md lg:text-lg leading-5"
        >
          {active.tagline}
        </motion.p>
      </div>

      {/* Experience switcher */}
      <div className="flex gap-2 flex-wrap">
        {EXPERIENCES.map((e) => {
          const isActive = e.id === activeId;
          return (
            <button
              key={e.id}
              onClick={() => setActiveId(e.id)}
              className="relative px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none cursor-pointer"
              style={{ color: isActive ? "var(--text-base)" : undefined }}
            >
              {isActive && (
                <motion.div
                  layoutId="playgroundActiveTab"
                  className="absolute inset-0 rounded-full bg-neutral-800 border border-[var(--accent-1,#38bdf8)]/30"
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? "" : "text-neutral-500 hover:text-neutral-400"}`}>
                {e.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active experience */}
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <active.Component />
      </motion.div>
    </div>
  );
};

export default Playground;
