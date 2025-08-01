import { Link } from "react-router-dom";
import type { Project } from "../data/ProjectsData";

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({
  project
}: ProjectCardProps) => {
  console.log(project)
  return (
    <Link
    to={`/projects/${project.slug}`}
     className="w-fit rounded-lg overflow-hidden bg-primary border border-neutral-800 cursor-pointer group hover:shadow-sm duration-300 shadow-neutral-800">
      <div className="">
        <video 
        src={project.src}
        autoPlay
        loop
        muted
        preload="metadata"
        >
        </video>
      </div>
      <div className="w-[90%] mx-auto my-4 flex justify-between items-center gap-5 ">
        <div>
          <h2 className="text-lg font-semibold">{project.title}</h2>
          <h6 className="text-xs md:text-sm text-neutral-500 line-clamp-2 leading-4 lg:leading-5">
            {project.description}
          </h6>
        </div>
        <h3 className="text-xs lg:text-sm font-semibold text-right rounded-lg border border-neutral-700 px-2 py-1">
          {project.tag}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
