import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";

// ── Tiny utils ────────────────────────────────────────────────────────────────
const pause = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const rnd   = (a: number, b: number) => a + Math.random() * (b - a);

type Expr = "normal" | "happy" | "surprised" | "sleepy";

// ── Front-facing cat ──────────────────────────────────────────────────────────
// eyeX: -3 → looking left, 0 → center, +3 → looking right
function FrontCat({
  blink, expr, eyeX = 0,
}: {
  blink: boolean; expr: Expr; eyeX?: number;
}) {
  const eyeRy = blink
    ? 0.5
    : expr === "surprised" ? 7
    : expr === "sleepy"    ? 2
    : 4.8;

  const G  = "#94a3b8";
  const P  = "#fda4af";
  const DK = "#1e293b";

  return (
    <svg width="64" height="72" viewBox="0 0 64 72" fill="none">
      {/* ── Left ear ── */}
      <polygon points="4,32 14,5 27,27" fill={G} />
      <polygon points="9,29 16,11 23,26" fill={P} />
      {/* ── Right ear ── */}
      <polygon points="60,32 50,5 37,27" fill={G} />
      <polygon points="55,29 48,11 41,26" fill={P} />
      {/* ── Head ── */}
      <circle cx="32" cy="48" r="25" fill={G} />

      {/* ── Eyes ── */}
      {expr === "sleepy" ? (
        /* half-closed lids */
        <>
          <ellipse cx="21" cy="45" rx="7" ry="5" fill="white" />
          <path d="M14,44 Q21,41 28,44" fill={G} />
          <ellipse cx="43" cy="45" rx="7" ry="5" fill="white" />
          <path d="M36,44 Q43,41 50,44" fill={G} />
        </>
      ) : expr === "happy" ? (
        /* curved "^" eyes */
        <>
          <ellipse cx="21" cy="45" rx="7" ry="5.5" fill="white" />
          <path d="M14,45 Q21,39 28,45" stroke={DK} strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="43" cy="45" rx="7" ry="5.5" fill="white" />
          <path d="M36,45 Q43,39 50,45" stroke={DK} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        /* normal / surprised — pupils shift with eyeX */
        <>
          <ellipse cx="21" cy="45" rx="7" ry={eyeRy} fill="white" />
          <ellipse cx={21 + eyeX} cy="45.5" rx="4" ry={Math.max(eyeRy * 0.78, 0.4)} fill={DK} />
          <circle  cx={22 + eyeX} cy="43.5" r="1.5" fill="white" />

          <ellipse cx="43" cy="45" rx="7" ry={eyeRy} fill="white" />
          <ellipse cx={43 + eyeX} cy="45.5" rx="4" ry={Math.max(eyeRy * 0.78, 0.4)} fill={DK} />
          <circle  cx={44 + eyeX} cy="43.5" r="1.5" fill="white" />
        </>
      )}

      {/* ── Nose ── */}
      <polygon points="32,54 29,58.5 35,58.5" fill={P} />

      {/* ── Mouth ── */}
      {expr === "happy" ? (
        <path d="M28.5,58.5 Q32,64 35.5,58.5" stroke="#64748b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      ) : expr === "surprised" ? (
        <ellipse cx="32" cy="62" rx="3.5" ry="4" fill={DK} />
      ) : (
        <path d="M29.5,58.5 Q32,61 34.5,58.5" stroke="#64748b" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      )}

      {/* ── Whiskers ── */}
      <line x1="0"  y1="52" x2="22" y2="54" stroke="white" strokeWidth="1.1" opacity="0.6" />
      <line x1="0"  y1="57" x2="22" y2="57" stroke="white" strokeWidth="1.1" opacity="0.6" />
      <line x1="42" y1="54" x2="64" y2="52" stroke="white" strokeWidth="1.1" opacity="0.6" />
      <line x1="42" y1="57" x2="64" y2="57" stroke="white" strokeWidth="1.1" opacity="0.6" />

      {/* ── Blush ── */}
      <ellipse cx="12" cy="54" rx="5.5" ry="2.8" fill={P} opacity="0.36" />
      <ellipse cx="52" cy="54" rx="5.5" ry="2.8" fill={P} opacity="0.36" />
    </svg>
  );
}

// ── Corner tail ───────────────────────────────────────────────────────────────
function CornerTail({ wag }: { wag: boolean }) {
  return (
    <motion.div
      className="absolute -left-5 bottom-2"
      style={{ originX: "100%", originY: "100%" }}
      animate={wag ? { rotate: [0, 24, -24, 20, -20, 10, 0] } : { rotate: 0 }}
      transition={wag ? { duration: 1.0, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      <svg width="26" height="42" viewBox="0 0 26 42" fill="none">
        <path d="M22,40 C22,40 2,35 4,22 C6,10 20,8 18,1" stroke="#94a3b8" strokeWidth="6"   strokeLinecap="round" fill="none" />
        <path d="M22,40 C22,40 2,35 4,22 C6,10 20,8 18,1" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </motion.div>
  );
}

// ── Floating ZZZ ──────────────────────────────────────────────────────────────
function ZZZ() {
  return (
    <div className="absolute pointer-events-none" style={{ bottom: "100%", left: "50%", transform: "translateX(-50%)" }}>
      {(["z", "z", "Z"] as const).map((char, i) => (
        <motion.span
          key={i}
          className="absolute text-slate-400 font-bold select-none"
          style={{ fontSize: 9 + i * 3, left: i * 10 }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.85, 0], y: -(28 + i * 10) }}
          transition={{ duration: 2.4, delay: i * 0.75, repeat: Infinity, ease: "easeOut" }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

// ── Side-facing walking cat ───────────────────────────────────────────────────
// flipped = cat faces left (mirrored)
function SideCat({ flipped }: { flipped: boolean }) {
  const G  = "#94a3b8";
  const DG = "#7c8fa3";
  const LG = "#cbd5e1";
  const P  = "#fda4af";
  const DK = "#1e293b";

  return (
    <motion.div
      style={{ scaleX: flipped ? -1 : 1 }}
      /* body bob while walking */
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 0.38, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="90" height="74" viewBox="0 0 90 74" fill="none">
        {/* ── Body ── */}
        <ellipse cx="56" cy="48" rx="28" ry="16" fill={G} />

        {/* ── Ear ── */}
        <polygon points="10,26 20,4 28,23" fill={G} />
        <polygon points="15,24 20,10 26,23" fill={P} />

        {/* ── Head ── */}
        <circle cx="24" cy="33" r="18" fill={G} />

        {/* ── Eye (side view, so only one visible) ── */}
        <ellipse cx="17" cy="29" rx="3.8" ry="5" fill="white" />
        <ellipse cx="17" cy="29.5" rx="2.2" ry="3.5" fill={DK} />
        <circle  cx="18.5" cy="27.5" r="1.2" fill="white" />

        {/* ── Nose ── */}
        <ellipse cx="8" cy="33.5" rx="2.8" ry="2.2" fill={P} />

        {/* ── Whiskers ── */}
        <line x1="8" y1="31" x2="-7" y2="28" stroke="white" strokeWidth="1" opacity="0.65" />
        <line x1="8" y1="33.5" x2="-7" y2="33.5" stroke="white" strokeWidth="1" opacity="0.65" />
        <line x1="8" y1="36" x2="-7" y2="39" stroke="white" strokeWidth="1" opacity="0.65" />

        {/* ── Tail — morphs between two bezier states ── */}
        <motion.path
          d="M82,44 C90,30 90,14 78,5"
          stroke={G}  strokeWidth="8" strokeLinecap="round" fill="none"
          animate={{ d: ["M82,44 C90,30 90,14 78,5", "M82,44 C72,26 76,10 84,5", "M82,44 C90,30 90,14 78,5"] }}
          transition={{ duration: 0.52, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M82,44 C90,30 90,14 78,5"
          stroke={LG} strokeWidth="3.5" strokeLinecap="round" fill="none"
          animate={{ d: ["M82,44 C90,30 90,14 78,5", "M82,44 C72,26 76,10 84,5", "M82,44 C90,30 90,14 78,5"] }}
          transition={{ duration: 0.52, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Front leg pair (alternate phases) ── */}
        <motion.line x1="37" y1="61" x2="33" y2="72"
          stroke={DG} strokeWidth="8" strokeLinecap="round"
          animate={{ x2: [33, 41], y2: [72, 70] }}
          transition={{ duration: 0.36, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.line x1="44" y1="61" x2="48" y2="72"
          stroke={G}  strokeWidth="8" strokeLinecap="round"
          animate={{ x2: [48, 40], y2: [72, 70] }}
          transition={{ duration: 0.36, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* ── Back leg pair (offset by half phase) ── */}
        <motion.line x1="63" y1="61" x2="59" y2="72"
          stroke={DG} strokeWidth="8" strokeLinecap="round"
          animate={{ x2: [59, 67], y2: [72, 70] }}
          transition={{ duration: 0.36, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.18 }}
        />
        <motion.line x1="70" y1="61" x2="74" y2="72"
          stroke={G}  strokeWidth="8" strokeLinecap="round"
          animate={{ x2: [74, 66], y2: [72, 70] }}
          transition={{ duration: 0.36, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.18 }}
        />
      </svg>
    </motion.div>
  );
}

// ── Speech bubble ─────────────────────────────────────────────────────────────
const TIPS = [
  "psst… click me!",
  "meow :3",
  "still here!",
  "hello there!",
  "*purrs*",
  "watching you code…",
  "feed me commits",
];

// ── Main component ────────────────────────────────────────────────────────────
export default function PeekingCat() {
  // Corner cat
  const [cornerY, setCornerY]  = useState(50);       // 0=fully up, 50=peeking ears only
  const [hovered, setHovered]  = useState(false);
  const [blink,   setBlink]    = useState(false);
  const [expr,    setExpr]     = useState<Expr>("normal");
  const [eyeX,    setEyeX]     = useState(0);
  const [tailWag, setTailWag]  = useState(false);
  const [tip,     setTip]      = useState<string | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [hearts,  setHearts]   = useState<{ id: number; x: number }[]>([]);

  // Strolling cat
  const [isStrolling, setIsStrolling] = useState(false);
  const [strollFlipped, setStrollFlipped] = useState(false);
  const strollCtrl = useAnimationControls();

  const hoverRef   = useRef(false);
  const aliveRef   = useRef(true);

  useEffect(() => {
    hoverRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    aliveRef.current = true;
    return () => { aliveRef.current = false; };
  }, []);

  // ── Blink cycle ────────────────────────────────────────────────────────────
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        if (!aliveRef.current) return;
        setBlink(true);
        setTimeout(() => { setBlink(false); loop(); }, 140);
      }, rnd(2500, 5500));
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  // ── Behavior engine ────────────────────────────────────────────────────────
  const runBehavior = useCallback(async (): Promise<void> => {
    await pause(rnd(6000, 12000));
    if (!aliveRef.current) return;
    if (hoverRef.current) return runBehavior();

    const r = Math.random();

    // ── PEEK (40%) ───────────────────────────────────────────────────────────
    if (r < 0.40) {
      setExpr("surprised");
      setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
      setCornerY(0);
      await pause(500);
      setExpr("normal");
      await pause(rnd(2500, 4500));
      if (!hoverRef.current) { setCornerY(50); setTip(null); }

    // ── SIT + LOOK AROUND (25%) ──────────────────────────────────────────────
    } else if (r < 0.65) {
      setCornerY(0);
      setExpr("normal");
      const lookSteps = Math.floor(rnd(2, 5));
      for (let i = 0; i < lookSteps; i++) {
        if (!aliveRef.current || hoverRef.current) break;
        await pause(rnd(700, 1600));
        setEyeX(Math.random() > 0.5 ? rnd(1.5, 3) : rnd(-3, -1.5));
      }
      setEyeX(0);
      await pause(rnd(600, 1200));
      if (!hoverRef.current) setCornerY(50);

    // ── STROLL (27%) ─────────────────────────────────────────────────────────
    } else if (r < 0.92) {
      const goRight = Math.random() > 0.5;
      const w       = window.innerWidth;
      const catW    = 90;
      const startX  = goRight ? -catW : w + catW;
      const endX    = goRight ? w + catW : -catW;
      const dur     = (w + catW * 2) / 88;   // ≈ 88 px / s

      setIsStrolling(true);
      setStrollFlipped(!goRight);             // flipped = facing left
      strollCtrl.set({ x: startX });
      await strollCtrl.start({ x: endX, transition: { duration: dur, ease: "linear" } });
      if (aliveRef.current) setIsStrolling(false);

    // ── SLEEP (8%) ───────────────────────────────────────────────────────────
    } else {
      setCornerY(0);
      setIsSleeping(true);
      setExpr("sleepy");
      await pause(rnd(6000, 10000));
      setIsSleeping(false);
      setExpr("normal");
      if (!hoverRef.current) setCornerY(50);
    }

    if (aliveRef.current) runBehavior();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strollCtrl]);

  useEffect(() => { runBehavior(); }, [runBehavior]);

  // ── Hover ──────────────────────────────────────────────────────────────────
  const onEnter = () => {
    setHovered(true); hoverRef.current = true;
    setCornerY(0); setTailWag(true); setTip(null);
  };
  const onLeave = () => {
    setHovered(false); hoverRef.current = false;
    setTailWag(false);
    if (!isSleeping) setCornerY(50);
  };

  // ── Click ──────────────────────────────────────────────────────────────────
  const onClick = () => {
    setExpr("happy");
    const id = Date.now();
    setHearts(prev => [...prev.slice(-4), { id, x: rnd(-22, 22) }]);
    setTimeout(() => setHearts(p => p.filter(h => h.id !== id)), 1100);
    setTimeout(() => setExpr(isSleeping ? "sleepy" : "normal"), 950);
  };

  return (
    <>
      {/* ── Strolling cat (full-width fixed strip at the bottom) ── */}
      {isStrolling && (
        <motion.div
          className="fixed bottom-1 left-0 z-40 pointer-events-none"
          animate={strollCtrl}
        >
          <SideCat flipped={strollFlipped} />
        </motion.div>
      )}

      {/* ── Corner cat ── */}
      <div
        className="fixed bottom-0 right-8 z-50 select-none"
        style={{ width: 64 }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {/* ZZZ */}
        {isSleeping && <ZZZ />}

        {/* Speech bubble */}
        <AnimatePresence>
          {tip && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.85 }}
              transition={{ duration: 0.22 }}
              className="absolute pointer-events-none whitespace-nowrap bg-neutral-800 border border-neutral-600 text-neutral-300 text-xs px-2.5 py-1 rounded-full shadow-lg"
              style={{ bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }}
            >
              {tip}
              <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-neutral-800 border-b border-r border-neutral-600 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating hearts */}
        <AnimatePresence>
          {hearts.map(h => (
            <motion.span
              key={h.id}
              className="absolute bottom-full left-1/2 pointer-events-none text-base leading-none"
              initial={{ opacity: 1, y: 0, x: h.x, scale: 0.6 }}
              animate={{ opacity: 0, y: -58, x: h.x + rnd(-10, 10), scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              🩷
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Cat */}
        <motion.div
          className="relative cursor-pointer"
          animate={{ y: hovered ? 0 : cornerY }}
          transition={{ type: "spring", stiffness: 170, damping: 20 }}
          whileHover={{ scale: 1.06 }}
        >
          <CornerTail wag={tailWag} />
          <FrontCat blink={blink} expr={expr} eyeX={eyeX} />
        </motion.div>
      </div>
    </>
  );
}
