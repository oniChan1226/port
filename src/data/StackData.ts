import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  // SiNodeDotJs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiFigma,
  SiCanva,
  SiDocker,
  SiGit,
  SiGithub,
  SiPosthog,
  SiVercel,
  SiPostman
} from "react-icons/si";

import { FaNodeJs, FaAws } from "react-icons/fa";
import { GiBull } from "react-icons/gi";
import { GrGraphQl } from "react-icons/gr";
import { VscVscode } from "react-icons/vsc";
import { type IconType } from "react-icons";

export interface TechItem {
  name: string;
  description: string;
  categories: string[];
  website: string;
  icon: IconType;
}

export const myFrontEndTechStack: TechItem[] = [
  {
    name: "Next.js",
    description: "React framework for production-grade applications",
    categories: ["React", "SSR", "TypeScript"],
    website: "https://nextjs.org/",
    icon: SiNextdotjs,
  },
  {
    name: "React",
    description: "Library for building user interfaces",
    categories: ["UI", "Components", "JavaScript"],
    website: "https://react.dev/",
    icon: SiReact,
  },
  {
    name: "TypeScript",
    description: "Strongly typed programming language for JavaScript",
    categories: ["Language", "JavaScript"],
    website: "https://www.typescriptlang.org/",
    icon: SiTypescript,
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
    description: "NoSQL document database for high-volume data storage",
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
    name: "GraphQL",
    description: "Advanced open-source relational database",
    categories: ["Database", "SQL"],
    website: "https://www.postgresql.org/",
    icon: GrGraphQl,
  },
  {
    name: "Redis",
    description:
      "In-memory data store used as a database, cache and message broker",
    categories: ["Caching", "Database", "Pub/Sub"],
    website: "https://redis.io/",
    icon: SiRedis,
  },
  {
    name: "BullMQ",
    description: "Robust job and queue manager for Node.js with Redis backend",
    categories: ["Queues", "Jobs", "Redis"],
    website: "https://docs.bullmq.io/",
    icon: GiBull,
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
    description:
      "Platform to build, share, and run applications using containers",
    categories: ["DevOps", "Containers"],
    website: "https://www.docker.com/",
    icon: SiDocker,
  },
  {
    name: "Vercel",
    description:
      "Platform to build, share, and run applications using containers",
    categories: ["Hosting", "Deployment"],
    website: "https://vercel.com/",
    icon: SiVercel,
  },
  {
    name: "AWS",
    description: "Comprehensive cloud computing paltform",
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
    description: "API testing and team collaboration",
    categories: ["API", "Collaboration"],
    website: "https://www.postman.com/",
    icon: SiPostman,
  },
  {
    name: "PostHog",
    description: "Code editor optimized for building and debugging web apps",
    categories: ["Analytics", "Product Metrices"],
    website: "https://posthog.com/",
    icon: SiPosthog,
  },
];
