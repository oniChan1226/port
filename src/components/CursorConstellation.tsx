import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface Streak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
}

const MAX_STARS = 260;
const LINK_DIST = 90;
const WISH_WINDOW_MS = 1500;
const WISH_CLICK_COUNT = 5;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const CursorConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const streaksRef = useRef<Streak[]>([]);
  const lastSpawnRef = useRef({ x: 0, y: 0, t: 0 });
  const clickTimesRef = useRef<number[]>([]);
  const [wish, setWish] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawnStar = (x: number, y: number, extra?: Partial<Star>) => {
      const stars = starsRef.current;
      if (stars.length >= MAX_STARS) stars.shift();
      stars.push({
        x,
        y,
        vx: rand(-0.15, 0.15),
        vy: rand(-0.25, -0.05),
        life: 1,
        maxLife: rand(1.6, 3.2),
        size: rand(1, 2.4),
        ...extra,
      });
    };

    const spawnBurst = (x: number, y: number) => {
      const n = 22;
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n + rand(-0.2, 0.2);
        const speed = rand(0.6, 1.8);
        spawnStar(x, y, {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          maxLife: rand(0.8, 1.6),
          size: rand(1.5, 3),
        });
      }
    };

    const spawnStreak = () => {
      streaksRef.current.push({
        x: rand(0, width * 0.6),
        y: rand(-20, height * 0.35),
        vx: Math.cos(rand(0.35, 0.85)) * rand(7, 11),
        vy: Math.sin(rand(0.35, 0.85)) * rand(7, 11),
        life: 1,
        maxLife: rand(0.6, 1),
        length: rand(70, 130),
      });
    };

    let idleTimer = 0;
    const scheduleIdleStreak = () => {
      idleTimer = window.setTimeout(() => {
        spawnStreak();
        scheduleIdleStreak();
      }, rand(4000, 9000));
    };
    scheduleIdleStreak();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const last = lastSpawnRef.current;
      const now = performance.now();
      if (Math.hypot(x - last.x, y - last.y) > 14 || now - last.t > 90) {
        spawnStar(x, y);
        lastSpawnRef.current = { x, y, t: now };
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnBurst(x, y);

      const now = performance.now();
      const recent = clickTimesRef.current.filter((t) => now - t < WISH_WINDOW_MS);
      recent.push(now);
      clickTimesRef.current = recent;

      if (recent.length >= WISH_CLICK_COUNT) {
        clickTimesRef.current = [];
        for (let i = 0; i < 8; i++) {
          window.setTimeout(spawnStreak, i * 90);
        }
        setWish(true);
        window.setTimeout(() => setWish(false), 2200);
      }
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);

    let lastT = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;

      ctx.clearRect(0, 0, width, height);

      const stars = starsRef.current;
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.life -= dt / s.maxLife;
        if (s.life <= 0) {
          stars.splice(i, 1);
          continue;
        }
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.99;
        s.vy *= 0.99;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * Math.min(a.life, b.life) * 0.5;
            ctx.strokeStyle = `rgba(180, 200, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.shadowColor = "rgba(140, 180, 255, 0.9)";
      ctx.shadowBlur = 6;
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(s.life, 0)})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      const streaks = streaksRef.current;
      for (let i = streaks.length - 1; i >= 0; i--) {
        const st = streaks[i];
        st.life -= dt / st.maxLife;
        if (st.life <= 0) {
          streaks.splice(i, 1);
          continue;
        }
        st.x += st.vx * (dt * 60);
        st.y += st.vy * (dt * 60);

        const dirLen = Math.hypot(st.vx, st.vy) || 1;
        const ux = st.vx / dirLen;
        const uy = st.vy / dirLen;
        const tailX = st.x - ux * st.length;
        const tailY = st.y - uy * st.length;

        const grad = ctx.createLinearGradient(st.x, st.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${st.life})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      ro.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div
      className="rounded-xl overflow-hidden border border-neutral-800 shadow-2xl"
      style={{ color: "var(--text-base)" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800 border-b border-neutral-700">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-neutral-500 font-mono">
          cursor-constellation — night sky, always dark
        </span>
      </div>

      {/* Stage — deliberately always a dark sky regardless of site theme */}
      <div
        className="relative w-full h-[420px] overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #10172b 0%, #05070f 65%, #020308 100%)",
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none cursor-crosshair" />

        {wish && (
          <div className="absolute inset-x-0 top-4 flex justify-center pointer-events-none">
            <span className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 rounded-full px-3 py-1 backdrop-blur-sm animate-pulse">
              ✨ wish granted
            </span>
          </div>
        )}
      </div>

      <p className="px-4 py-3 text-xs text-neutral-500 border-t border-neutral-800 bg-neutral-900">
        Move your cursor to trail stars, click to burst one apart. Some things reward patience — or persistence.
      </p>
    </div>
  );
};

export default CursorConstellation;
