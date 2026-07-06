import { Brain, Code, GraduationCap, HeartHandshake } from "lucide-react";

export const aboutMe: string =
  "Full-stack software engineer with 2.7 years building production MERN applications, with a deep focus on AI/LLM integration and an AI-first workflow that leans on tools like Claude Code and Cursor to ship faster. Core engineer on JobJen, a platform that grew from 50 to 7,000+ users, where I own AI interview quality through a human-in-the-loop calibration system and parallel scoring pipelines. Strong in system design, real-time event-driven backends, and shipping production-ready features autonomously in remote, distributed teams.";

export const myCards = [
  {
    title: "Background",
    brief:
      "2.7 years building production MERN apps. CS graduate from University of Central Punjab (2021 to 2025). Certified Web Developer, Johns Hopkins (Coursera).",
    Icon: GraduationCap,
  },
  {
    title: "Specialization",
    brief:
      "AI/LLM integration, agentic workflows, real-time event-driven backends, system design, and shipping at scale with an AI-first workflow.",
    Icon: Brain,
  },
  {
    title: "Tech Stack",
    brief:
      "MERN, TypeScript, Next.js, Redis, BullMQ, Socket.IO, PostgreSQL, Docker, OpenAI, Whisper, PostHog.",
    Icon: Code,
  },
  {
    title: "Outside Work",
    brief: "Gym, reading, startups, financial literacy, anime, tech experiments.",
    Icon: HeartHandshake,
  },
];
