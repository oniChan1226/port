export type ColorTheme = "default" | "sahara" | "ocean" | "forest" | "aurora";
export type FontPkg    = "inter"   | "mono"   | "serif";

export interface ThemeDef {
  id:           ColorTheme;
  label:        string;
  /** Three stop colors used to render the swatch preview circle */
  swatch:       [string, string, string];
  /** Accent ring color shown around the active swatch */
  ring:         string;
}

export const THEMES: ThemeDef[] = [
  {
    id:     "default",
    label:  "Default",
    swatch: ["#38bdf8", "#818cf8", "#c084fc"],
    ring:   "#38bdf8",
  },
  {
    id:     "sahara",
    label:  "Sahara",
    swatch: ["#fbbf24", "#f97316", "#ef4444"],
    ring:   "#fbbf24",
  },
  {
    id:     "ocean",
    label:  "Ocean",
    swatch: ["#22d3ee", "#38bdf8", "#0ea5e9"],
    ring:   "#22d3ee",
  },
  {
    id:     "forest",
    label:  "Forest",
    swatch: ["#4ade80", "#34d399", "#2dd4bf"],
    ring:   "#4ade80",
  },
  {
    id:     "aurora",
    label:  "Aurora",
    swatch: ["#c084fc", "#f472b6", "#fb7185"],
    ring:   "#c084fc",
  },
];

export interface FontDef {
  id:          FontPkg;
  label:       string;
  description: string;
  /** CSS font-family value for inline preview rendering */
  family:      string;
}

export const FONTS: FontDef[] = [
  {
    id:          "inter",
    label:       "Inter",
    description: "Clean · Modern",
    family:      "'Inter', sans-serif",
  },
  {
    id:          "mono",
    label:       "JetBrains Mono",
    description: "Code · Technical",
    family:      "'JetBrains Mono', monospace",
  },
  {
    id:          "serif",
    label:       "Playfair",
    description: "Elegant · Editorial",
    family:      "'Playfair Display', serif",
  },
];
