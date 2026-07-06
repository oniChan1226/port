import { Check, CodeXml, Copy, LayoutDashboard, Newspaper, Package, Rocket, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { myWorkEmail } from "../constants/constants.ts";
import ProjectCard from "../components/ProjectCard.tsx";
import CardContainer from "../components/CardContainer.tsx";
import Tooltip from "../components/Tooltip.tsx";
import { myProjects } from "../data/ProjectsData.tsx";
import QuickAction from "../components/QuickAction.tsx";
import JoinReader from "../components/JoinReader.tsx";
import { useQuery } from "@tanstack/react-query";
import type { ArticleList } from "../interfaces/Article.ts";
import { fetchBlogs } from "../api/fetchBlogs.ts";
import { motion, useInView } from "motion/react";
import { LayoutTextFlip } from "../components/ui/layout-text-flip";

const ROLES = [
  "Full-Stack Engineer",
  "AI/LLM Integrator",
  "React Engineer",
  "Backend Architect",
  "Systems Optimizer",
];

const STATS = [
  {
    icon: Users,
    value: 7,
    suffix: "K+",
    label: "Users Scaled",
    detail: "From 50 → 7,000+ on JobJen",
  },
  {
    icon: Zap,
    value: 8,
    suffix: "x",
    label: "Faster APIs",
    detail: "8s response cut to <1s",
  },
  {
    icon: Rocket,
    value: 1.5,
    decimals: 1,
    suffix: "+",
    label: "Yrs Experience",
    detail: "Production MERN & AI systems",
  },
  {
    icon: Package,
    value: 2,
    suffix: "",
    label: "Solo Products",
    detail: "Forge (Live) + AI Resume Matcher",
  },
];

function useCountUp(target: number, duration = 1200, start = false, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const factor = 10 ** decimals;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.round(progress * target * factor) / factor);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start, decimals]);
  return count;
}

function StatCard({
  icon: Icon,
  value,
  decimals = 0,
  suffix,
  label,
  detail,
}: {
  icon: LucideIcon;
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  detail: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, 1100, inView, decimals);
  return (
    <div
      ref={ref}
      className="group flex flex-col gap-2.5 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 hover:border-neutral-700 hover:bg-neutral-900 transition-colors duration-300"
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--accent-1,#38bdf8)]/10 text-[var(--accent-1,#38bdf8)]">
        <Icon size={16} />
      </div>
      <span className="text-2xl lg:text-3xl font-bold" style={{ color: "var(--text-base)" }}>
        {count.toFixed(decimals)}{suffix}
      </span>
      <div className="leading-tight">
        <p className="text-xs font-semibold" style={{ color: "var(--text-base)" }}>{label}</p>
        <p className="text-[0.7rem] text-neutral-500 mt-0.5">{detail}</p>
      </div>
    </div>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const Home = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const { data, isLoading } = useQuery<ArticleList>({
    queryKey: ["devBlog"],
    queryFn: fetchBlogs,
    select: (data) => data.slice(0, 2),
  });

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(myWorkEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10">

      {/* ── Hero ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <h2 className="text-4xl lg:text-5xl font-semibold leading-8 lg:leading-16 tracking-wide text-shadow-lg/10">
            Hey, I'm Fahad,
          </h2>
          <h2 className="flex flex-wrap items-center gap-3 text-4xl lg:text-5xl leading-14 tracking-wide text-shadow-lg/10">
            <LayoutTextFlip
              text="A"
              words={ROLES}
              className="font-semibold tracking-wide"
              wordClassName="gradient-text"
            />
          </h2>
          <motion.div variants={fadeUp} className="my-4 text-neutral-400/70 text-md leading-5">
            <h6>Shipping AI-integrated products end-to-end — from real-time backends to sub-second APIs.</h6>
            <h6>Rare combo. I know.</h6>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-3 font-semibold text-sm">
          <Tooltip content="More about me" position="top" alignments="mb-3">
            <Link
              to={"/about"}
              className="rounded bg-neutral-800 px-5 py-2 border border-neutral-700 hover:bg-neutral-800/70 hover:opacity-80 duration-300"
            >
              About
            </Link>
          </Tooltip>
          <Tooltip content={copied ? "Copied!" : "Copy"} position="top" alignments="mb-1">
            <button
              className="flex items-center gap-2 cursor-pointer bg-neutral-800/50 px-5 py-2 rounded border border-neutral-800 hover:opacity-70 duration-300"
              onClick={copyEmailToClipboard}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              Email
            </button>
          </Tooltip>
        </motion.div>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUp}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── New Drops ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.h4 variants={fadeUp} className="text-lg font-semibold mb-3">
          New Drops
        </motion.h4>
        <CardContainer>
          {myProjects.slice(0, 2).map((project, i) => (
            <motion.div key={project.title + i} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </CardContainer>
      </motion.div>

      {/* ── Articles ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="border border-neutral-800 rounded-md"
      >
        <div className="w-[90%] mx-auto my-6">
          <div>
            <h2 className="text-lg font-semibold">Articles</h2>
            <p className="text-neutral-500">
              Explore concise articles sharing insights, tutorials, and ideas from my development journey.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-2 py-2 mt-2">
            {isLoading || !data ? (
              <div className="w-full space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="h-14 w-full bg-neutral-800 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              data?.map((article) => (
                <Link
                  to={`articles/${article?.id}`}
                  key={article.id}
                  className="w-full flex gap-3 items-center cursor-pointer border border-transparent hover:border hover:border-neutral-800 hover:bg-primary py-1 lg:py-3 duration-300 rounded-lg pl-2"
                >
                  <div className="bg-neutral-800 p-2 lg:p-4 rounded">
                    <Newspaper size={20} />
                  </div>
                  <div>
                    <h2 className="line-clamp-1 text-sm lg:text-md font-semibold">{article.title}</h2>
                    <p className="line-clamp-1 text-xs lg:text-sm text-neutral-500">{article.description}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
        <JoinReader />
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="grid lg:grid-cols-2 items-center gap-8"
      >
        <QuickAction
          Icon={LayoutDashboard}
          title="Feed"
          brief="Dive into my quick thoughts"
          actionText="View Feed"
          to="/feed"
          backgroundStyle="s"
        />
        <QuickAction
          Icon={CodeXml}
          title="Projects"
          brief="Explore my latest full-stack builds and experiments"
          actionText="Browse Projects"
          to="/projects"
          backgroundStyle="m"
        />
      </motion.div>
    </div>
  );
};

export default Home;
