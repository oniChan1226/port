import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Brain, Database, Layers3, Mic, Play, Radio, Route, Server, Smartphone } from "lucide-react";

type NodeId = "client" | "gateway" | "server" | "mongo" | "queue" | "whisper" | "gpt" | "socket";

interface NodeDef {
  id: NodeId;
  label: string;
  sublabel: string;
  x: number; // 0–100, percent of container
  y: number; // 0–100, percent of container
  icon: React.ReactNode;
}

const NODES: NodeDef[] = [
  { id: "client",  label: "Browser",       sublabel: "You",              x: 6,  y: 50, icon: <Smartphone size={16} /> },
  { id: "gateway", label: "Load Balancer", sublabel: "routes traffic",   x: 24, y: 50, icon: <Route size={16} /> },
  { id: "server",  label: "API Server",    sublabel: "Node · Express",   x: 44, y: 50, icon: <Server size={16} /> },
  { id: "mongo",   label: "MongoDB",       sublabel: "aggregation",      x: 64, y: 82, icon: <Database size={16} /> },
  { id: "queue",   label: "BullMQ",        sublabel: "job queue",        x: 64, y: 50, icon: <Layers3 size={16} /> },
  { id: "whisper", label: "Whisper",       sublabel: "transcription",    x: 86, y: 30, icon: <Mic size={16} /> },
  { id: "gpt",     label: "GPT Realtime",  sublabel: "audio analysis",   x: 86, y: 66, icon: <Brain size={16} /> },
  { id: "socket",  label: "Socket.IO",     sublabel: "pub/sub",          x: 44, y: 14, icon: <Radio size={16} /> },
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
}
type Frame = Hop[];

interface Scenario {
  id: string;
  label: string;
  description: string;
  frames: Frame[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "fetch",
    label: "Fetch Skills",
    description: "A simple cached read — the fast, everyday path.",
    frames: [
      [{ from: "client", to: "gateway", ms: 260, log: "→ GET /api/skills" }],
      [{ from: "gateway", to: "server", ms: 200, log: "Load balancer routes to a healthy instance" }],
      [{ from: "server", to: "mongo", ms: 320, log: "Compound index lookup" }],
      [{ from: "mongo", to: "server", ms: 200, log: "12 skills returned" }],
      [{ from: "server", to: "client", ms: 220, log: "← 200 OK" }],
    ],
  },
  {
    id: "score",
    label: "Score an Interview Answer",
    description: "The real dual-pipeline architecture behind JobJen's AI scoring.",
    frames: [
      [{ from: "client", to: "gateway", ms: 240, log: "→ POST /api/interview/score" }],
      [{ from: "gateway", to: "server", ms: 200, log: "Load balancer routes to api-2" }],
      [{ from: "server", to: "queue", ms: 260, log: "Job enqueued on BullMQ" }],
      [
        { from: "queue", to: "whisper", ms: 900, log: "Whisper: scoring substance & coherence" },
        { from: "queue", to: "gpt", ms: 700, log: "GPT Realtime: analyzing vocal delivery" },
      ],
      [
        { from: "whisper", to: "server", ms: 260, log: "Transcription score returned" },
        { from: "gpt", to: "server", ms: 260, log: "Delivery score returned" },
      ],
      [{ from: "server", to: "mongo", ms: 260, log: "Calibrated score saved" }],
      [{ from: "server", to: "socket", ms: 200, log: "Emitting score:ready" }],
      [{ from: "socket", to: "client", ms: 240, log: "← Real-time update delivered" }],
    ],
  },
  {
    id: "push",
    label: "Live Update via Socket.IO",
    description: "One server instance pushes to a client through Pub/Sub — horizontal scaling in action.",
    frames: [
      [{ from: "server", to: "socket", ms: 280, log: "api-1 publishes event" }],
      [{ from: "socket", to: "client", ms: 320, log: "Pub/Sub relays to the connected client" }],
    ],
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

const RequestFlowPlayground = () => {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [visited, setVisited] = useState<Set<NodeId>>(new Set(["client"]));
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
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
        {SCENARIOS.find((s) => s.id === playingId)?.description ?? "Pick a scenario to see how the request actually travels."}
      </p>

      {/* Diagram */}
      <div className="relative w-full h-[320px] sm:h-[360px] m-3 mt-2">
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
                strokeWidth={isActive ? 1.5 : 1}
                className="transition-all duration-150"
                stroke={isActive ? "var(--accent-1, #38bdf8)" : "var(--color-neutral-800)"}
                strokeOpacity={isActive ? 0.8 : 1}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((n) => {
          const isTarget = pulses.some((p) => p.to === n.id);
          const isVisited = visited.has(n.id);
          return (
            <div
              key={n.id}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                animate={isTarget ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-300 ${
                  isTarget
                    ? "bg-[var(--accent-1,#38bdf8)]/20 border-[var(--accent-1,#38bdf8)] text-[var(--accent-1,#38bdf8)] shadow-[0_0_16px_var(--accent-1,#38bdf8)]"
                    : isVisited
                      ? "bg-[var(--accent-1,#38bdf8)]/8 border-[var(--accent-1,#38bdf8)]/30 text-[var(--accent-1,#38bdf8)]/80"
                      : "bg-neutral-900 border-neutral-700 text-neutral-500"
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

        {/* Pulses */}
        {pulses.map((p) => {
          const from = nodeById(p.from);
          const to = nodeById(p.to);
          return (
            <motion.div
              key={p.id}
              className="absolute w-2.5 h-2.5 rounded-full pointer-events-none"
              style={{
                background: "var(--accent-1, #38bdf8)",
                boxShadow: "0 0 8px var(--accent-1, #38bdf8)",
                transform: "translate(-50%, -50%)",
              }}
              initial={{ left: `${from.x}%`, top: `${from.y}%` }}
              animate={{ left: `${to.x}%`, top: `${to.y}%` }}
              transition={{ duration: p.ms / 1000, ease: "linear" }}
            />
          );
        })}
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
