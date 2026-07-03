import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Palette, Sun, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { FONTS, THEMES, type ColorTheme, type FontDef, type FontPkg, type ThemeDef } from "../data/ThemeData";

// ── Theme swatch circle ────────────────────────────────────────────────────
function Swatch({ def, active, onClick }: { def: ThemeDef; active: boolean; onClick: () => void }) {
  const gradient = `linear-gradient(135deg, ${def.swatch[0]} 0%, ${def.swatch[1]} 50%, ${def.swatch[2]} 100%)`;
  return (
    <button
      onClick={onClick}
      title={def.label}
      className="flex flex-col items-center gap-1.5 focus:outline-none"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-11 h-11 rounded-full flex items-center justify-center transition-all"
        style={{
          background: gradient,
          boxShadow: active
            ? `0 0 0 2px var(--color-neutral-900, #1c1c1c), 0 0 0 4px ${def.ring}`
            : undefined,
        }}
      >
        {active && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-white text-xs font-bold drop-shadow"
          >
            ✓
          </motion.span>
        )}
      </motion.div>
      <span className={`text-[0.6rem] font-semibold tracking-wide ${active ? "text-[var(--text-base)]" : "text-neutral-500"}`}>
        {def.label}
      </span>
    </button>
  );
}

// ── Font card ──────────────────────────────────────────────────────────────
function FontCard({ def, active, onClick }: { def: FontDef; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border transition-all text-left ${
        active
          ? "border-[var(--accent-1,#38bdf8)] bg-[var(--accent-1,#38bdf8)]/8"
          : "border-neutral-700 hover:border-neutral-600 bg-neutral-800/40"
      }`}
    >
      {/* Aa preview */}
      <span
        className="text-2xl font-bold w-10 shrink-0 leading-none"
        style={{
          fontFamily: def.family,
          color: active ? "var(--accent-1, #38bdf8)" : "var(--text-base)",
        }}
      >
        Ag
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-tight truncate">{def.label}</p>
        <p className="text-[0.65rem] text-neutral-500 mt-0.5">{def.description}</p>
      </div>
      {active && (
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: "var(--accent-1, #38bdf8)" }}
        />
      )}
    </motion.button>
  );
}

// ── Mode chip ──────────────────────────────────────────────────────────────
function ModeChip({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all border ${
        active
          ? "bg-[var(--accent-1,#38bdf8)]/10 border-[var(--accent-1,#38bdf8)] text-[var(--text-base)]"
          : "border-neutral-700 text-neutral-500 hover:border-neutral-600"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ── Section heading ────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.65rem] font-bold tracking-[0.18em] text-neutral-500 uppercase mb-3">
      {children}
    </p>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ThemeDrawer() {
  const [open, setOpen] = useState(false);
  const { mode, colorTheme, font, toggleMode, setColorTheme, setFont } = useTheme();

  const activeDef = THEMES.find((t) => t.id === colorTheme) ?? THEMES[0];

  return (
    <>
      {/* ── Backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[58] bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Drawer panel ── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 bottom-0 z-[59] w-72 border-l border-neutral-700 bg-neutral-900 flex flex-col overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Palette size={16} style={{ color: "var(--accent-1, #38bdf8)" }} />
                <span className="text-sm font-bold tracking-wide">Appearance</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-[var(--text-base)] hover:bg-neutral-800 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">

              {/* ── Mode ── */}
              <section>
                <SectionLabel>Mode</SectionLabel>
                <div className="flex gap-2">
                  <ModeChip
                    icon={<Moon size={14} />}
                    label="Dark"
                    active={mode === "dark"}
                    onClick={() => mode !== "dark" && toggleMode()}
                  />
                  <ModeChip
                    icon={<Sun size={14} />}
                    label="Light"
                    active={mode === "light"}
                    onClick={() => mode !== "light" && toggleMode()}
                  />
                </div>
              </section>

              {/* ── Color theme ── */}
              <section>
                <SectionLabel>Color Theme</SectionLabel>
                {/* Active theme label */}
                <p className="text-xs text-neutral-400 mb-4 -mt-1">
                  Currently:&nbsp;
                  <span style={{ color: "var(--accent-1, #38bdf8)" }} className="font-semibold">
                    {activeDef.label}
                  </span>
                </p>
                <div className="flex justify-between">
                  {THEMES.map((t) => (
                    <Swatch
                      key={t.id}
                      def={t}
                      active={colorTheme === t.id}
                      onClick={() => setColorTheme(t.id as ColorTheme)}
                    />
                  ))}
                </div>

                {/* Gradient preview strip */}
                <motion.div
                  key={colorTheme + mode}
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 h-1 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${activeDef.swatch[0]}, ${activeDef.swatch[1]}, ${activeDef.swatch[2]})`,
                  }}
                />
              </section>

              {/* ── Font package ── */}
              <section>
                <SectionLabel>Font Family</SectionLabel>
                <div className="space-y-2">
                  {FONTS.map((f) => (
                    <FontCard
                      key={f.id}
                      def={f}
                      active={font === f.id}
                      onClick={() => setFont(f.id as FontPkg)}
                    />
                  ))}
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-neutral-800">
              <p className="text-[0.6rem] text-neutral-600 text-center tracking-wider">
                Preferences saved automatically
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Trigger tab — sticks out from right edge ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="tab"
            onClick={() => setOpen(true)}
            title="Appearance settings"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[57]
                       flex flex-col items-center gap-2
                       bg-neutral-800 border border-r-0 border-neutral-700
                       rounded-l-xl px-2 py-4 cursor-pointer
                       hover:bg-neutral-700 transition-colors duration-200"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <Palette size={15} className="text-neutral-400" />
            {/* Live gradient stripe — shows current theme color */}
            <motion.div
              key={colorTheme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-1 h-9 rounded-full"
              style={{
                background: `linear-gradient(to bottom, ${activeDef.swatch[0]}, ${activeDef.swatch[1]}, ${activeDef.swatch[2]})`,
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
