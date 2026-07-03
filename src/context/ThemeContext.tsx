import { createContext, useContext, useEffect, useState } from "react";
import type { ColorTheme, FontPkg } from "../data/ThemeData";

interface ThemeContextValue {
  mode:           "dark" | "light";
  colorTheme:     ColorTheme;
  font:           FontPkg;
  toggleMode:     () => void;
  setColorTheme:  (t: ColorTheme) => void;
  setFont:        (f: FontPkg) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode:          "dark",
  colorTheme:    "default",
  font:          "inter",
  toggleMode:    () => {},
  setColorTheme: () => {},
  setFont:       () => {},
});

const COLOR_CLASSES: ColorTheme[] = ["default", "sahara", "ocean", "forest", "aurora"];
const FONT_CLASSES:  FontPkg[]    = ["inter", "mono", "serif"];

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"dark" | "light">(() =>
    (localStorage.getItem("th-mode") as "dark" | "light") ?? "dark"
  );
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() =>
    (localStorage.getItem("th-color") as ColorTheme) ?? "default"
  );
  const [font, setFontState] = useState<FontPkg>(() =>
    (localStorage.getItem("th-font") as FontPkg) ?? "inter"
  );

  useEffect(() => {
    const root = document.documentElement;

    // ── Mode ──
    root.classList.toggle("dark", mode === "dark");
    localStorage.setItem("th-mode", mode);

    // ── Color theme ──
    COLOR_CLASSES.forEach((c) => root.classList.remove(`theme-${c}`));
    if (colorTheme !== "default") root.classList.add(`theme-${colorTheme}`);
    localStorage.setItem("th-color", colorTheme);

    // ── Font package ──
    FONT_CLASSES.forEach((f) => root.classList.remove(`font-${f}-pkg`));
    root.classList.add(`font-${font}-pkg`);
    localStorage.setItem("th-font", font);
  }, [mode, colorTheme, font]);

  const toggleMode     = () => setMode((m) => (m === "dark" ? "light" : "dark"));
  const setColorTheme  = (t: ColorTheme) => setColorThemeState(t);
  const setFont        = (f: FontPkg) => setFontState(f);

  return (
    <ThemeContext.Provider value={{ mode, colorTheme, font, toggleMode, setColorTheme, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
