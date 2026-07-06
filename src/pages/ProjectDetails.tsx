import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { myProjects } from "../data/ProjectsData";
import { Briefcase, Flame } from "lucide-react";
import BackTo from "../components/BackTo";
import DemoCard from "../components/DemoCard";
import QuickAction from "../components/QuickAction";
import { FeaturedBadge, StatusBadge, TagBadge } from "../components/ProjectBadges";

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = myProjects.find((p) => p.slug === slug);

  if (!project) return <div>404 — Project not found</div>;
  return (
    <div className="space-y-8">
      <BackTo to="/projects" text="All Projects"/>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.featured && <FeaturedBadge />}
          <StatusBadge status={project.status} />
          <TagBadge tag={project.tag} />
        </div>
        <h2 className="text-4xl lg:text-5xl font-semibold tracking-wide" style={{ color: "var(--text-base)" }}>{project.title}</h2>
        <p className="text-neutral-400/90">{project.description}</p>
      </div>
      <div className="space-y-1">
        <div className="text-neutral-400/90 flex items-center text-sm">
          {project.timestamps}
        </div>
        {project.src ? (
          <div className="rounded-lg overflow-hidden shadow-xl h-74 sm:h-auto">
            <video src={project.src} autoPlay muted loop preload="metadata" className="h-full w-full object-contain"></video>
          </div>
        ) : project.images?.length ? (
          <div className="space-y-2">
            <div className="rounded-lg overflow-hidden shadow-xl border border-neutral-800">
              <img src={project.images[0]} alt={project.title} decoding="async" className="w-full h-auto object-cover" />
            </div>
            {project.images.length > 1 && (
              <div className="grid grid-cols-2 gap-2">
                {project.images.slice(1).map((img) => (
                  <div key={img} className="rounded-lg overflow-hidden shadow-xl border border-neutral-800">
                    <img src={img} alt={project.title} decoding="async" className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg h-60 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 flex items-center justify-center">
            <StatusBadge status={project.status} />
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
