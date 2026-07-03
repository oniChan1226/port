import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Expression = "normal" | "happy" | "surprised";

// ── SVG Cat ────────────────────────────────────────────────────────────────
function CatFace({ blinking, expression }: { blinking: boolean; expression: Expression }) {
  const eyeRy = blinking ? 0.6 : expression === "surprised" ? 6 : 4.2;
  const eyeFill = "#1e293b";

  return (
    <svg
      width="60"
      height="66"
      viewBox="0 0 60 66"
      fill="none"
      style={{ display: "block" }}
    >
      {/* ── Ears ── */}
      <polygon points="4,28 13,4 25,24" fill="#94a3b8" />
      <polygon points="9,26 15,9 22,24" fill="#fda4af" />
      <polygon points="56,28 47,4 35,24" fill="#94a3b8" />
      <polygon points="51,26 45,9 38,24" fill="#fda4af" />

      {/* ── Head ── */}
      <circle cx="30" cy="44" r="22" fill="#94a3b8" />

      {/* ── Left eye ── */}
      <ellipse cx="20" cy="41" rx="5.5" ry={eyeRy} fill="white" />
      <ellipse cx="20" cy="41.5" rx="3" ry={Math.max(eyeRy * 0.82, 0.4)} fill={eyeFill} />
      <circle cx="21.5" cy="39.5" r="1.2" fill="white" />

      {/* ── Right eye ── */}
      <ellipse cx="40" cy="41" rx="5.5" ry={eyeRy} fill="white" />
      <ellipse cx="40" cy="41.5" rx="3" ry={Math.max(eyeRy * 0.82, 0.4)} fill={eyeFill} />
      <circle cx="41.5" cy="39.5" r="1.2" fill="white" />

      {/* ── Happy arcs ── */}
      {expression === "happy" && (
        <>
          <path d="M14,40 Q20,35 26,40" stroke={eyeFill} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M34,40 Q40,35 46,40" stroke={eyeFill} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* ── Nose ── */}
      <polygon points="30,49 27.5,53 32.5,53" fill="#fda4af" />

      {/* ── Mouth ── */}
      {expression === "happy" ? (
        <path d="M27,53 Q30,57 33,53" stroke="#64748b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M27.5,53 Q30,55.5 32.5,53" stroke="#64748b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      )}

      {/* ── Whiskers ── */}
      <line x1="0"  y1="47" x2="18" y2="48.5" stroke="white" strokeWidth="1" opacity="0.65" />
      <line x1="0"  y1="51" x2="18" y2="51"   stroke="white" strokeWidth="1" opacity="0.65" />
      <line x1="42" y1="48.5" x2="60" y2="47" stroke="white" strokeWidth="1" opacity="0.65" />
      <line x1="42" y1="51"   x2="60" y2="51" stroke="white" strokeWidth="1" opacity="0.65" />

      {/* ── Blush ── */}
      <ellipse cx="12" cy="48" rx="4.5" ry="2.5" fill="#fda4af" opacity="0.38" />
      <ellipse cx="48" cy="48" rx="4.5" ry="2.5" fill="#fda4af" opacity="0.38" />
    </svg>
  );
}

// ── Tail ─────────────────────────────────────────────────────────────────────
function Tail({ wagging }: { wagging: boolean }) {
  return (
    <motion.div
      className="absolute -left-5 bottom-2 origin-bottom-right"
      animate={wagging ? { rotate: [0, 22, -22, 18, -18, 8, 0] } : { rotate: 0 }}
      transition={wagging ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
        <path d="M20,38 C20,38 3,33 4,21 C6,10 18,8 16,1" stroke="#94a3b8" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d="M20,38 C20,38 3,33 4,21 C6,10 18,8 16,1" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </motion.div>
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
const TIPS = ["Psst… click me!", "meow :3", "Still here!", "Hello there!", "pet me?"];

// ── Main component ─────────────────────────────────────────────────────────
export default function PeekingCat() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [expression, setExpression] = useState<Expression>("normal");
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [tip, setTip] = useState<string | null>(null);
  const peekTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shown = visible || hovered;

  // ── Auto-peek schedule ────────────────────────────────────────────────────
  useEffect(() => {
    const schedule = () => {
      const delay = 9000 + Math.random() * 9000;
      peekTimer.current = setTimeout(() => {
        if (!hovered) {
          setVisible(true);
          setExpression("surprised");
          setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
          setTimeout(() => setExpression("normal"), 700);
          setTimeout(() => {
            if (!hovered) {
              setVisible(false);
              setTip(null);
            }
            schedule();
          }, 4000);
        } else {
          schedule();
        }
      }, delay);
    };
    schedule();
    return () => { if (peekTimer.current) clearTimeout(peekTimer.current); };
  }, [hovered]);

  // ── Blink cycle ───────────────────────────────────────────────────────────
  useEffect(() => {
    const doBlink = () => {
      blinkTimer.current = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => {
          setBlinking(false);
          doBlink();
        }, 130);
      }, 2500 + Math.random() * 3500);
    };
    doBlink();
    return () => { if (blinkTimer.current) clearTimeout(blinkTimer.current); };
  }, []);

  const handleClick = () => {
    setExpression("happy");
    const id = Date.now();
    setHearts(prev => [...prev.slice(-4), { id, x: Math.random() * 40 - 20 }]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 1100);
    setTimeout(() => setExpression("normal"), 900);
  };

  return (
    <div
      className="fixed bottom-0 right-8 z-50 select-none"
      style={{ width: 60 }}
      onMouseEnter={() => { setHovered(true); setVisible(true); setTip(null); }}
      onMouseLeave={() => { setHovered(false); setVisible(false); setTip(null); }}
      onClick={handleClick}
    >
      {/* ── Speech bubble ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-800 border border-neutral-600 text-neutral-300 text-xs px-2.5 py-1 rounded-full shadow-lg pointer-events-none"
          >
            {tip}
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-1.5 bg-neutral-800 border-b border-r border-neutral-600 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating hearts ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {hearts.map(h => (
          <motion.span
            key={h.id}
            initial={{ opacity: 1, y: 0, x: h.x, scale: 0.6 }}
            animate={{ opacity: 0, y: -55, x: h.x + (Math.random() * 16 - 8), scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 pointer-events-none text-base"
            style={{ transform: `translateX(${h.x}px)` }}
          >
            🩷
          </motion.span>
        ))}
      </AnimatePresence>

      {/* ── Cat body ──────────────────────────────────────────────────────── */}
      <motion.div
        className="relative cursor-pointer"
        animate={{ y: shown ? 0 : 42 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        whileHover={{ scale: 1.04 }}
      >
        <Tail wagging={hovered} />
        <CatFace blinking={blinking} expression={expression} />
      </motion.div>
    </div>
  );
}
