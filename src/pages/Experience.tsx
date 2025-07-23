import { useEffect, useState } from "react";
import { myExperience } from "../data/ExperienceData";
import QuickAction from "../components/QuickAction";
import { CodeXml, Layers } from "lucide-react";
import PageTitle from "../components/PageTitle";

const Experience = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="space-y-10">
      {/* header */}
      <PageTitle
        title="Experience"
        brief="Summary of my professional work, the technologies I've grown with, and
          the impact I've creared through code."
      />
      {/* content */}
      <article className="space-y-8">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="h-5 w-1/3 bg-neutral-700 rounded"></div>
                <div className="h-4 w-1/2 bg-neutral-800 rounded"></div>
                <div className="h-3 w-full bg-neutral-800 rounded"></div>
                <ul className="space-y-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <li
                      key={j}
                      className="h-3 w-5/6 bg-neutral-800 rounded ml-5"
                    ></li>
                  ))}
                </ul>
              </div>
            ))
          : myExperience.map((exp) => (
              <div key={exp._id} className="space-y-2">
                <div>
                  <h2 className="text-xl font-semibold leading-6">
                    {exp.companyName}
                  </h2>
                  <h6 className="text-neutral-500">
                    {exp.designation}, {exp.duration.from} - {exp.duration.to}
                  </h6>
                </div>
                <p className="text-neutral-400/90">{exp.brief}</p>
                <ul className="space-y-1 list-disc ml-5">
                  {exp.responsibilities.map((rsp) => (
                    <li key={rsp.header} className="text-neutral-400/90">
                      <span className="font-bold text-md">{rsp.header}: </span>
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
              </div>
            ))}
      </article>
      <div className="grid lg:grid-cols-2 items-center gap-8">
        <QuickAction
          Icon={Layers}
          title="Stack"
          brief="Technologies and tools I use"
          actionText="View Stack"
          to="#"
          backgroundStyle="m"
        />
        <QuickAction
          Icon={CodeXml}
          title="Projects"
          brief="Explore my latest full-stack builds and experiments"
          actionText="Browse Projects"
          to="#"
          backgroundStyle="s"
        />
      </div>
    </div>
  );
};

export default Experience;
