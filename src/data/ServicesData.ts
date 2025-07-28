import {
  FaCode,
  FaServer,
  FaRocket,
  FaPalette,
  FaBriefcase,
} from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi2";

export const myServices = [
  {
    icon: FaCode,
    title: "Full-Stack Web App Development",
    description:
      "Scalable web apps with clean UI, dashboards, authentication, user roles and much more.",
    tags: ["React", "Node.js", "MongoDB", "TypeScript"],
    cta: "View Projects",
  },
  {
    icon: FaServer,
    title: "DevOps & Deployment",
    description:
      "Dockerized apps, GitHub Actions CI/CD, Nginx reverse proxy, and deployments to cloud platforms like AWS or Render.",
    tags: ["Docker", "CI/CD", "AWS", "Nginx"],
    cta: "Explore Setup",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "REST API Design & Integration",
    description:
      "RESTful APIs with secure JWT auth, payment gateways (Stripe), and third-party integrations.",
    tags: ["Express", "JWT", "PostgreSQL", "Stripe"],
    cta: "See APIs",
  },
  {
    icon: FaPalette,
    title: "Landing Pages & Portfolios",
    description:
      "SEO-friendly, animated, and responsive landing pages for startups, products, or personal brands.",
    tags: ["Next.js", "TailwindCSS", "Framer Motion", "SEO"],
    cta: "View Samples",
  },
  {
    icon: FaRocket,
    title: "SaaS Application Development",
    description:
      "Custom SaaS platforms with multi-tenancy, subscriptions, admin panels, and analytics — built for scale and performance.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "SaaS"],
    cta: "Explore SaaS",
  },
];

export const myFreelanceProfile = {
  icon: FaBriefcase,
  title: "Freelancing on Fiverr & Upwork",
  description:
    "I'm actively available for freelance projects on Fiverr and Upwork. If you're looking for reliable and modern full-stack solutions, let's connect!",
  tags: ["Fiverr", "Upwork", "Freelance", "Remote"],
  cta: "Hire Me",
  links: {
    fiverr: "https://www.fiverr.com/yourusername",
    upwork: "https://www.upwork.com/freelancers/yourusername",
  },
};
