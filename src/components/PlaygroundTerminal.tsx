import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ALL_SKILLS, CATEGORIES, PROFICIENCY_LABEL } from "../data/PlaygroundData";
import { myProjects } from "../data/ProjectsData";
import { myExperience } from "../data/ExperienceData";
import { myWorkEmail } from "../constants/constants";
import { useTheme } from "../context/ThemeContext";

const ROUTES: Record<string, string> = {
  home: "/", explore: "/",
  services: "/services",
  experience: "/experience", exp: "/experience",
  projects: "/projects",
  about: "/about",
  articles: "/articles", blog: "/articles",
  stack: "/stack",
  feed: "/feed",
  playground: "/playground",
  guestbook: "/guest-book", "guest-book": "/guest-book",
  contact: "/contact",
};

const COMMAND_NAMES = [
  "help", "whoami", "about", "skills", "projects", "experience", "stats",
  "contact", "theme", "open", "goto", "cd", "resume", "date", "echo",
  "clear", "sudo", "ls", "cat", "history", "neofetch", "matrix",
];

const FILE_NAMES = ["about.md", "skills.json", "projects.log", "experience.txt", "contact.card", "stats.txt"];
const HIDDEN_FILE = ".secrets";

// ── Theme-reactive accent classes (light shade for light mode, brighter for dark) ──
const C = {
  green: "text-green-600 dark:text-green-400",
  amber: "text-amber-600 dark:text-amber-400",
  red: "text-red-600 dark:text-red-400",
  sky: "text-sky-600 dark:text-sky-400",
  violet: "text-violet-600 dark:text-violet-400",
};

const HELP_TEXT = `Available commands:

  help                 show this list
  whoami               who you're dealing with
  about                the longer story
  skills [category]    list skills, optionally filtered (try: skills ai)
  projects             list projects and their status
  experience           work history timeline
  stats                the numbers that matter
  contact              how to reach me
  theme <dark|light>   actually switches the site's theme
  open <page>          actually navigates there (try: open projects)
  resume               how to get a copy
  neofetch             system info, dev-style
  ls / cat <file>      poke around like it's a filesystem
  history              your past commands
  matrix               don't
  date                 current date & time
  echo <text>          repeats text back
  clear                clear the terminal
  sudo hire-me         try it

  Tab completes commands. ↑/↓ recall history.`;

const NEOFETCH = (mode: string) => `fahad@portfolio
───────────────
OS          PortfolioOS (React + Vite)
Shell       fahad-sh 1.0
Theme       ${mode}
Role        Full-Stack AI Engineer
Location    Lahore, Pakistan
Experience  2.5+ years
Stack       React · Node.js · MongoDB · Socket.IO
Focus       AI/LLM integration · real-time systems
Currently   JobJen @ Ragzon Solutions
Status      Open to interesting problems`;

type Line = { id: number; kind: "input" | "output"; content: ReactNode };

let idCounter = 0;
const nextId = () => idCounter++;

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

const HISTORY_KEY = "playground-terminal-history";

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

// ── Matrix rain easter egg — deliberately always dark/green, it's the whole joke ──
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = canvas.clientWidth;
    const height = 160;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(0);
    const chars = "01アイウエオカキクケコサシスセソ";

    let frame = 0;
    let stopped = false;

    const draw = () => {
      if (stopped) return;
      ctx.fillStyle = "rgba(13,15,18,0.15)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#4ade80";
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        drops[i] = y * fontSize > height && Math.random() > 0.975 ? 0 : y + 1;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    const timeout = setTimeout(() => {
      stopped = true;
      cancelAnimationFrame(frame);
    }, 4000);

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full rounded block" style={{ height: 160 }} />;
}

const PlaygroundTerminal = () => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useTheme();
  const [lines, setLines] = useState<Line[]>([
    {
      id: nextId(),
      kind: "output",
      content: (
        <>
          <p>Welcome to fahad@portfolio — interactive shell v1.0</p>
          <p className="text-neutral-500">Type <span className={C.green}>help</span> to see what's possible.</p>
        </>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(() => loadHistory());
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-50)));
  }, [history]);

  const push = (kind: Line["kind"], content: ReactNode) => {
    setLines((prev) => [...prev, { id: nextId(), kind, content }]);
  };

  // ── Renderers shared between direct commands and `cat <file>` ─────────────
  const renderAbout = () => (
    <p>
      Full-stack engineer with an AI-first workflow — core engineer on JobJen, an AI interview platform
      that scaled from 50 to 7,000+ users. I own things end-to-end: scoring pipelines, real-time
      infrastructure, and the occasional 8-second API I turn into a 1-second one.
    </p>
  );

  const renderSkills = (arg: string): ReactNode => {
    const wanted = arg ? normalize(arg) : "";
    const category = wanted
      ? CATEGORIES.find((c) => c !== "All" && normalize(c).includes(wanted))
      : undefined;
    if (arg && !category) {
      return (
        <p className={C.amber}>
          No category matches "{arg}". Try one of: {CATEGORIES.filter((c) => c !== "All").join(", ")}
        </p>
      );
    }
    const list = category ? ALL_SKILLS.filter((s) => s.category === category) : ALL_SKILLS;
    return (
      <div className="font-mono">
        {category && <p className="text-neutral-500 mb-1">category: {category}</p>}
        {list.map((s) => (
          <p key={s.name}>
            <span className="inline-block w-40 text-[var(--text-base)]">{s.name}</span>
            <span className={C.green}>{"●".repeat(s.proficiency)}</span>
            <span className="text-neutral-700">{"○".repeat(5 - s.proficiency)}</span>
            <span className="text-neutral-500 ml-2">{PROFICIENCY_LABEL[s.proficiency]}</span>
          </p>
        ))}
      </div>
    );
  };

  const renderProjects = () => (
    <div className="font-mono">
      {myProjects.map((p) => (
        <p key={p.slug}>
          <span className="inline-block w-40 text-[var(--text-base)]">{p.title}</span>
          {p.status && (
            <span className={p.status === "live" ? C.green : C.amber}>
              [{p.status === "live" ? "LIVE" : "BUILDING"}]
            </span>
          )}
          {p.featured && <span className={`${C.violet} ml-2`}>★ featured</span>}
        </p>
      ))}
      <p className="text-neutral-500 mt-1">→ open projects</p>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-2">
      {myExperience.map((exp) => (
        <div key={exp._id}>
          <p className="text-[var(--text-base)] font-semibold">
            {exp.companyName} <span className="text-neutral-500 font-normal">— {exp.designation}</span>
          </p>
          <p className="text-neutral-500 text-xs">{exp.duration.from} – {exp.duration.to} · {exp.location}</p>
          <p>{exp.brief}</p>
        </div>
      ))}
    </div>
  );

  const renderStats = () => (
    <pre className="whitespace-pre-wrap font-mono">{`7,000+   users scaled (from 50 on JobJen)
8x       faster APIs (8s cut to <1s)
2.5+     years shipping production code
2        solo products built & launched`}</pre>
  );

  const renderContact = () => (
    <p>
      Email: <span className={C.green}>{myWorkEmail}</span> · or just{" "}
      <button
        type="button"
        className={`${C.sky} underline underline-offset-2`}
        onClick={() => navigate("/contact")}
      >
        open contact
      </button>
    </p>
  );

  const FILES: Record<string, () => ReactNode> = {
    "about.md": renderAbout,
    "skills.json": () => renderSkills(""),
    "projects.log": renderProjects,
    "experience.txt": renderExperience,
    "contact.card": renderContact,
    "stats.txt": renderStats,
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    push("input", trimmed || " ");
    if (!trimmed) return;

    const [cmdRaw, ...args] = trimmed.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    const arg = args.join(" ");

    switch (cmd) {
      case "help":
        push("output", <pre className="whitespace-pre-wrap font-mono">{HELP_TEXT}</pre>);
        break;

      case "whoami":
        push(
          "output",
          <p>
            <span className={`${C.green} font-semibold`}>Fahad Khan</span> — Full-Stack AI Engineer based in
            Lahore, Pakistan. ~2.5 years shipping production MERN &amp; AI systems.
          </p>
        );
        break;

      case "about":
        push("output", renderAbout());
        break;

      case "skills":
        push("output", renderSkills(arg));
        break;

      case "projects":
        push("output", renderProjects());
        break;

      case "experience":
        push("output", renderExperience());
        break;

      case "stats":
        push("output", renderStats());
        break;

      case "contact":
        push("output", renderContact());
        break;

      case "theme": {
        const want = arg.toLowerCase();
        if (want !== "dark" && want !== "light") {
          push("output", <p className={C.amber}>usage: theme &lt;dark|light&gt;</p>);
          break;
        }
        if (want === mode) {
          push("output", <p>Already in {want} mode.</p>);
        } else {
          toggleMode();
          push("output", <p>Switched to {want} mode. ✓</p>);
        }
        break;
      }

      case "open":
      case "goto":
      case "cd": {
        const key = arg.toLowerCase().replace(/^\//, "");
        const path = ROUTES[key];
        if (!path) {
          push(
            "output",
            <p className={C.amber}>
              Unknown page "{arg}". Try: {Object.keys(ROUTES).join(", ")}
            </p>
          );
          break;
        }
        push("output", <p>Navigating to {path}...</p>);
        setTimeout(() => navigate(path), 350);
        break;
      }

      case "resume":
        push(
          "output",
          <p>
            📄 Say hi at <span className={C.green}>{myWorkEmail}</span> and I'll send a copy straight over.
          </p>
        );
        break;

      case "ls": {
        const showHidden = arg === "-a";
        push(
          "output",
          <p className="font-mono">
            {FILE_NAMES.join("  ")}
            {showHidden && <span className="text-neutral-600">  {HIDDEN_FILE}</span>}
          </p>
        );
        break;
      }

      case "cat": {
        const file = arg.trim();
        if (!file) {
          push("output", <p className={C.amber}>usage: cat &lt;file&gt;</p>);
        } else if (file === HIDDEN_FILE) {
          push(
            "output",
            <p className={C.violet}>🔒 nothing to see here. unless you know the magic words (try: sudo hire-me)</p>
          );
        } else if (FILES[file]) {
          push("output", FILES[file]());
        } else {
          push("output", <p className={C.red}>cat: {file}: No such file or directory</p>);
        }
        break;
      }

      case "history":
        push(
          "output",
          history.length === 0 ? (
            <p className="text-neutral-500">no history yet</p>
          ) : (
            <pre className="whitespace-pre-wrap font-mono">
              {history.map((h, i) => `  ${i + 1}  ${h}`).join("\n")}
            </pre>
          )
        );
        break;

      case "neofetch":
        push("output", <pre className="whitespace-pre-wrap font-mono">{NEOFETCH(mode)}</pre>);
        break;

      case "matrix":
        push("output", <MatrixRain />);
        break;

      case "date":
        push("output", <p>{new Date().toString()}</p>);
        break;

      case "echo":
        push("output", <p>{arg || " "}</p>);
        break;

      case "clear":
        setLines([]);
        return;

      case "sudo":
        if (normalize(arg) === "hireme") {
          push("output", <p className={C.green}>Permission granted. Redirecting to /contact...</p>);
          setTimeout(() => navigate("/contact"), 500);
        } else {
          push("output", <p className={C.red}>Nice try. This incident will be reported. 🚓</p>);
        }
        break;

      default:
        push(
          "output",
          <p>
            command not found: <span className={C.red}>{cmd}</span> — type{" "}
            <span className={C.green}>help</span> to see available commands.
          </p>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setHistory((prev) => (input.trim() ? [...prev, input] : prev));
    setHistoryIndex(null);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();

      const hasSpace = input.includes(" ");
      if (!hasSpace) {
        const matches = COMMAND_NAMES.filter((c) => c.startsWith(input.toLowerCase()));
        if (matches.length === 1) {
          setInput(matches[0] + " ");
        } else if (matches.length > 1) {
          push("output", <p className="text-neutral-500 font-mono">{matches.join("  ")}</p>);
        }
        return;
      }

      const [head, ...rest] = input.split(" ");
      const partial = rest.join(" ").toLowerCase();
      const pool = head === "cat" ? FILE_NAMES : head === "skills" ? CATEGORIES.filter((c) => c !== "All") : null;
      if (!pool) return;
      const matches = pool.filter((p) => normalize(p).startsWith(normalize(partial)));
      if (matches.length === 1) {
        setInput(`${head} ${matches[0]}`);
      } else if (matches.length > 1) {
        push("output", <p className="text-neutral-500 font-mono">{matches.join("  ")}</p>);
      }
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900"
      style={{ color: "var(--text-base)" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800 border-b border-neutral-700">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-neutral-500 font-mono">fahad@portfolio: ~</span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="h-[420px] overflow-y-auto px-4 py-4 space-y-2 font-mono text-sm scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
      >
        {lines.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {line.kind === "input" ? (
              <p className="flex gap-2">
                <span className={`${C.green} shrink-0`}>fahad@portfolio</span>
                <span className="text-neutral-600 shrink-0">~$</span>
                <span>{line.content}</span>
              </p>
            ) : (
              <div className="text-neutral-400 pl-0">{line.content}</div>
            )}
          </motion.div>
        ))}

        {/* Live input line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className={`${C.green} shrink-0`}>fahad@portfolio</span>
          <span className="text-neutral-600 shrink-0">~$</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent outline-none border-none font-mono text-sm caret-green-600 dark:caret-green-400"
            style={{ color: "var(--text-base)" }}
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
};

export default PlaygroundTerminal;
