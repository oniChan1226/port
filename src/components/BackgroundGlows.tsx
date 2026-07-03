import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import type { ColorTheme } from "../data/ThemeData";

interface OrbDef {
  /** CSS var name for the glow color, e.g. "var(--glow-a)" */
  color: string;
  /** top/bottom + left/right positioning as CSS-compatible strings */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** px width/height */
  w: number;
  h: number;
  /** animation class: blob-anim-1..4 */
  anim: string;
  /** animation-delay */
  delay?: string;
}

/**
 * Artfully-placed glow orb positions per theme.
 * Colors come from CSS vars (--glow-a/b/c/d) so they automatically
 * respond to both theme AND mode switches.
 *
 * Narrative for each theme:
 *  Default  — cool tech night (top-left + right + lower)
 *  Sahara   — desert sunset (dominant top-right, secondary left, accent bottom)
 *  Ocean    — surface light penetrating deep water (top-center bright, side dim)
 *  Forest   — dappled forest canopy (scattered, gentle)
 *  Aurora   — Northern Lights arc (wide sweeps across top, mirrored bottom)
 */
const THEME_ORBS: Record<ColorTheme, OrbDef[]> = {
  default: [
    { color: "var(--glow-a)", top: "-8%",  left: "4%",   w: 850, h: 680, anim: "blob-anim-1" },
    { color: "var(--glow-b)", top: "38%",  right: "-4%", w: 700, h: 800, anim: "blob-anim-2", delay: "4s" },
    { color: "var(--glow-c)", bottom: "5%",left: "22%",  w: 650, h: 520, anim: "blob-anim-3", delay: "8s" },
    { color: "var(--glow-d)", top: "18%",  left: "28%",  w: 480, h: 420, anim: "blob-anim-4", delay: "2s" },
  ],
  sahara: [
    // Big amber glow top-right — like a desert sun
    { color: "var(--glow-a)", top: "-10%", right: "2%",  w: 950, h: 750, anim: "blob-anim-1" },
    // Warm orange glow mid-left
    { color: "var(--glow-b)", top: "32%",  left: "-2%",  w: 680, h: 760, anim: "blob-anim-2", delay: "6s" },
    // Faint red accent near bottom center
    { color: "var(--glow-c)", bottom: "8%",left: "35%",  w: 560, h: 480, anim: "blob-anim-3", delay: "10s" },
    // Gold shimmer top-left
    { color: "var(--glow-d)", top: "8%",   left: "5%",   w: 420, h: 380, anim: "blob-anim-4", delay: "3s" },
  ],
  ocean: [
    // Bright cyan top-center — surface light
    { color: "var(--glow-a)", top: "-6%",  left: "30%",  w: 900, h: 700, anim: "blob-anim-1" },
    // Sky blue right — horizontal light refraction
    { color: "var(--glow-b)", top: "25%",  right: "-3%", w: 620, h: 700, anim: "blob-anim-2", delay: "5s" },
    // Deep teal bottom-left — water depth
    { color: "var(--glow-c)", bottom: "4%",left: "6%",   w: 700, h: 580, anim: "blob-anim-3", delay: "9s" },
    // Subtle cyan mid-center
    { color: "var(--glow-d)", top: "45%",  left: "38%",  w: 460, h: 400, anim: "blob-anim-4", delay: "2s" },
  ],
  forest: [
    // Emerald glow top-left — canopy light
    { color: "var(--glow-a)", top: "-4%",  left: "0%",   w: 780, h: 640, anim: "blob-anim-1" },
    // Green glow bottom-right — forest floor
    { color: "var(--glow-b)", bottom: "2%",right: "5%",  w: 820, h: 680, anim: "blob-anim-2", delay: "7s" },
    // Teal hint center-right — filtered light
    { color: "var(--glow-c)", top: "38%",  right: "18%", w: 560, h: 500, anim: "blob-anim-3", delay: "11s" },
    // Soft green mid-left
    { color: "var(--glow-d)", top: "20%",  left: "10%",  w: 400, h: 380, anim: "blob-anim-4", delay: "4s" },
  ],
  aurora: [
    // Large purple sweep top-right
    { color: "var(--glow-a)", top: "-8%",  right: "-2%", w: 1000, h: 760, anim: "blob-anim-1" },
    // Pink/magenta left arc
    { color: "var(--glow-b)", top: "22%",  left: "-4%",  w: 800, h: 900, anim: "blob-anim-2", delay: "5s" },
    // Violet bottom center
    { color: "var(--glow-c)", bottom: "6%",left: "28%",  w: 660, h: 540, anim: "blob-anim-3", delay: "9s" },
    // Rose top-left hint
    { color: "var(--glow-d)", top: "5%",   left: "8%",   w: 480, h: 420, anim: "blob-anim-4", delay: "3s" },
  ],
};

export default function BackgroundGlows() {
  const { colorTheme, mode } = useTheme();
  const orbs = THEME_ORBS[colorTheme];

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={colorTheme + mode}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        {orbs.map((orb, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${orb.anim}`}
            style={{
              width:  orb.w,
              height: orb.h,
              top:    orb.top,
              bottom: orb.bottom,
              left:   orb.left,
              right:  orb.right,
              animationDelay: orb.delay ?? "0s",
              background: `radial-gradient(ellipse at center, ${orb.color} 0%, transparent 70%)`,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
