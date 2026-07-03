export const myExperience = [
  {
    _id: 1,
    companyName: "Ragzon Solutions",
    designation: "Software Engineer (Core Team)",
    duration: {
      from: "September 2025",
      to: "Present",
    },
    location: "Remote",
    brief:
      "Core engineer on JobJen (jobjen.com), an AI technical-interview platform that grew from 50 to 7,000+ users. Own AI interview scoring and quality end-to-end within a team of 8.",
    responsibilities: [
      {
        header: "Human-in-the-Loop Calibration",
        content: [
          { text: "Designed a " },
          { text: "calibration system", highlight: true },
          { text: " that benchmarks AI interview scores against human raters and iteratively tunes prompts and scoring logic to align " },
          { text: "AI judgment with human evaluators", highlight: true },
          { text: "." },
        ],
      },
      {
        header: "Dual Parallel Scoring Pipeline",
        content: [
          { text: "Built a pipeline for candidate communication: " },
          { text: "Whisper transcription", highlight: true },
          { text: " scoring substance & coherence run alongside " },
          { text: "GPT Realtime audio analysis", highlight: true },
          { text: " of vocal delivery & flow, aggregated into one calibrated score." },
        ],
      },
      {
        header: "Performance Optimization",
        content: [
          { text: "Identified high-frequency endpoints and optimized with " },
          { text: "MongoDB aggregation pipelines", highlight: true },
          { text: " and compound indexing, cutting key API response times from " },
          { text: "~8s to under 1s", highlight: true },
          { text: "." },
        ],
      },
      {
        header: "Real-Time Event-Driven Services",
        content: [
          { text: "Engineered real-time services with " },
          { text: "Socket.IO Pub/Sub", highlight: true },
          { text: " across multiple server instances and " },
          { text: "BullMQ", highlight: true },
          { text: " for async/batch processing; used PostHog analytics to validate features and prioritize quality improvements." },
        ],
      },
    ],
    techStack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "Socket.IO",
      "BullMQ",
      "Redis",
      "OpenAI GPT Realtime",
      "Whisper",
      "PostHog",
    ],
  },
  {
    _id: 2,
    companyName: "My Digital Pixels",
    designation: "Full-Stack Developer",
    duration: {
      from: "January 2025",
      to: "August 2025",
    },
    location: "Remote",
    brief:
      "Delivered 3+ MERN applications end-to-end, building secure REST APIs and contributing across the full product lifecycle.",
    responsibilities: [
      {
        header: "Full-Stack Development",
        content: [
          { text: "Delivered " },
          { text: "3+ MERN applications", highlight: true },
          { text: " end-to-end with secure REST APIs and " },
          { text: "OAuth 2.0 / JWT", highlight: true },
          { text: " access control." },
        ],
      },
      {
        header: "Team Collaboration & CI/CD",
        content: [
          { text: "Contributed to " },
          { text: "code reviews", highlight: true },
          { text: ", client meetings, and " },
          { text: "CI/CD workflows", highlight: true },
          { text: " in a collaborative team environment." },
        ],
      },
    ],
    techStack: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "OAuth 2.0",
      "JWT",
      "Tailwind CSS",
    ],
  },
];
