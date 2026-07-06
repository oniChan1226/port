import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, type PanInfo } from "motion/react";

// ── Tiny utils ────────────────────────────────────────────────────────────────
const pause = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const rnd   = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const CAT_W = 96;
const CAT_H = 84;
const HOME_MARGIN_X = 32;
const TOP_SAFE = 88; // keep clear of headers / avoid speech bubbles clipping offscreen
const WALK_SPEED = 130; // px / s
const POUNCE_SPEED = 260; // px / s

type Expr = "normal" | "happy" | "surprised" | "sleepy" | "love";
type Activity = "sitting" | "walking";
type Facing = "left" | "right";

// ── Little heart, reused for love-eyes and floating hearts ─────────────────────
function Heart({ cx, cy, scale = 1, fill }: { cx: number; cy: number; scale?: number; fill: string }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <circle cx="-2.6" cy="-2" r="3.1" fill={fill} />
      <circle cx="2.6" cy="-2" r="3.1" fill={fill} />
      <polygon points="-5.4,-1 5.4,-1 0,6.4" fill={fill} />
    </g>
  );
}

// ── Front-facing cat (sitting / peeking / reacting) ─────────────────────────────
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
        <>
          <ellipse cx="21" cy="45" rx="7" ry="5" fill="white" />
          <path d="M14,44 Q21,41 28,44" fill={G} />
          <ellipse cx="43" cy="45" rx="7" ry="5" fill="white" />
          <path d="M36,44 Q43,41 50,44" fill={G} />
        </>
      ) : expr === "happy" ? (
        <>
          <ellipse cx="21" cy="45" rx="7" ry="5.5" fill="white" />
          <path d="M14,45 Q21,39 28,45" stroke={DK} strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="43" cy="45" rx="7" ry="5.5" fill="white" />
          <path d="M36,45 Q43,39 50,45" stroke={DK} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : expr === "love" ? (
        <>
          <Heart cx={21} cy={44} scale={1.15} fill={P} />
          <Heart cx={43} cy={44} scale={1.15} fill={P} />
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
      {expr === "happy" || expr === "love" ? (
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

// ── Tail — curls out beside a sitting cat ───────────────────────────────────────
function Tail({ wag }: { wag: boolean }) {
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

// ── Floating purrs (petting) ────────────────────────────────────────────────────
function Purrs() {
  return (
    <div className="absolute pointer-events-none" style={{ bottom: "100%", left: "50%", transform: "translateX(-50%)" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute text-rose-300 font-bold select-none"
          style={{ fontSize: 12, left: i * 12 - 12 }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.9, 0], y: -(22 + i * 8) }}
          transition={{ duration: 1.3, delay: i * 0.22, repeat: Infinity, ease: "easeOut" }}
        >
          ~
        </motion.span>
      ))}
    </div>
  );
}

// ── Paw swipe — plays when the cat bats at a nearby page element ───────────────
function PawSwipe({ facing }: { facing: Facing }) {
  const fromLeft = facing === "right";
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: 18, [fromLeft ? "left" : "right"]: -8 } as React.CSSProperties}
      initial={{ rotate: fromLeft ? -20 : 20, opacity: 0, scale: 0.6 }}
      animate={{
        rotate: fromLeft ? [-20, 42, -8] : [20, -42, 8],
        opacity: [0, 1, 0],
        scale: [0.6, 1, 0.8],
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#94a3b8">
        <ellipse cx="10" cy="13" rx="6" ry="5" />
        <circle cx="4" cy="6" r="2.4" />
        <circle cx="10" cy="3.5" r="2.4" />
        <circle cx="16" cy="6" r="2.4" />
      </svg>
    </motion.div>
  );
}

// ── Side-facing walking cat ───────────────────────────────────────────────────
// flipped = cat faces left (mirrored). speed scales the leg/tail cycle (pounce = faster).
function SideCat({ flipped, speed = 1 }: { flipped: boolean; speed?: number }) {
  const G  = "#94a3b8";
  const DG = "#7c8fa3";
  const LG = "#cbd5e1";
  const P  = "#fda4af";
  const DK = "#1e293b";
  const cycle = 0.36 / speed;

  return (
    <motion.div
      style={{ scaleX: flipped ? -1 : 1 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: cycle + 0.02, repeat: Infinity, ease: "easeInOut" }}
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
          stroke={G}  strokeWidth="8" strokeLinecap="round" fill="none"
          initial={{ d: "M82,44 C90,30 90,14 78,5" }}
          animate={{ d: ["M82,44 C90,30 90,14 78,5", "M82,44 C72,26 76,10 84,5", "M82,44 C90,30 90,14 78,5"] }}
          transition={{ duration: cycle + 0.16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          stroke={LG} strokeWidth="3.5" strokeLinecap="round" fill="none"
          initial={{ d: "M82,44 C90,30 90,14 78,5" }}
          animate={{ d: ["M82,44 C90,30 90,14 78,5", "M82,44 C72,26 76,10 84,5", "M82,44 C90,30 90,14 78,5"] }}
          transition={{ duration: cycle + 0.16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Front leg pair (alternate phases) ── */}
        <motion.line x1="37" y1="61"
          stroke={DG} strokeWidth="8" strokeLinecap="round"
          initial={{ x2: 33, y2: 72 }}
          animate={{ x2: [33, 41], y2: [72, 70] }}
          transition={{ duration: cycle, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.line x1="44" y1="61"
          stroke={G}  strokeWidth="8" strokeLinecap="round"
          initial={{ x2: 48, y2: 72 }}
          animate={{ x2: [48, 40], y2: [72, 70] }}
          transition={{ duration: cycle, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* ── Back leg pair (offset by half phase) ── */}
        <motion.line x1="63" y1="61"
          stroke={DG} strokeWidth="8" strokeLinecap="round"
          initial={{ x2: 59, y2: 72 }}
          animate={{ x2: [59, 67], y2: [72, 70] }}
          transition={{ duration: cycle, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: cycle * 0.5 }}
        />
        <motion.line x1="70" y1="61"
          stroke={G}  strokeWidth="8" strokeLinecap="round"
          initial={{ x2: 74, y2: 72 }}
          animate={{ x2: [74, 66], y2: [72, 70] }}
          transition={{ duration: cycle, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: cycle * 0.5 }}
        />
      </svg>
    </motion.div>
  );
}

// ── Positioning for bubbles/menus that float above the cat ─────────────────────
// Anchoring purely to the cat's center overflows the viewport when the cat is
// docked near a screen edge, so anchor to whichever side has room instead.
type Align = "left" | "center" | "right";
const computeAlign = (px: number): Align => {
  const vw = window.innerWidth;
  if (px > vw * 0.68) return "right";
  if (px < vw * 0.32) return "left";
  return "center";
};
const anchorStyle = (align: Align): React.CSSProperties =>
  align === "right"
    ? { bottom: "calc(100% + 8px)", right: 0 }
    : align === "left"
    ? { bottom: "calc(100% + 8px)", left: 0 }
    : { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" };
const arrowClass = (align: Align) =>
  align === "right" ? "right-4" : align === "left" ? "left-4" : "left-1/2 -translate-x-1/2";

// ── Speech bubble ─────────────────────────────────────────────────────────────
function SpeechBubble({ text, align }: { text: string; align: Align }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.85 }}
      transition={{ duration: 0.22 }}
      className="absolute pointer-events-none whitespace-nowrap bg-neutral-800 border border-neutral-600 text-neutral-300 text-xs px-2.5 py-1 rounded-full shadow-lg"
      style={anchorStyle(align)}
    >
      {text}
      <span className={`absolute -bottom-[5px] w-2.5 h-2.5 bg-neutral-800 border-b border-r border-neutral-600 rotate-45 ${arrowClass(align)}`} />
    </motion.div>
  );
}

// ── Command wheel — feed / pet / play ──────────────────────────────────────────
function CommandWheel({
  onFeed, onPet, onPlay, align,
}: {
  onFeed: () => void; onPet: () => void; onPlay: () => void; align: Align;
}) {
  const items = [
    { key: "feed", label: "Feed", icon: "🍖", action: onFeed },
    { key: "pet",  label: "Pet",  icon: "✋", action: onPet },
    { key: "play", label: "Play", icon: "🧶", action: onPlay },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.85 }}
      transition={{ duration: 0.18 }}
      className="absolute flex gap-1.5 bg-neutral-800 border border-neutral-600 rounded-full p-1.5 shadow-lg"
      style={{ ...anchorStyle(align), bottom: "calc(100% + 10px)" }}
    >
      {items.map((item) => (
        <motion.button
          key={item.key}
          type="button"
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={item.action}
          title={item.label}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 hover:border-[var(--accent-1,#38bdf8)]/60 text-base leading-none"
        >
          {item.icon}
        </motion.button>
      ))}
      <span className={`absolute -bottom-[5px] w-2.5 h-2.5 bg-neutral-800 border-b border-r border-neutral-600 rotate-45 ${arrowClass(align)}`} />
    </motion.div>
  );
}

const IDLE_TIPS = [
  "psst… click me!",
  "meow :3",
  "still here!",
  "hello there!",
  "*purrs*",
  "watching you code…",
  "feed me commits",
  "try dragging me!",
  "click me — I know tricks",
];
const FEED_LINES = ["yum, thank you!", "*munch munch*"];
const PET_LINES  = ["purrrr~", "so soft…"];
const PLAY_LINES = ["that was fun!", "again! again!"];

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// ── DOM helpers for reacting to page content ───────────────────────────────────
function pickInteractiveTarget(excludeRoot: HTMLElement | null): { x: number; y: number; el: HTMLElement } | null {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('a, button, [role="button"]'));
  const candidates = nodes.filter((el) => {
    if (excludeRoot && excludeRoot.contains(el)) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return false;
    if (r.bottom < TOP_SAFE || r.top > vh - 20) return false;
    if (r.right < 0 || r.left > vw) return false;
    return true;
  });
  if (!candidates.length) return null;
  const el = candidates[Math.floor(Math.random() * candidates.length)];
  const r = el.getBoundingClientRect();
  return {
    el,
    x: clamp(r.left + r.width / 2 - CAT_W / 2, 8, vw - CAT_W - 8),
    y: clamp(r.bottom - 30, TOP_SAFE, vh - CAT_H - 8),
  };
}

function nudgeElement(el: HTMLElement) {
  try {
    el.animate(
      [
        { transform: "translateX(0) rotate(0deg)" },
        { transform: "translateX(-3px) rotate(-3deg)" },
        { transform: "translateX(3px) rotate(3deg)" },
        { transform: "translateX(-2px) rotate(-2deg)" },
        { transform: "translateX(0) rotate(0deg)" },
      ],
      { duration: 420, easing: "ease-in-out" },
    );
  } catch {
    // Element.animate unsupported — purely cosmetic, safe to skip
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PeekingCat() {
  const rootRef  = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [ready, setReady]       = useState(false);
  const [activity, setActivity] = useState<Activity>("sitting");
  const [facing, setFacing]     = useState<Facing>("left");
  const [dockedHome, setDockedHome] = useState(true);
  const [peekHide, setPeekHide] = useState(50); // 0 = fully visible, 50 = only ears peeking
  const [uiAlign, setUiAlign] = useState<Align>("right"); // keeps bubble/menu clear of screen edges

  const [hovered, setHovered]   = useState(false);
  const [blink,   setBlink]     = useState(false);
  const [expr,    setExpr]      = useState<Expr>("normal");
  const [eyeX,    setEyeX]      = useState(0);
  const [tailWag, setTailWag]   = useState(false);
  const [tip,     setTip]       = useState<string | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [purring, setPurring]   = useState(false);
  const [hearts,  setHearts]    = useState<{ id: number; x: number }[]>([]);
  const [pawAt,   setPawAt]     = useState(0); // increments to retrigger the paw-swipe animation
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy]         = useState(false); // feed/pet/play sequence in progress
  const [dragging, setDragging] = useState(false);
  const [yarn, setYarn]         = useState<{ x: number; y: number } | null>(null);
  const [pounceSpeed, setPounceSpeed] = useState(1);

  const aliveRef    = useRef(true);
  const hoverRef    = useRef(false);
  const draggingRef = useRef(false);
  const menuOpenRef = useRef(false);
  const busyRef     = useRef(false);
  const runIdRef    = useRef(0); // bumps whenever the current walk/behavior should be abandoned

  useEffect(() => { hoverRef.current = hovered; }, [hovered]);
  useEffect(() => { draggingRef.current = dragging; }, [dragging]);
  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);
  useEffect(() => { busyRef.current = busy; }, [busy]);

  // ── Initial placement — bottom-right corner ────────────────────────────────
  useEffect(() => {
    x.set(window.innerWidth - CAT_W - HOME_MARGIN_X);
    y.set(window.innerHeight - CAT_H);
    setReady(true);
    aliveRef.current = true;
    return () => { aliveRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Keep the cat on-screen if the window resizes ───────────────────────────
  useEffect(() => {
    const onResize = () => {
      x.set(clamp(x.get(), 8, window.innerWidth - CAT_W - 8));
      y.set(clamp(y.get(), TOP_SAFE, window.innerHeight - CAT_H));
      if (dockedHome) {
        x.set(window.innerWidth - CAT_W - HOME_MARGIN_X);
        y.set(window.innerHeight - CAT_H);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dockedHome]);

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

  const blocked = useCallback(
    () => draggingRef.current || menuOpenRef.current || busyRef.current,
    [],
  );

  // ── Walk to an arbitrary point on screen ───────────────────────────────────
  // keepWalking: skip settling back into the sitting pose at the end — used to
  // chain several hops (e.g. play-pounce) without remounting SideCat each time,
  // which otherwise races Framer Motion's SVG keyframe animations mid-flight.
  const walkTo = useCallback(async (tx: number, ty: number, speed = WALK_SPEED, keepWalking = false) => {
    const myRun = runIdRef.current;
    const sx = x.get();
    const sy = y.get();
    const dist = Math.hypot(tx - sx, ty - sy);
    if (dist < 4) return;

    setFacing(tx < sx ? "left" : "right");
    setActivity("walking");
    const duration = Math.max(0.25, dist / speed);
    const cx = animate(x, tx, { duration, ease: "linear" });
    const cy = animate(y, ty, { duration, ease: "linear" });
    await Promise.all([cx.finished, cy.finished]).catch(() => {});
    if (runIdRef.current !== myRun || !aliveRef.current) return;
    if (!keepWalking) setActivity("sitting");
    setUiAlign(computeAlign(x.get() + CAT_W / 2));
  }, [x, y]);

  const stopWalking = useCallback(() => {
    runIdRef.current += 1;
    x.stop();
    y.stop();
  }, [x, y]);

  // ── Hearts ─────────────────────────────────────────────────────────────────
  const popHearts = useCallback(() => {
    const id = Date.now() + Math.random();
    setHearts((prev) => [...prev.slice(-4), { id, x: rnd(-22, 22) }]);
    setTimeout(() => setHearts((p) => p.filter((h) => h.id !== id)), 1100);
  }, []);

  // ── Feed / Pet / Play scripts ───────────────────────────────────────────────
  const doFeed = useCallback(async () => {
    setMenuOpen(false);
    setBusy(true);
    setExpr("happy");
    setTailWag(true);
    setTip(pick(FEED_LINES));
    popHearts();
    await pause(500);
    popHearts();
    await pause(900);
    setTailWag(false);
    setTip(null);
    setExpr(isSleeping ? "sleepy" : "normal");
    setBusy(false);
  }, [isSleeping, popHearts]);

  const doPet = useCallback(async () => {
    setMenuOpen(false);
    setBusy(true);
    setExpr("love");
    setTailWag(true);
    setPurring(true);
    setTip(pick(PET_LINES));
    await pause(1500);
    setPurring(false);
    setTailWag(false);
    setTip(null);
    setExpr(isSleeping ? "sleepy" : "normal");
    setBusy(false);
  }, [isSleeping]);

  const doPlay = useCallback(async () => {
    setMenuOpen(false);
    setBusy(true);
    stopWalking();
    setExpr("happy");
    setPounceSpeed(2);

    const homeX = x.get();
    const homeY = y.get();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const hops = [
      { dx: rnd(-100, -50), dy: rnd(-30, 20) },
      { dx: rnd(50, 100),   dy: rnd(-20, 30) },
      { dx: rnd(-60, 60),   dy: rnd(-50, -10) },
    ];

    for (const hop of hops) {
      if (!aliveRef.current) break;
      const tx = clamp(homeX + hop.dx, 8, vw - CAT_W - 8);
      const ty = clamp(homeY + hop.dy, TOP_SAFE, vh - CAT_H - 8);
      setYarn({ x: tx + CAT_W / 2, y: ty + 12 });
      await walkTo(tx, ty, POUNCE_SPEED, true);
      await pause(150);
    }
    if (aliveRef.current) await walkTo(homeX, homeY, POUNCE_SPEED);
    setYarn(null);
    setPounceSpeed(1);
    popHearts();
    setTip(pick(PLAY_LINES));
    await pause(1300);
    setTip(null);
    setExpr(isSleeping ? "sleepy" : "normal");
    setBusy(false);
    setDockedHome(false);
  }, [isSleeping, popHearts, stopWalking, walkTo, x, y]);

  // ── Autonomous behavior loop ────────────────────────────────────────────────
  const runBehavior = useCallback(async (): Promise<void> => {
    await pause(rnd(5500, 11000));
    if (!aliveRef.current) return;
    if (blocked()) { if (aliveRef.current) runBehavior(); return; }

    const r = Math.random();

    if (dockedHome) {
      // ── PEEK (35%) ──────────────────────────────────────────────────────────
      if (r < 0.35) {
        setExpr("surprised");
        setTip(pick(IDLE_TIPS));
        setPeekHide(0);
        await pause(500);
        if (!blocked()) setExpr("normal");
        await pause(rnd(2500, 4500));
        if (!blocked() && !hoverRef.current) { setPeekHide(50); setTip(null); }

      // ── LOOK AROUND (20%) ─────────────────────────────────────────────────
      } else if (r < 0.55) {
        setPeekHide(0);
        setExpr("normal");
        const steps = Math.floor(rnd(2, 5));
        for (let i = 0; i < steps; i++) {
          if (!aliveRef.current || blocked()) break;
          await pause(rnd(700, 1600));
          setEyeX(Math.random() > 0.5 ? rnd(1.5, 3) : rnd(-3, -1.5));
        }
        setEyeX(0);
        await pause(rnd(600, 1200));
        if (!blocked() && !hoverRef.current) setPeekHide(50);

      // ── SLEEP (15%) ──────────────────────────────────────────────────────
      } else if (r < 0.70) {
        setPeekHide(0);
        setIsSleeping(true);
        setExpr("sleepy");
        await pause(rnd(6000, 10000));
        if (aliveRef.current && !blocked()) { setIsSleeping(false); setExpr("normal"); if (!hoverRef.current) setPeekHide(50); }
        else if (aliveRef.current) setIsSleeping(false);

      // ── HEAD OUT TO ROAM (30%) ────────────────────────────────────────────
      } else {
        setPeekHide(0);
        setExpr("normal");
        await pause(200);
        if (!blocked()) {
          setDockedHome(false);
          const target = Math.random() < 0.5 ? pickInteractiveTarget(rootRef.current) : null;
          const tx = target?.x ?? rnd(60, window.innerWidth - CAT_W - 60);
          const ty = target?.y ?? rnd(window.innerHeight * 0.35, window.innerHeight - CAT_H - 20);
          await walkTo(tx, ty, WALK_SPEED, !!target);
          if (target && !blocked()) {
            setPawAt((n) => n + 1);
            nudgeElement(target.el);
            await pause(500);
            setActivity("sitting");
          }
        }
      }
    } else {
      // ── Out roaming: wander, paw at things, sit, sleep, or head home ───────
      if (r < 0.30) {
        const tx = rnd(40, window.innerWidth - CAT_W - 40);
        const ty = rnd(window.innerHeight * 0.3, window.innerHeight - CAT_H - 20);
        await walkTo(tx, ty);

      } else if (r < 0.55) {
        const target = pickInteractiveTarget(rootRef.current);
        if (target) {
          await walkTo(target.x, target.y, WALK_SPEED, true);
          if (!blocked()) {
            setPawAt((n) => n + 1);
            nudgeElement(target.el);
            await pause(500);
            setActivity("sitting");
          }
        }

      } else if (r < 0.72) {
        const steps = Math.floor(rnd(1, 4));
        for (let i = 0; i < steps; i++) {
          if (!aliveRef.current || blocked()) break;
          await pause(rnd(700, 1500));
          setEyeX(Math.random() > 0.5 ? rnd(1.5, 3) : rnd(-3, -1.5));
        }
        setEyeX(0);

      } else if (r < 0.84) {
        setIsSleeping(true);
        setExpr("sleepy");
        await pause(rnd(5000, 9000));
        if (aliveRef.current) { setIsSleeping(false); setExpr("normal"); }

      } else {
        const homeX = window.innerWidth - CAT_W - HOME_MARGIN_X;
        const homeY = window.innerHeight - CAT_H;
        await walkTo(homeX, homeY);
        if (!blocked()) {
          setDockedHome(true);
          if (!hoverRef.current) setPeekHide(50);
        }
      }
    }

    if (aliveRef.current) runBehavior();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocked, dockedHome, walkTo]);

  useEffect(() => { if (ready) runBehavior(); }, [ready, runBehavior]);

  // ── Close the command wheel on outside click ───────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  // ── Hover ──────────────────────────────────────────────────────────────────
  const onEnter = () => {
    setHovered(true); hoverRef.current = true;
    if (dockedHome) setPeekHide(0);
    setTailWag(true); setTip(null);
  };
  const onLeave = () => {
    setHovered(false); hoverRef.current = false;
    setTailWag(false);
    if (dockedHome && !isSleeping && !menuOpen) setPeekHide(50);
  };

  // ── Tap → open command wheel ─────────────────────────────────────────────
  const onTap = () => {
    if (dragging || busy) return;
    stopWalking();
    setPeekHide(0);
    setMenuOpen((v) => !v);
  };

  // ── Drag → pick the cat up and place it anywhere ───────────────────────────
  const onDragStart = () => {
    setDragging(true);
    setMenuOpen(false);
    stopWalking();
    setActivity("sitting");
    setPeekHide(0);
    setExpr("surprised");
    setIsSleeping(false);
  };
  const onDragEnd = (_e: PointerEvent | MouseEvent | TouchEvent, _info: PanInfo) => {
    setDragging(false);
    setExpr("normal");
    const homeX = window.innerWidth - CAT_W - HOME_MARGIN_X;
    const homeY = window.innerHeight - CAT_H;
    const landedHome = Math.hypot(x.get() - homeX, y.get() - homeY) < 40;
    setDockedHome(landedHome);
    if (landedHome) x.set(homeX), y.set(homeY);
    if (!landedHome) setPeekHide(0);
    setUiAlign(computeAlign(x.get() + CAT_W / 2));
  };

  if (!ready) return null;

  const sprite = activity === "walking"
    ? <SideCat flipped={facing === "left"} speed={pounceSpeed} />
    : (
      <div className="relative">
        <Tail wag={tailWag} />
        <motion.div animate={{ y: peekHide }} transition={{ type: "spring", stiffness: 170, damping: 20 }}>
          <FrontCat blink={blink} expr={expr} eyeX={eyeX} />
        </motion.div>
      </div>
    );

  return (
    <>
      {/* ── Yarn ball (play mode) ── */}
      <AnimatePresence>
        {yarn && (
          <motion.span
            className="fixed z-40 pointer-events-none text-xl"
            style={{ left: 0, top: 0 }}
            initial={{ opacity: 0, x: yarn.x, y: yarn.y, rotate: 0 }}
            animate={{ opacity: 1, x: yarn.x, y: yarn.y, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ x: { duration: 0.35, ease: "easeOut" }, y: { duration: 0.35, ease: "easeOut" }, rotate: { duration: 1.2, repeat: Infinity, ease: "linear" } }}
          >
            🧶
          </motion.span>
        )}
      </AnimatePresence>

      {/* ── Decorative overlay: bubble / hearts / purrs / menu — tracks the cat, drawn above it ── */}
      <motion.div
        className="fixed top-0 left-0 z-[51] pointer-events-none"
        style={{ x, y, width: CAT_W, height: CAT_H }}
      >
        <div className="relative w-full h-full">
          {isSleeping && <ZZZ />}
          {purring && <Purrs />}

          <AnimatePresence>
            {tip && !menuOpen && <SpeechBubble key="tip" text={tip} align={uiAlign} />}
          </AnimatePresence>

          <AnimatePresence>
            {menuOpen && (
              <div className="pointer-events-auto">
                <CommandWheel onFeed={doFeed} onPet={doPet} onPlay={doPlay} align={uiAlign} />
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hearts.map((h) => (
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

          {pawAt > 0 && activity === "walking" && (
            <PawSwipe key={pawAt} facing={facing} />
          )}
        </div>
      </motion.div>

      {/* ── The cat itself — draggable, tappable ── */}
      <motion.div
        ref={rootRef}
        className="fixed top-0 left-0 z-50 select-none cursor-grab active:cursor-grabbing"
        style={{ x, y, width: CAT_W, height: CAT_H }}
        drag={!menuOpen && !busy}
        dragMomentum={false}
        dragElastic={0.15}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onTap={onTap}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex items-end justify-center w-full h-full">
          {sprite}
        </div>
      </motion.div>
    </>
  );
}
