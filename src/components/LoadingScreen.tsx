import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Custom ease — snappy deceleration
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2900);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900 overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >

          {/* ── Background "FK" watermark ── */}
          <motion.span
            aria-hidden
            className="pointer-events-none select-none absolute font-black text-neutral-800 leading-none tracking-tighter"
            style={{ fontSize: "clamp(8rem, 40vw, 28rem)" }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            FK
          </motion.span>

          {/* ── Scanning light line ── */}
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--spotlight-color, rgba(56,189,248,0.3)) 30%, var(--accent-1, #38bdf8) 50%, var(--spotlight-color, rgba(56,189,248,0.3)) 70%, transparent 100%)",
              opacity: 0.6,
            }}
            initial={{ top: "0%" }}
            animate={{ top: "105%" }}
            transition={{ duration: 2.6, ease: "linear" }}
          />

          {/* ── Center block ── */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Top line */}
            <motion.div
              className="h-px bg-neutral-600 mb-6"
              style={{ width: 200, transformOrigin: "center", originX: 0.5 }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
            />

            {/* Name — clips up from behind the bottom edge */}
            <div className="overflow-hidden pb-1">
              <motion.h1
                className="font-black text-white uppercase text-center"
                style={{
                  fontSize: "clamp(2.4rem, 8vw, 5.5rem)",
                  letterSpacing: "0.22em",
                  lineHeight: 1.1,
                }}
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.35, ease: EASE_OUT_EXPO }}
              >
                Fahad Khan
              </motion.h1>
            </div>

            {/* Role subtitle */}
            <motion.p
              className="mt-4 text-xs sm:text-sm font-semibold tracking-[0.45em] text-neutral-400 uppercase text-center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 }}
            >
              Full-Stack Developer
            </motion.p>

            {/* Dot separator */}
            <motion.span
              className="mt-3 w-1 h-1 rounded-full"
              style={{ background: "var(--accent-1, #0ea5e9)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            />

            {/* Bottom line */}
            <motion.div
              className="h-px bg-neutral-600 mt-6"
              style={{ width: 200, transformOrigin: "center", originX: 0.5 }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT_EXPO }}
            />
          </div>

          {/* ── Progress bar ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-800">
            <motion.div
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-1, #0ea5e9), var(--accent-2, #6366f1), var(--grad-c, #8b5cf6))",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.7, ease: "linear" }}
            />
          </div>

          {/* ── Corner labels ── */}
          <motion.span
            className="absolute top-5 left-6 text-[10px] font-mono tracking-[0.25em] text-neutral-600 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            Portfolio v1.0
          </motion.span>

          <motion.span
            className="absolute bottom-5 right-6 text-[10px] font-mono tracking-[0.25em] text-neutral-600 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            2025 · Karachi, PK
          </motion.span>

          {/* ── Corner bracket accents ── */}
          {[
            "top-4 left-4 border-t border-l",
            "top-4 right-4 border-t border-r",
            "bottom-4 left-4 border-b border-l",
            "bottom-4 right-4 border-b border-r",
          ].map((cls) => (
            <motion.div
              key={cls}
              aria-hidden
              className={`absolute w-6 h-6 border-neutral-700 ${cls}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
          ))}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
