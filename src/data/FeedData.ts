export type FeedType = "shipped" | "improved" | "fixed" | "note";

export interface FeedItem {
  timestamp: string;
  title: string;
  description: string;
  icon: string;
  type: FeedType;
}

export const myFeed: FeedItem[] = [
  {
    timestamp: "2026-07-06",
    title: "🕹️ An interactive Playground suite",
    description:
      "Shipped a working terminal emulator (real commands, real theme switching, persistent history) and an animated request-lifecycle visualizer that shows JobJen's dual AI-scoring pipeline actually running — client to load balancer to parallel Whisper + GPT Realtime scoring, live.",
    icon: "Terminal",
    type: "shipped",
  },
  {
    timestamp: "2026-07-05",
    title: "🎨 Theming got real depth",
    description:
      "Every surface — sidebar, badges, hero highlight, playground panels — now reacts to both the 5 color themes and light/dark mode, with a circular reveal animation sweeping from wherever you clicked the toggle.",
    icon: "Palette",
    type: "improved",
  },
  {
    timestamp: "2026-07-03",
    title: "📐 A sidebar that collapses",
    description:
      "The desktop sidebar now folds down to an icon rail and remembers your preference across visits — small win for anyone on a smaller screen.",
    icon: "PanelLeftClose",
    type: "shipped",
  },
  {
    timestamp: "2026-07-01",
    title: "⭐ JobJen joined the project list",
    description:
      "Added the AI interview platform I helped scale from 50 to 7,000+ users as a featured project, with the real architecture behind its scoring pipeline.",
    icon: "Star",
    type: "shipped",
  },
  {
    timestamp: "2026-06-24",
    title: "🌌 Atmospheric background glows",
    description:
      "Added theme-aware ambient light orbs that drift slowly behind every page — different palette, position, and motion per color theme.",
    icon: "Sparkles",
    type: "improved",
  },
  {
    timestamp: "2026-06-20",
    title: "🖌️ A proper theme drawer",
    description:
      "Built out full theme customization — five color themes, three font packages, light/dark mode — all tucked into a slide-out drawer.",
    icon: "SlidersHorizontal",
    type: "shipped",
  },
  {
    timestamp: "2026-06-15",
    title: "🐱 A cat learned to peek",
    description:
      "Added a small animated cat that peeks out from the edge of the screen every so often. No functional purpose. Purely for delight.",
    icon: "Cat",
    type: "note",
  },
  {
    timestamp: "2026-06-08",
    title: "🚀 Portfolio v1 shipped",
    description:
      "Took this from a blank repo to a complete, live portfolio — projects, experience, stack, and the first version of this feed.",
    icon: "Rocket",
    type: "shipped",
  },
];
