import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ALL_SKILLS, CATEGORIES, CATEGORY_COLORS, PROFICIENCY_LABEL,
  type Skill, type SkillCategory,
} from "../data/PlaygroundData";

// ── Proficiency dots ────────────────────────────────────────────────────────
function ProficiencyDots({ level, dotClass }: { level: number; dotClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex gap-1.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className={`w-2 h-2 rounded-full ${i < level ? dotClass : "bg-neutral-700"}`}
        />
      ))}
    </div>
  );
}

// ── Skill card with 3-D tilt ─────────────────────────────────────────────────
function SkillCard({ skill }: { skill: Skill }) {
  const colors = CATEGORY_COLORS[skill.category];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`group relative flex flex-col gap-3 rounded-xl border border-neutral-700 bg-neutral-900 p-5 overflow-hidden hover:border-neutral-600 hover:shadow-xl ${colors.glow} transition-shadow duration-300 cursor-default`}
    >
      {/* Category accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${colors.bar}`} />

      {/* Icon + name row */}
      <div className="flex items-center gap-3 mt-1">
        <div className={`p-2.5 rounded-lg border border-neutral-700 ${colors.chipBg}`}>
          <skill.icon size={22} />
        </div>
        <div>
          <h3 className="font-semibold text-sm leading-tight">{skill.name}</h3>
          <span className={`text-[0.65rem] font-semibold px-1.5 py-0.5 rounded-full border mt-0.5 inline-block ${colors.badge}`}>
            {skill.category}
          </span>
        </div>
      </div>

      {/* Proficiency */}
      <div className="flex items-center gap-2">
        <ProficiencyDots level={skill.proficiency} dotClass={colors.dot} />
        <span className="text-[0.65rem] text-neutral-500 font-medium">
          {PROFICIENCY_LABEL[skill.proficiency]}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-neutral-500 leading-5">{skill.description}</p>
    </motion.div>
  );
}

// ── Category tab bar ─────────────────────────────────────────────────────────
function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        const colors = cat !== "All" ? CATEGORY_COLORS[cat as SkillCategory] : null;

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="relative px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none"
            style={{ color: isActive ? "var(--text-base)" : undefined }}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full bg-neutral-800 border border-neutral-600"
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "" : "text-neutral-500 hover:text-neutral-400"}`}>
              {cat}
              {colors && isActive && (
                <span className={`ml-1.5 inline-block w-1.5 h-1.5 rounded-full ${colors.dot} align-middle`} />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Summary bar ──────────────────────────────────────────────────────────────
const SUMMARY = [
  { value: ALL_SKILLS.filter(s => s.proficiency >= 4).length, label: "Advanced or above" },
  { value: ALL_SKILLS.length, label: "Total skills tracked" },
  { value: CATEGORIES.length - 1, label: "Domains" },
  { value: ALL_SKILLS.filter(s => s.proficiency === 5).length, label: "Expert level" },
];

// ── Page ─────────────────────────────────────────────────────────────────────
const Playground = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All"
    ? ALL_SKILLS
    : ALL_SKILLS.filter(s => s.category === activeCategory);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
  };

  return (
    <div className="space-y-10">
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-neutral-500 text-md lg:text-lg leading-5"
        >
          An interactive map of every tool, language, and framework I build with — rated by real production use.
        </motion.p>
      </div>

      {/* Summary strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {SUMMARY.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center text-center border border-neutral-700 rounded-xl py-4 px-3 bg-neutral-900"
          >
            <span className="text-2xl font-bold">{s.value}</span>
            <span className="text-xs text-neutral-500 mt-0.5">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </motion.div>

      {/* Skill grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={stagger}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((skill) => (
            <motion.div key={skill.name} variants={fadeUp}>
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Active stack callout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="border border-neutral-700 rounded-xl p-5 bg-neutral-900 space-y-3"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
          <span className="text-sm font-semibold">Currently shipping with</span>
          <span className="text-xs text-neutral-500">@ Ragzon Solutions — JobJen</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Node.js", "TypeScript", "MongoDB", "Socket.IO", "BullMQ", "Redis", "OpenAI / GPT", "Whisper", "React", "PostHog"].map((tech) => {
            const skill = ALL_SKILLS.find(s => s.name === tech);
            const colors = skill ? CATEGORY_COLORS[skill.category] : null;
            return (
              <span
                key={tech}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colors?.badge ?? "bg-neutral-800 text-neutral-400 border-neutral-700"}`}
              >
                {tech}
              </span>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Playground;
