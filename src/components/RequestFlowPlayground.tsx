import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Brain, Database, Layers3, Lightbulb, Mic, Play, Radio, Route, Server, Smartphone } from "lucide-react";

type NodeId = "client" | "gateway" | "server" | "mongo" | "queue" | "whisper" | "gpt" | "socket";
type Category = "client" | "edge" | "compute" | "queue" | "ai" | "data" | "realtime";

const CATEGORY_META: Record<Category, { label: string; dot: string }> = {
  client:   { label: "Client",   dot: "bg-sky-500" },
  edge:     { label: "Edge",     dot: "bg-violet-500" },
  compute:  { label: "Compute",  dot: "bg-indigo-500" },
  queue:    { label: "Async",    dot: "bg-amber-500" },
  ai:       { label: "AI",       dot: "bg-fuchsia-500" },
  data:     { label: "Data",     dot: "bg-emerald-500" },
  realtime: { label: "Realtime", dot: "bg-cyan-500" },
};

const CATEGORY_STYLES: Record<Category, { border: string; bg: string; text: string; glow: string }> = {
  client:   { border: "border-sky-400 dark:border-sky-500",         bg: "bg-sky-100 dark:bg-sky-500/15",         text: "text-sky-700 dark:text-sky-400",         glow: "shadow-[0_0_18px_rgba(56,189,248,0.55)]" },
  edge:     { border: "border-violet-400 dark:border-violet-500",   bg: "bg-violet-100 dark:bg-violet-500/15",   text: "text-violet-700 dark:text-violet-400",   glow: "shadow-[0_0_18px_rgba(167,139,250,0.55)]" },
  compute:  { border: "border-indigo-400 dark:border-indigo-500",   bg: "bg-indigo-100 dark:bg-indigo-500/15",   text: "text-indigo-700 dark:text-indigo-400",   glow: "shadow-[0_0_18px_rgba(129,140,248,0.55)]" },
  queue:    { border: "border-amber-400 dark:border-amber-500",     bg: "bg-amber-100 dark:bg-amber-500/15",     text: "text-amber-700 dark:text-amber-400",     glow: "shadow-[0_0_18px_rgba(251,191,36,0.55)]" },
  ai:       { border: "border-fuchsia-400 dark:border-fuchsia-500", bg: "bg-fuchsia-100 dark:bg-fuchsia-500/15", text: "text-fuchsia-700 dark:text-fuchsia-400", glow: "shadow-[0_0_18px_rgba(232,121,249,0.55)]" },
  data:     { border: "border-emerald-400 dark:border-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-500/15", text: "text-emerald-700 dark:text-emerald-400", glow: "shadow-[0_0_18px_rgba(52,211,153,0.55)]" },
  realtime: { border: "border-cyan-400 dark:border-cyan-500",       bg: "bg-cyan-100 dark:bg-cyan-500/15",       text: "text-cyan-700 dark:text-cyan-400",       glow: "shadow-[0_0_18px_rgba(34,211,238,0.55)]" },
};

interface NodeDef {
  id: NodeId;
  label: string;
  sublabel: string;
  category: Category;
  x: number; // 0–100, percent of container
  y: number; // 0–100, percent of container
  icon: React.ReactNode;
}

const NODES: NodeDef[] = [
  { id: "client",  label: "Browser",       sublabel: "You",            category: "client",   x: 6,  y: 50, icon: <Smartphone size={16} /> },
  { id: "gateway", label: "Load Balancer", sublabel: "routes traffic", category: "edge",     x: 24, y: 50, icon: <Route size={16} /> },
  { id: "server",  label: "API Server",    sublabel: "Node · Express", category: "compute",  x: 44, y: 50, icon: <Server size={16} /> },
  { id: "mongo",   label: "MongoDB",       sublabel: "aggregation",    category: "data",     x: 64, y: 82, icon: <Database size={16} /> },
  { id: "queue",   label: "BullMQ",        sublabel: "job queue",      category: "queue",    x: 64, y: 50, icon: <Layers3 size={16} /> },
  { id: "whisper", label: "Whisper",       sublabel: "transcription",  category: "ai",       x: 86, y: 30, icon: <Mic size={16} /> },
  { id: "gpt",     label: "GPT Realtime",  sublabel: "audio analysis", category: "ai",       x: 86, y: 66, icon: <Brain size={16} /> },
  { id: "socket",  label: "Socket.IO",     sublabel: "pub/sub",        category: "realtime", x: 44, y: 14, icon: <Radio size={16} /> },
];

const EDGES: [NodeId, NodeId][] = [
  ["client", "gateway"],
  ["gateway", "server"],
  ["server", "mongo"],
  ["server", "queue"],
  ["queue", "whisper"],
  ["queue", "gpt"],
  ["whisper", "server"],
  ["gpt", "server"],
  ["server", "socket"],
  ["socket", "client"],
];

interface Hop {
  from: NodeId;
  to: NodeId;
  ms: number;
  log: string;
  why?: string;
}
type Frame = Hop[];

interface Scenario {
  id: string;
  label: string;
  description: string;
  frames: Frame[];
  takeaway: (s: Scenario) => string;
}

function parallelSavingsMs(scenario: Scenario) {
  let saved = 0;
  for (const frame of scenario.frames) {
    if (frame.length > 1) {
      const sum = frame.reduce((a, h) => a + h.ms, 0);
      const max = Math.max(...frame.map((h) => h.ms));
      saved += sum - max;
    }
  }
  return saved;
}

const SCENARIOS: Scenario[] = [
  {
    id: "fetch",
    label: "Fetch Skills",
    description: "A simple cached read — the fast, everyday path.",
    frames: [
      [{ from: "client", to: "gateway", ms: 260, log: "→ GET /api/skills", why: "Every request first hits a load balancer — it decides which of several running servers should handle it." }],
      [{ from: "gateway", to: "server", ms: 200, log: "Load balancer routes to a healthy instance", why: "Spreading traffic across instances means no single server ever gets overwhelmed." }],
      [{ from: "server", to: "mongo", ms: 320, log: "Compound index lookup", why: "A compound index lets MongoDB jump straight to matching documents instead of scanning the whole collection." }],
      [{ from: "mongo", to: "server", ms: 200, log: "12 skills returned" }],
      [{ from: "server", to: "client", ms: 220, log: "← 200 OK", why: "Round trip complete — this indexed, cache-friendly path is why simple reads stay fast." }],
    ],
    takeaway: () => "A compound index turns a full collection scan into a direct lookup — the same principle behind cutting JobJen's slowest queries from ~8s to under 1s.",
  },
  {
    id: "score",
    label: "Score an Interview Answer",
    description: "The real dual-pipeline architecture behind JobJen's AI scoring.",
    frames: [
      [{ from: "client", to: "gateway", ms: 240, log: "→ POST /api/interview/score", why: "The client submits a recording for scoring — a heavier, slower job than a simple read." }],
      [{ from: "gateway", to: "server", ms: 200, log: "Load balancer routes to api-2" }],
      [{ from: "server", to: "queue", ms: 260, log: "Job enqueued on BullMQ", why: "Instead of making the visitor wait, the server hands this off to a queue and responds immediately — this is what keeps APIs feeling instant." }],
      [
        { from: "queue", to: "whisper", ms: 900, log: "Whisper: scoring substance & coherence", why: "Two different AI models run at the same time on the same recording — transcription and vocal-tone analysis don't depend on each other, so there's no reason to run them one after another." },
        { from: "queue", to: "gpt", ms: 700, log: "GPT Realtime: analyzing vocal delivery" },
      ],
      [
        { from: "whisper", to: "server", ms: 260, log: "Transcription score returned", why: "Both signals come back and get combined into one calibrated score — neither model alone tells the whole story." },
        { from: "gpt", to: "server", ms: 260, log: "Delivery score returned" },
      ],
      [{ from: "server", to: "mongo", ms: 260, log: "Calibrated score saved" }],
      [{ from: "server", to: "socket", ms: 200, log: "Emitting score:ready", why: "Rather than making the client poll for a result, the server pushes the update the instant it's ready." }],
      [{ from: "socket", to: "client", ms: 240, log: "← Real-time update delivered", why: "Pub/Sub fans this out to whichever server the client is actually connected to — that's what makes it work across multiple instances." }],
    ],
    takeaway: (s) => `Running Whisper and GPT Realtime in parallel saved ~${parallelSavingsMs(s)}ms versus running them one after another — the real idea behind JobJen's dual scoring pipeline.`,
  },
  {
    id: "push",
    label: "Live Update via Socket.IO",
    description: "One server instance pushes to a client through Pub/Sub — horizontal scaling in action.",
    frames: [
      [{ from: "server", to: "socket", ms: 280, log: "api-1 publishes event", why: "One instance has news to share — a new score, a notification, anything real-time." }],
      [{ from: "socket", to: "client", ms: 320, log: "Pub/Sub relays to the connected client", why: "Redis Pub/Sub relays the message to every instance so it reaches the client no matter which server it's connected to — this is how Socket.IO scales horizontally." }],
    ],
    takeaway: () => "One publish, every instance notified — this is what lets a real-time deployment scale past a single server.",
  },
];

interface Pulse {
  id: string;
  from: NodeId;
  to: NodeId;
  ms: number;
}

interface LogEntry {
  id: string;
  text: string;
  t: number;
}

function nodeById(id: NodeId) {
  return NODES.find((n) => n.id === id)!;
}

function PulseTrail({ from, to, ms }: { from: NodeDef; to: NodeDef; ms: number }) {
  const tail = [
    { delay: 0, size: 10, opacity: 1 },
    { delay: 0.06, size: 8, opacity: 0.5 },
    { delay: 0.12, size: 6, opacity: 0.25 },
  ];
  return (
    <>
      {tail.map((t, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: t.size,
            height: t.size,
            background: "var(--accent-1, #38bdf8)",
            boxShadow: i === 0 ? "0 0 10px var(--accent-1, #38bdf8)" : undefined,
            opacity: t.opacity,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ left: `${from.x}%`, top: `${from.y}%` }}
          animate={{ left: `${to.x}%`, top: `${to.y}%` }}
          transition={{ duration: ms / 1000, ease: "linear", delay: t.delay }}
        />
      ))}
    </>
  );
}

const RequestFlowPlayground = () => {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [visited, setVisited] = useState<Set<NodeId>>(new Set(["client"]));
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [why, setWhy] = useState<string | null>(null);
  const [takeaway, setTakeaway] = useState<string | null>(null);
  const tokenRef = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  useEffect(() => () => { tokenRef.current++; }, []);

  const activeEdges = new Set(pulses.map((p) => `${p.from}-${p.to}`));

  const play = async (scenario: Scenario) => {
    const token = ++tokenRef.current;
    setPlayingId(scenario.id);
    setLogs([]);
    setVisited(new Set(["client"]));
    setPulses([]);
    setElapsed(0);
    setWhy(null);
    setTakeaway(null);

    const start = performance.now();
    const tick = window.setInterval(() => {
      if (tokenRef.current !== token) return;
      setElapsed(performance.now() - start);
    }, 40);

    for (const frame of scenario.frames) {
      if (tokenRef.current !== token) {
        clearInterval(tick);
        return;
      }
      const frameId = Math.random().toString(36).slice(2);
      setPulses(frame.map((hop, i) => ({ id: `${frameId}-${i}`, from: hop.from, to: hop.to, ms: hop.ms })));
      setLogs((prev) => [
        ...prev,
        ...frame.map((hop) => ({ id: `${frameId}-${hop.to}`, text: hop.log, t: performance.now() - start })),
      ]);
      const stepWhy = frame.find((h) => h.why)?.why;
      if (stepWhy) setWhy(stepWhy);

      const maxMs = Math.max(...frame.map((h) => h.ms));
      await new Promise((r) => setTimeout(r, maxMs));

      if (tokenRef.current !== token) {
        clearInterval(tick);
        return;
      }
      setVisited((prev) => new Set([...prev, ...frame.map((h) => h.to)]));
    }

    clearInterval(tick);
    if (tokenRef.current === token) {
      setPulses([]);
      setPlayingId(null);
      setWhy(null);
      setTakeaway(scenario.takeaway(scenario));
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900"
      style={{ color: "var(--text-base)" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800 border-b border-neutral-700">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-neutral-500 font-mono">
          request-flow — {playingId ? `t+${Math.round(elapsed)}ms` : "idle"}
        </span>
      </div>

      {/* Scenario picker */}
      <div className="flex flex-wrap gap-2 p-3 border-b border-neutral-800">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => play(s)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-150 cursor-pointer ${
              playingId === s.id
                ? "bg-[var(--accent-1,#38bdf8)]/15 text-[var(--accent-1,#38bdf8)] border-[var(--accent-1,#38bdf8)]/40"
                : "border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-[var(--text-base)]"
            }`}
          >
            <Play size={11} />
            {s.label}
          </button>
        ))}
      </div>
      <p className="px-3 pt-2 text-xs text-neutral-500">
        {SCENARIOS.find((s) => s.id === playingId)?.description ?? "Pick a scenario to see how the request actually travels — and why it's built that way."}
      </p>

      {/* Category legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 px-3 pt-2 pb-1">
        {(Object.entries(CATEGORY_META) as [Category, typeof CATEGORY_META[Category]][]).map(([id, meta]) => (
          <span key={id} className="flex items-center gap-1 text-[0.6rem] text-neutral-500">
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        ))}
      </div>

      {/* Diagram */}
      <div
        className="relative w-full h-[320px] sm:h-[360px] m-3 mt-2 rounded-lg"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-neutral-700) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "center",
        }}
      >
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {EDGES.map(([a, b]) => {
            const A = nodeById(a);
            const B = nodeById(b);
            const isActive = activeEdges.has(`${a}-${b}`) || activeEdges.has(`${b}-${a}`);
            return (
              <line
                key={`${a}-${b}`}
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={isActive ? 1.6 : 1}
                className={`transition-all duration-150 ${isActive ? "edge-flow" : ""}`}
                stroke={isActive ? "var(--accent-1, #38bdf8)" : "var(--color-neutral-800)"}
                strokeOpacity={isActive ? 0.9 : 1}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((n) => {
          const isTarget = pulses.some((p) => p.to === n.id);
          const isVisited = visited.has(n.id);
          const style = CATEGORY_STYLES[n.category];
          return (
            <div
              key={n.id}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                animate={isTarget ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-shadow duration-300 ${style.bg} ${style.text} ${
                  isTarget ? `border-2 ${style.border} ${style.glow}` : isVisited ? `border-2 ${style.border}` : `border ${style.border}`
                }`}
              >
                {n.icon}
              </motion.div>
              <div className="text-center leading-tight whitespace-nowrap">
                <p className="text-[0.65rem] font-semibold" style={{ color: "var(--text-base)" }}>{n.label}</p>
                <p className="text-[0.55rem] text-neutral-600">{n.sublabel}</p>
              </div>
            </div>
          );
        })}

        {/* Pulses with comet trail */}
        {pulses.map((p) => (
          <PulseTrail key={p.id} from={nodeById(p.from)} to={nodeById(p.to)} ms={p.ms} />
        ))}
      </div>

      {/* Why panel */}
      <div className="mx-3 mb-3 rounded-lg border border-[var(--accent-1,#38bdf8)]/25 bg-[var(--accent-1,#38bdf8)]/5 px-3 py-2 flex items-start gap-2 min-h-[3.25rem]">
        <Lightbulb size={15} className="text-[var(--accent-1,#38bdf8)] flex-shrink-0 mt-0.5" />
        <motion.p
          key={why ?? takeaway ?? "idle"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-xs leading-5 text-neutral-400"
        >
          {why ?? takeaway ?? "Pick a scenario above — each step explains why the architecture is built that way, and you'll get a takeaway at the end."}
        </motion.p>
      </div>

      {/* Log */}
      <div
        ref={logRef}
        className="border-t border-neutral-800 px-4 py-3 h-32 overflow-y-auto font-mono text-xs space-y-1 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
      >
        {logs.length === 0 ? (
          <p className="text-neutral-600">Trace log will appear here once you run a scenario.</p>
        ) : (
          logs.map((l) => (
            <motion.p
              key={l.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-neutral-400"
            >
              <span className="text-neutral-600">t+{Math.round(l.t)}ms</span> {l.text}
            </motion.p>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestFlowPlayground;
