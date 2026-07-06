import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { myProjects, skillNexusMarkdown } from "../data/ProjectsData";
import { Briefcase, Dot, Flame } from "lucide-react";
import BackTo from "../components/BackTo";
import DemoCard from "../components/DemoCard";
import QuickAction from "../components/QuickAction";

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = myProjects.find((p) => p.slug === slug);

  if (!project) return <div>404 — Project not found</div>;
  return (
    <div className="space-y-8">
      <BackTo to="/projects" text="All Projects"/>
      <div>
        <h2 className="text-4xl lg:text-5xl font-semibold tracking-wide" style={{ color: "var(--text-base)" }}>{project.title}</h2>
        <p className="text-neutral-400/90">{project.description}</p>
      </div>
      <div className="space-y-1">
        <div className="text-neutral-400/90 flex items-center text-sm">
          {project.timestamps}
          <Dot />
          {project.tag}
        </div>
        {project.src ? (
          <div className="rounded-lg overflow-hidden shadow-xl h-74 sm:h-auto">
            <video src={project.src} autoPlay muted loop preload="metadata" className="h-full w-full object-contain"></video>
          </div>
        ) : project.images?.length ? (
          <div className="space-y-2">
            <div className="rounded-lg overflow-hidden shadow-xl border border-neutral-800">
              <img src={project.images[0]} alt={project.title} className="w-full h-auto object-cover" />
            </div>
            {project.images.length > 1 && (
              <div className="grid grid-cols-2 gap-2">
                {project.images.slice(1).map((img) => (
                  <div key={img} className="rounded-lg overflow-hidden shadow-xl border border-neutral-800">
                    <img src={img} alt={project.title} className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg h-60 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 flex items-center justify-center">
            {project.status === "in-development" && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-700 dark:bg-amber-900/40 dark:border-amber-700/50 dark:text-amber-400">
                In Development
              </span>
            )}
          </div>
        )}
      </div>
      <DemoCard demo={project.demoLink} source={project.sourceLink}/>
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{project.markdown}</ReactMarkdown>
      </div>
      <div className="grid lg:grid-cols-2 items-center gap-8">
        <QuickAction
          Icon={Flame}
          title="Services"
          brief="Services I offer"
          actionText="View Services"
          to="#"
          backgroundStyle="s"
        />
        <QuickAction
          Icon={Briefcase}
          title="Experience"
          brief="My professional experience"
          actionText="View Experience"
          to="#"
          backgroundStyle="m"
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
