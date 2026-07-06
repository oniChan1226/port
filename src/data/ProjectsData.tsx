export const forgeMarkdown = `
## Overview

**Forge** is a discipline workspace that unifies todos, habits, notes, and journaling on a single dashboard with an aggregated calendar view. Built and launched solo — ships **free and Pro tiers** with advanced analytics & insights, a recall system, and custom themes.

## Key Features

- **Unified Dashboard** — todos, habits, notes, and journal entries in one place
- **Aggregated Calendar View** — see all your activity in a single timeline
- **Pro Tier** — advanced analytics & insights, recall system, custom themes
- **PostHog Instrumentation** — user behavior tracked to validate features and guide the product roadmap

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB
- **Auth**: JWT / OAuth 2.0
- **Analytics**: PostHog
- **Deployment**: Vercel

## Product Thinking

Instrumented user behavior with PostHog to validate features and guide the roadmap toward what drove real engagement — building what users actually use, not just what sounds good.

> Live at [forgehub.me](https://forgehub.me)
`;

export const jobJenMarkdown = `
## Overview

**JobJen** (jobjen.com) is an AI technical-interview platform I helped build as a core engineer (team of 8) at Ragzon Solutions — it grew from 50 to 7,000+ users during my time on it, and I owned AI interview scoring and quality.

## Key Contributions

- **Human-in-the-Loop Calibration** — benchmarked AI interview scores against human raters and iteratively tuned prompts and scoring logic to align AI judgment with human evaluators
- **Dual Parallel Scoring Pipeline** — Whisper transcription scoring substance & coherence, run alongside GPT Realtime audio analysis of vocal delivery & flow, aggregated into one calibrated score
- **Performance** — identified high-frequency endpoints and optimized them with MongoDB aggregation pipelines and compound indexing, cutting key API response times from ~8s to under 1s
- **Real-Time Infrastructure** — event-driven services with Socket.IO Pub/Sub across multiple server instances, BullMQ for async/batch processing
- **Product Analytics** — PostHog instrumentation to validate features and prioritize high-impact quality improvements

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, WebSockets / Socket.IO, BullMQ
- **Database**: MongoDB (aggregation pipelines, compound indexing), Redis
- **AI**: Whisper, OpenAI GPT Realtime (audio)
- **Analytics**: PostHog

> Live at [jobjen.com](https://jobjen.com)
`;

export const aiResumeMatcherMarkdown = `
## Overview

**AI Resume Matcher** is an AI tool that scores a resume against a job description, returns a match percentage, recommends targeted tweaks, and predicts likely interview questions from role and market data.

## Features

- **Match Scoring** — AI-powered resume ↔ JD alignment score
- **Targeted Tweaks** — specific, actionable improvement suggestions
- **Interview Question Prediction** — predicts likely questions based on role and market data
- **LLM Integration** — powered by OpenAI / Claude for deep semantic analysis

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI**: OpenAI / Claude API, vector search for semantic matching
- **Database**: PostgreSQL + pgvector

> 🚧 Currently in development.
`;

export const skillNexusMarkdown = `
## Abstract

**Skill Nexus** is a community-driven web app designed to eliminate financial barriers in learning and professional growth. Rather than relying on money, users exchange **skills** through a fair and intelligent **barter system**. Think of it as a hybrid of *Fiverr* and *Coursera*, reimagined for collaboration instead of competition.

Key innovation: **KNN-based Skill Matching** – users are paired based on skill interests using a Machine Learning approach for precise recommendations.

## Architecture & Design Principles

The app follows a **modular client-server architecture**:

- **Frontend**: React + Tailwind (SPA with route-based lazy loading)
- **Backend**: Node.js + Express (REST APIs)
- **Database**: MongoDB Atlas (cloud-hosted)
- **ML Layer**: Python (planned microservice integration for KNN model)

## Key Features

- **Profile Setup** – Define skills you can teach and those you want to learn
- **Skill Barter Requests** – Request, accept, reject, or complete exchanges
- **ML-Based Matching** – Personalized suggestions using **KNN**
- **Ratings & Reviews** – Reputation building after each exchange
- **Analytics Dashboard** – Insights into your barter history and feedback

## Security

- **Auth**: JWT, bcrypt-hashed passwords
- **Access Control**: Role-based permissions
`;

export const alyonusMarkdown = `
## Abstract

**Alyonus** is a modern web application tailored for the medical industry. It empowers clinics and service providers to **streamline operations**, **highlight their services**, and improve **patient engagement**. Built using the **MERN stack**, Alyonus focuses on simplicity, performance, and modularity.

## My Contribution

As the lead developer, I implemented the full-stack system from the ground up:

- Built with **React.js** and **Tailwind CSS** for a fast, responsive interface
- Implemented secure **authentication** and **role-based access**
- Designed **MongoDB schemas** for managing clinics, services, and appointments
- Connected everything with **Express APIs**, ensuring clean separation of concerns

## Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
`;

export interface Project {
  _id: number;
  slug: string;
  title: string;
  description: string;
  tag: string;
  src: string;
  images?: string[];
  timestamps: string;
  markdown: string;
  demoLink: string;
  sourceLink: string;
  status?: "live" | "in-development";
}

export const myProjects: Project[] = [
  {
    _id: 0,
    slug: "forge",
    title: "Forge",
    description:
      "A discipline workspace unifying todos, habits, notes, and journaling on one dashboard — ships free and Pro tiers.",
    tag: "SaaS",
    src: "",
    images: [
      "/projects/forge-landing.png",
      "/projects/forge-dashboard.png",
      "/projects/forge-calendar.png",
    ],
    timestamps: "2025",
    markdown: forgeMarkdown,
    demoLink: "https://forgehub.me",
    sourceLink: "",
    status: "live",
  },
  {
    _id: 1,
    slug: "ai-resume-matcher",
    title: "AI Resume Matcher",
    description:
      "AI tool that scores a resume against a JD, returns a match %, recommends targeted tweaks, and predicts interview questions.",
    tag: "AI Tool",
    src: "",
    timestamps: "2025",
    markdown: aiResumeMatcherMarkdown,
    demoLink: "",
    sourceLink: "",
    status: "in-development",
  },
  {
    _id: 2,
    slug: "skill-nexus",
    title: "Skill Nexus",
    description:
      "A barter system that eliminates the financial barrier and lets you exchange skills for skills.",
    tag: "SaaS",
    src: "/SkillNexus.mp4",
    timestamps: "May 2025",
    markdown: skillNexusMarkdown,
    demoLink: "https://skill-nexus-frontend.vercel.app/",
    sourceLink: "",
  },
  {
    _id: 3,
    slug: "alyonus",
    title: "Alyonus",
    description:
      "A medical business application that streamlines and highlights the services provided by Alyonus.",
    tag: "MERN",
    src: "/Medical.mp4",
    timestamps: "May 2025",
    markdown: alyonusMarkdown,
    demoLink: "https://medical-three-gamma.vercel.app/",
    sourceLink: "",
  },
  {
    _id: 4,
    slug: "jobjen",
    title: "JobJen",
    description:
      "AI technical-interview platform I helped scale from 50 to 7,000+ users as a core engineer at Ragzon Solutions.",
    tag: "AI Platform",
    src: "",
    images: ["/projects/jobjen-cover.png"],
    timestamps: "Sep 2025 – Present",
    markdown: jobJenMarkdown,
    demoLink: "https://jobjen.com",
    sourceLink: "",
    status: "live",
  },
];
