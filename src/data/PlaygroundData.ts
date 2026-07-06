import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiRedux,
  SiExpress, SiMongodb, SiPostgresql, SiRedis, SiSupabase,
  SiFirebase, SiPrisma, SiDrizzle, SiSocketdotio,
  SiDocker, SiGithub, SiPosthog, SiVercel, SiPostman, SiOpenai, SiJest,
  SiFigma,
} from "react-icons/si";
import { FaNodeJs, FaAws } from "react-icons/fa";
import { GiBull } from "react-icons/gi";
import { VscVscode } from "react-icons/vsc";
import { type IconType } from "react-icons";
import { Brain, Mic, KeyRound } from "lucide-react";

export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export const PROFICIENCY_LABEL: Record<ProficiencyLevel, string> = {
  5: "Expert",
  4: "Advanced",
  3: "Proficient",
  2: "Familiar",
  1: "Learning",
};

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "AI / LLM"
  | "DevOps"
  | "Tools";

export interface Skill {
  name: string;
  icon: IconType;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  description: string;
}

export const ALL_SKILLS: Skill[] = [
  // ── Frontend ──
  { name: "React",        icon: SiReact,      category: "Frontend",  proficiency: 5, description: "Primary UI library. Built SPAs, dashboards, and real-time apps with complex state." },
  { name: "Next.js",      icon: SiNextdotjs,  category: "Frontend",  proficiency: 4, description: "Full-stack React framework. Used for SSR, routing, and API routes." },
  { name: "TypeScript",   icon: SiTypescript, category: "Frontend",  proficiency: 5, description: "Default language across all production projects — strict typing, generics, and ORMs." },
  { name: "Redux Toolkit",icon: SiRedux,      category: "Frontend",  proficiency: 3, description: "Predictable state management for complex client-side data flows." },
  { name: "Tailwind CSS", icon: SiTailwindcss,category: "Frontend",  proficiency: 5, description: "Utility-first styling in every project. Deep familiarity with v3 and v4." },

  // ── Backend ──
  { name: "Node.js",      icon: FaNodeJs,     category: "Backend",   proficiency: 5, description: "Core runtime. Built scalable REST APIs and real-time event-driven services." },
  { name: "Express.js",   icon: SiExpress,    category: "Backend",   proficiency: 5, description: "Primary API framework. Modular routing, middleware, and auth flows." },
  { name: "Socket.IO",    icon: SiSocketdotio,category: "Backend",   proficiency: 4, description: "Real-time Pub/Sub across multiple server instances in production at Ragzon." },
  { name: "BullMQ",       icon: GiBull,       category: "Backend",   proficiency: 4, description: "Async job queues and batch processing powered by Redis in production." },
  { name: "Prisma",       icon: SiPrisma,     category: "Backend",   proficiency: 3, description: "Type-safe ORM for PostgreSQL, schema-first, migrations, and relation queries." },
  { name: "Drizzle",      icon: SiDrizzle,    category: "Backend",   proficiency: 3, description: "Lightweight, type-safe SQL ORM used as a Prisma alternative on newer projects." },

  // ── Database ──
  { name: "MongoDB",      icon: SiMongodb,    category: "Database",  proficiency: 5, description: "Advanced aggregation pipelines and compound indexing. Cut API times from 8s → 1s." },
  { name: "PostgreSQL",   icon: SiPostgresql, category: "Database",  proficiency: 3, description: "Relational DB for structured data. Used with Prisma and Drizzle ORMs." },
  { name: "Redis",        icon: SiRedis,      category: "Database",  proficiency: 4, description: "Caching layer, Pub/Sub broker, and BullMQ backend in distributed systems." },
  { name: "Supabase",     icon: SiSupabase,   category: "Database",  proficiency: 3, description: "Postgres-backed BaaS with realtime, auth, and edge functions." },
  { name: "Firebase",     icon: SiFirebase,   category: "Database",  proficiency: 3, description: "Realtime database, auth, and Cloud Functions for rapid prototyping." },

  // ── AI / LLM ──
  { name: "OpenAI / GPT", icon: SiOpenai,             category: "AI / LLM", proficiency: 4, description: "LLM integration, GPT Realtime audio analysis of vocal delivery, prompt engineering." },
  { name: "Whisper",      icon: Mic as unknown as IconType, category: "AI / LLM", proficiency: 4, description: "Speech-to-text transcription for scoring substance and coherence in interviews." },
  { name: "Claude / MCP", icon: Brain as unknown as IconType, category: "AI / LLM", proficiency: 4, description: "Agentic workflows, MCP servers, RAG pipelines, and evaluation engineering." },
  { name: "PostHog",      icon: SiPosthog,            category: "AI / LLM", proficiency: 4, description: "Product analytics instrumentation to validate features and guide product roadmap." },

  // ── DevOps ──
  { name: "Docker",       icon: SiDocker,     category: "DevOps",    proficiency: 4, description: "Containerised full-stack apps with multi-service docker-compose setups." },
  { name: "Vercel",       icon: SiVercel,     category: "DevOps",    proficiency: 4, description: "Primary deployment target for frontend and serverless Next.js apps." },
  { name: "AWS",          icon: FaAws,        category: "DevOps",    proficiency: 3, description: "EC2, S3, and basic IAM for cloud infrastructure." },
  { name: "Git / GitHub", icon: SiGithub,     category: "DevOps",    proficiency: 5, description: "Daily driver. PR-based workflows, CI/CD pipelines, and branch strategies." },
  { name: "Jest / Vitest",icon: SiJest,       category: "DevOps",    proficiency: 3, description: "Unit and integration tests for backend services and utility functions." },
  { name: "OAuth 2.0 / JWT", icon: KeyRound as unknown as IconType, category: "DevOps", proficiency: 4, description: "Secure REST API authentication and authorization built and shipped in production." },

  // ── Tools ──
  { name: "VS Code",      icon: VscVscode,    category: "Tools",     proficiency: 5, description: "Primary editor. Deep extension ecosystem, custom snippets, and debugging." },
  { name: "Postman",      icon: SiPostman,    category: "Tools",     proficiency: 4, description: "API testing, collection management, and environment-based testing." },
  { name: "Figma",        icon: SiFigma,      category: "Tools",     proficiency: 3, description: "Collaborative design and prototyping for UI flows and wireframes." },
];

export const CATEGORIES: ("All" | SkillCategory)[] = [
  "All", "Frontend", "Backend", "Database", "AI / LLM", "DevOps", "Tools",
];
