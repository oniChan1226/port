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
  date                 current date & time
  echo <text>          repeats text back
  clear                clear the terminal
  sudo hire-me         try it`;

type Line = { id: number; kind: "input" | "output"; content: ReactNode };

let idCounter = 0;
const nextId = () => idCounter++;

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
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
          <p className="text-neutral-500">Type <span className="text-green-400">help</span> to see what's possible.</p>
        </>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const push = (kind: Line["kind"], content: ReactNode) => {
    setLines((prev) => [...prev, { id: nextId(), kind, content }]);
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    push("input", trimmed || " ");
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
            <span className="text-green-400 font-semibold">Fahad Khan</span> — Full-Stack AI Engineer based in
            Lahore, Pakistan. ~2.5 years shipping production MERN &amp; AI systems.
          </p>
        );
        break;

      case "about":
        push(
          "output",
          <p>
            Full-stack engineer with an AI-first workflow — core engineer on JobJen, an AI interview platform
            that scaled from 50 to 7,000+ users. I own things end-to-end: scoring pipelines, real-time
            infrastructure, and the occasional 8-second API I turn into a 1-second one.
          </p>
        );
        break;

      case "skills": {
        const wanted = arg ? normalize(arg) : "";
        const category = wanted
          ? CATEGORIES.find((c) => c !== "All" && normalize(c).includes(wanted))
          : undefined;
        if (arg && !category) {
          push(
            "output",
            <p className="text-amber-400">
              No category matches "{arg}". Try one of: {CATEGORIES.filter((c) => c !== "All").join(", ")}
            </p>
          );
          break;
        }
        const list = category ? ALL_SKILLS.filter((s) => s.category === category) : ALL_SKILLS;
        push(
          "output",
          <div className="font-mono">
            {category && <p className="text-neutral-500 mb-1">category: {category}</p>}
            {list.map((s) => (
              <p key={s.name}>
                <span className="inline-block w-40 text-[var(--text-base)]">{s.name}</span>
                <span className="text-green-400">{"●".repeat(s.proficiency)}</span>
                <span className="text-neutral-700">{"○".repeat(5 - s.proficiency)}</span>
                <span className="text-neutral-500 ml-2">{PROFICIENCY_LABEL[s.proficiency]}</span>
              </p>
            ))}
          </div>
        );
        break;
      }

      case "projects":
        push(
          "output",
          <div className="font-mono">
            {myProjects.map((p) => (
              <p key={p.slug}>
                <span className="inline-block w-40 text-[var(--text-base)]">{p.title}</span>
                {p.status && (
                  <span className={p.status === "live" ? "text-green-400" : "text-amber-400"}>
                    [{p.status === "live" ? "LIVE" : "BUILDING"}]
                  </span>
                )}
                {p.featured && <span className="text-violet-400 ml-2">★ featured</span>}
              </p>
            ))}
            <p className="text-neutral-500 mt-1">→ open projects</p>
          </div>
        );
        break;

      case "experience":
        push(
          "output",
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
        break;

      case "stats":
        push(
          "output",
          <pre className="whitespace-pre-wrap font-mono">{`7,000+   users scaled (from 50 on JobJen)
8x       faster APIs (8s cut to <1s)
2.5+     years shipping production code
2        solo products built & launched`}</pre>
        );
        break;

      case "contact":
        push(
          "output",
          <p>
            Email: <span className="text-green-400">{myWorkEmail}</span> · or just{" "}
            <button
              type="button"
              className="text-sky-400 underline underline-offset-2"
              onClick={() => navigate("/contact")}
            >
              open contact
            </button>
          </p>
        );
        break;

      case "theme": {
        const want = arg.toLowerCase();
        if (want !== "dark" && want !== "light") {
          push("output", <p className="text-amber-400">usage: theme &lt;dark|light&gt;</p>);
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
            <p className="text-amber-400">
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
            📄 Say hi at <span className="text-green-400">{myWorkEmail}</span> and I'll send a copy straight over.
          </p>
        );
        break;

      case "date":
        push("output", <p>{new Date().toString()}</p>);
        break;

      case "echo":
        push("output", <p>{arg || " "}</p>);
        break;

      case "clear":
        setLines([]);
        return;

      case "sudo":
        if (normalize(arg) === "hireme") {
          push("output", <p className="text-green-400">Permission granted. Redirecting to /contact...</p>);
          setTimeout(() => navigate("/contact"), 500);
        } else {
          push("output", <p className="text-red-400">Nice try. This incident will be reported. 🚓</p>);
        }
        break;

      default:
        push(
          "output",
          <p>
            command not found: <span className="text-red-400">{cmd}</span> — type{" "}
            <span className="text-green-400">help</span> to see available commands.
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
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-[#0d0f12] text-[#d4d4d4]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#16181c] border-b border-neutral-800">
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
                <span className="text-green-400 shrink-0">fahad@portfolio</span>
                <span className="text-neutral-600 shrink-0">~$</span>
                <span>{line.content}</span>
              </p>
            ) : (
              <div className="text-neutral-300 pl-0">{line.content}</div>
            )}
          </motion.div>
        ))}

        {/* Live input line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400 shrink-0">fahad@portfolio</span>
          <span className="text-neutral-600 shrink-0">~$</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent outline-none border-none font-mono text-sm text-[#d4d4d4] caret-green-400"
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
};

export default PlaygroundTerminal;
