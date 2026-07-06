import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiDrizzle,
  SiFigma,
  SiCanva,
  SiDocker,
  SiGit,
  SiGithub,
  SiPosthog,
  SiVercel,
  SiPostman,
  SiOpenai,
  SiJest,
} from "react-icons/si";

import { FaNodeJs, FaAws } from "react-icons/fa";
import { GiBull } from "react-icons/gi";
import { VscVscode } from "react-icons/vsc";
import { type IconType } from "react-icons";
import { Brain } from "lucide-react";

export interface TechItem {
  name: string;
  description: string;
  categories: string[];
  website: string;
  icon: IconType;
}

export const myFrontEndTechStack: TechItem[] = [
  {
    name: "React",
    description: "Library for building user interfaces",
    categories: ["UI", "Components", "JavaScript"],
    website: "https://react.dev/",
    icon: SiReact,
  },
  {
    name: "Next.js",
    description: "React framework for production-grade full-stack applications",
    categories: ["React", "SSR", "Full-Stack"],
    website: "https://nextjs.org/",
    icon: SiNextdotjs,
  },
  {
    name: "TypeScript",
    description: "Strongly typed programming language for JavaScript",
    categories: ["Language", "JavaScript"],
    website: "https://www.typescriptlang.org/",
    icon: SiTypescript,
  },
  {
    name: "Redux Toolkit",
    description: "Predictable state container for JavaScript apps",
    categories: ["State Management", "React"],
    website: "https://redux.js.org/",
    icon: SiRedux,
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    categories: ["CSS", "Styling"],
    website: "https://tailwindcss.com/",
    icon: SiTailwindcss,
  },
  {
    name: "shadcn/ui",
    description: "Re-usable components built with Radix UI and Tailwind",
    categories: ["Components", "UI", "Tailwind"],
    website: "https://ui.shadcn.com/",
    icon: SiShadcnui,
  },
];

export const myBackendTechStack: TechItem[] = [
  {
    name: "Node.js",
    description: "JavaScript runtime for building scalable backend services",
    categories: ["JavaScript", "Runtime", "Backend"],
    website: "https://nodejs.org/",
    icon: FaNodeJs,
  },
  {
    name: "Express.js",
    description: "Minimal and flexible Node.js web application framework",
    categories: ["Backend", "API", "Routing"],
    website: "https://expressjs.com/",
    icon: SiExpress,
  },
  {
    name: "MongoDB",
    description: "NoSQL document database with advanced aggregation pipelines",
    categories: ["Database", "NoSQL"],
    website: "https://www.mongodb.com/",
    icon: SiMongodb,
  },
  {
    name: "PostgreSQL",
    description: "Advanced open-source relational database",
    categories: ["Database", "SQL"],
    website: "https://www.postgresql.org/",
    icon: SiPostgresql,
  },
  {
    name: "Redis",
    description: "In-memory data store used as a database, cache and message broker",
    categories: ["Caching", "Database", "Pub/Sub"],
    website: "https://redis.io/",
    icon: SiRedis,
  },
  {
    name: "BullMQ",
    description: "Robust job and queue manager for Node.js with Redis backend",
    categories: ["Queues", "Jobs", "Async"],
    website: "https://docs.bullmq.io/",
    icon: GiBull,
  },
  {
    name: "Supabase",
    description: "Open-source Firebase alternative with PostgreSQL at its core",
    categories: ["Database", "Auth", "Realtime"],
    website: "https://supabase.com/",
    icon: SiSupabase,
  },
  {
    name: "Firebase",
    description: "Google's platform for app development with realtime database & auth",
    categories: ["Database", "Auth", "Realtime"],
    website: "https://firebase.google.com/",
    icon: SiFirebase,
  },
  {
    name: "Prisma",
    description: "Next-generation ORM for Node.js and TypeScript",
    categories: ["ORM", "TypeScript", "SQL"],
    website: "https://www.prisma.io/",
    icon: SiPrisma,
  },
  {
    name: "Drizzle",
    description: "Lightweight, type-safe SQL ORM for TypeScript",
    categories: ["ORM", "TypeScript", "SQL"],
    website: "https://orm.drizzle.team/",
    icon: SiDrizzle,
  },
];

export const myAIStack: TechItem[] = [
  {
    name: "OpenAI",
    description: "GPT models, Whisper transcription, and GPT Realtime audio API",
    categories: ["LLM", "Audio", "AI"],
    website: "https://openai.com/",
    icon: SiOpenai,
  },
  {
    name: "Claude / Anthropic",
    description: "LLM for agentic workflows, prompt engineering, and evaluation",
    categories: ["LLM", "AI", "Agents"],
    website: "https://anthropic.com/",
    icon: Brain as unknown as IconType,
  },
  {
    name: "PostHog",
    description: "Product analytics for validating features and tracking user behavior",
    categories: ["Analytics", "Product Metrics"],
    website: "https://posthog.com/",
    icon: SiPosthog,
  },
];

export const myDesignTools: TechItem[] = [
  {
    name: "Figma",
    description: "Collaborative interface design tool",
    categories: ["UI", "Design", "Prototyping"],
    website: "https://figma.com/",
    icon: SiFigma,
  },
  {
    name: "Canva",
    description: "User-friendly tool for graphics and social media content",
    categories: ["Graphics", "Design", "Marketing"],
    website: "https://canva.com/",
    icon: SiCanva,
  },
];

export const myDevOpsAndCloudTools: TechItem[] = [
  {
    name: "Docker",
    description: "Platform to build, share, and run applications using containers",
    categories: ["DevOps", "Containers"],
    website: "https://www.docker.com/",
    icon: SiDocker,
  },
  {
    name: "Vercel",
    description: "Frontend cloud platform for deployment and edge functions",
    categories: ["Hosting", "Deployment"],
    website: "https://vercel.com/",
    icon: SiVercel,
  },
  {
    name: "AWS",
    description: "Comprehensive cloud computing platform",
    categories: ["Cloud", "Infrastructure"],
    website: "https://aws.amazon.com/",
    icon: FaAws,
  },
];

export const myDevTools: TechItem[] = [
  {
    name: "Git",
    description: "Version control system for tracking code changes",
    categories: ["Version Control", "Collaboration"],
    website: "https://git-scm.com/",
    icon: SiGit,
  },
  {
    name: "GitHub",
    description: "Code hosting platform for version control and collaboration",
    categories: ["Hosting", "CI/CD", "Version Control"],
    website: "https://github.com/",
    icon: SiGithub,
  },
  {
    name: "VS Code",
    description: "Code editor optimized for building and debugging web apps",
    categories: ["Editor", "Productivity"],
    website: "https://code.visualstudio.com/",
    icon: VscVscode,
  },
  {
    name: "Postman",
    description: "API testing and team collaboration platform",
    categories: ["API", "Testing"],
    website: "https://www.postman.com/",
    icon: SiPostman,
  },
  {
    name: "Jest / Vitest",
    description: "Unit and integration testing frameworks for JavaScript/TypeScript",
    categories: ["Testing", "CI/CD"],
    website: "https://vitest.dev/",
    icon: SiJest,
  },
];
