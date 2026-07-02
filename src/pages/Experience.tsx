import { useEffect, useRef, useState } from "react";
import { myExperience } from "../data/ExperienceData";
import QuickAction from "../components/QuickAction";
import { CodeXml, Layers } from "lucide-react";
import PageTitle from "../components/PageTitle";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import Tag from "../components/Tag";

const ExperienceEntry = ({
  exp,
  index,
}: {
  exp: (typeof myExperience)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="relative pl-8"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: index * 0.08 + 0.1 }}
        className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-sky-500 border-2 border-neutral-900 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
      />

      <div className="space-y-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-semibold leading-6">{exp.companyName}</h2>
            {exp.duration.to === "Present" && (
              <span className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full bg-sky-900/40 border border-sky-800/60 text-sky-300">
                Current
              </span>
            )}
          </div>
          <h6 className="text-neutral-500 text-sm">
            {exp.designation} · {exp.duration.from} – {exp.duration.to} · {exp.location}
          </h6>
        </div>
        <p className="text-neutral-400/90">{exp.brief}</p>
        <ul className="space-y-1 list-disc ml-5">
          {exp.responsibilities.map((rsp) => (
            <li key={rsp.header} className="text-neutral-400/90">
              <span className="font-bold text-md text-white/80">{rsp.header}: </span>
              {rsp.content.map((part, idx) =>
                part.highlight ? (
                  <span key={idx} className="text-white">
                    {part.text}
                  </span>
                ) : (
                  <span key={idx}>{part.text}</span>
                )
              )}
            </li>
          ))}
        </ul>
        {exp.techStack && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.techStack.map((tech) => (
              <Tag key={tech} tag={tech} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const TimelineLine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-[5.5px] top-0 bottom-0 w-px bg-neutral-800">
      <motion.div
        className="w-full bg-gradient-to-b from-sky-500 to-indigo-500 origin-top h-full timeline-line"
        style={{ scaleY }}
      />
    </div>
  );
};

const Experience = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-10">
      <PageTitle
        title="Experience"
        brief="Summary of my professional work, the technologies I've grown with, and the impact I've created through code."
      />

      <article className="relative space-y-10">
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-4 animate-pulse pl-8">
              <div className="h-5 w-1/3 bg-neutral-700 rounded" />
              <div className="h-4 w-1/2 bg-neutral-800 rounded" />
              <div className="h-3 w-full bg-neutral-800 rounded" />
              <ul className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <li key={j} className="h-3 w-5/6 bg-neutral-800 rounded ml-5" />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <>
            <TimelineLine />
            {myExperience.map((exp, i) => (
              <ExperienceEntry key={exp._id} exp={exp} index={i} />
            ))}
          </>
        )}
      </article>

      <div className="grid lg:grid-cols-2 items-center gap-8">
        <QuickAction
          Icon={Layers}
          title="Stack"
          brief="Technologies and tools I use"
          actionText="View Stack"
          to="/stack"
          backgroundStyle="m"
        />
        <QuickAction
          Icon={CodeXml}
          title="Projects"
          brief="Explore my latest full-stack builds and experiments"
          actionText="Browse Projects"
          to="/projects"
          backgroundStyle="s"
        />
      </div>
    </div>
  );
};

export default Experience;
