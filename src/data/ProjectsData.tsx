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
- **Design Patterns**: MVC, Singleton (DB), Observer (planned), Factory (user roles)

Diagrams & Flowcharts were created using **Draw.io** for better visualization and future collaboration.

## Key Features

- **Profile Setup** – Define skills you can teach and those you want to learn  
- **Skill Barter Requests** – Request, accept, reject, or complete exchanges  
- **ML-Based Matching** – Personalized suggestions using **KNN**  
- **Ratings & Reviews** – Reputation building after each exchange  
- **Analytics Dashboard** – Insights into your barter history and feedback  

## Security & Dev Tools

- **Auth**: JWT, bcrypt-hashed passwords  
- **Access Control**: Role-based permissions (admin, user, reviewer planned)  
- **Testing**: Postman, peer testing  
- **Version Control**: GitHub  
- **Planned**: Firebase for notification triggers

## Next Steps

We're aiming to expand Skill Nexus into a full-fledged **community platform**, featuring:

- Real-time chat (via WebSockets)
- Mobile app (React Native)
- Gamification elements (XP, badges, leaderboards)
- Voice & video-based sessions for live mentorship
- Verified user profiles and endorsements

## Use Cases

- A student trades **frontend mentorship** for **Python tutoring**  
- A freelancer swaps **logo design** for **SEO content writing**  
- A hobbyist learns by **teaching others**, forming a feedback loop of growth

## References

- [React Documentation](https://reactjs.org)  
- [Node.js Docs](https://nodejs.org/en/docs)  
- [Express Guide](https://expressjs.com)  
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)  
- [Scikit-learn: KNN](https://scikit-learn.org/stable/modules/neighbors.html)  
- [JWT Introduction](https://jwt.io/introduction)  
- [bcrypt GitHub](https://github.com/kelektiv/node.bcrypt.js)  
- [Draw.io](https://app.diagrams.net)

> ⚠️ Project is under active development.  
> **Developers**: Uzair Zahid · M. Zeeshan · Fahad Khan

`;

export const alyonusMarkdown = `
## Abstract

**Alyonus** is a modern web application tailored for the medical industry. It empowers clinics and service providers to **streamline operations**, **highlight their services**, and improve **patient engagement**. Built using the **MERN stack**, Alyonus focuses on simplicity, performance, and modularity.

It’s not just a business showcase — it’s a lightweight **digital assistant** for medical organizations.

## My Contribution

As the lead developer, I implemented the full-stack system from the ground up, ensuring seamless UI/UX while maintaining a modular backend.

- Built with **React.js** and **Tailwind CSS** for a fast, responsive interface  
- Implemented secure **authentication** and **role-based access**  
- Designed **MongoDB schemas** for managing clinics, services, and appointments  
- Connected everything with **Express APIs**, ensuring clean separation of concerns  
- Embedded an elegant video landing component to showcase **Alyonus' value visually**

## Tech Stack & Tools

- **Frontend**: React + Tailwind CSS (SPA with component-based design)  
- **Backend**: Node.js + Express.js (RESTful API architecture)  
- **Database**: MongoDB (cloud-hosted using MongoDB Atlas)  
- **Tools**: Postman, GitHub, Figma (for layout planning)

## Core Features

- **Service Listings** – Highlight medical services with dynamic cards  
- **Clinic Search & Profiles** – Easy discovery with filterable service categories  
- **Promotional Video Integration** – Enhances branding and trust  
- **User Roles** – Patient vs Admin dashboard (planned)  
- **Appointment Booking & Review System** (future roadmap)

## Design Philosophy

- **Minimal & Accessible** – Focused on clean visuals, legible content, and fast loads  
- **Reusable Components** – Everything from cards to navbars is modular  
- **Scalable API Structure** – Routes follow REST principles with future GraphQL support in mind  
- **Performance-First** – Media assets compressed to <1MB and lazy-loaded

## References

- [React](https://reactjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Node.js](https://nodejs.org/en/)  
- [Express](https://expressjs.com/)  
- [MongoDB Atlas](https://www.mongodb.com/atlas)  
- [Video Optimization (Cloudinary)](https://cloudinary.com/documentation/video_manipulation)

`;

export interface Project {
  _id: number;
  slug: string;
  title: string;
  description: string;
  tag: string;
  src: string;
  timestamps: string;
  markdown: string;
  demoLink: string;
  sourceLink: string;
}

export const myProjects: Project[] = [
  {
    _id: 0,
    slug: "skill-nexus",
    title: "Skill Nexus",
    description:
      "A barter system that eliminates the financial barrier and lets you exchange skills for skills.",
    tag: "SaaS",
    src: "/SkillNexus.mp4",
    timestamps: "24 May, 2025",
    markdown: skillNexusMarkdown,
    demoLink: "https://skill-nexus-frontend.vercel.app/",
    sourceLink: "",
  },
  {
    _id: 1,
    slug: "alyonus",
    title: "Alyonus",
    description:
      "A medical business application that streamlines and highlights the services provided by Alyonus.",
    tag: "MERN",
    src: "/Medical.mp4",
    timestamps: "24 May, 2025",
    markdown: alyonusMarkdown,
    demoLink: "https://medical-three-gamma.vercel.app/",
    sourceLink: "",
  },
];
