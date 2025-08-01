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
        <h2 className="text-4xl lg:text-5xl font-semibold tracking-wide text-white">{project.title}</h2>
        <p className="text-neutral-400/90">{project.description}</p>
      </div>
      <div className="space-y-1">
        <div className="text-neutral-400/90 flex items-center text-sm">
          {project.timestamps}
          <Dot />
          {project.tag}
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-74 sm:h-auto">
          <video src={project.src} autoPlay muted loop preload="metadata" className="h-full w-full object-contain"></video>
        </div>
      </div>
      <DemoCard demo={project.demoLink} source={project.sourceLink}/>
      <div className="prose prose-invert max-w-none">
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
