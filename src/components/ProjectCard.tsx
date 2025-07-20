import React from "react";

interface ProjectCardProps {
  title: string;
  projectImage: string;
  description: string;
  tag: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  projectImage,
  description,
  tag,
}) => {
  return (
    <div className="w-fit rounded-lg overflow-hidden bg-primary border border-neutral-800">
      <img src={projectImage} alt="" className="h-80 w-full object-contain" />
      <div className="w-[90%] mx-auto my-4 flex justify-between items-center gap-5">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <h6 className="text-sm text-neutral-500 line-clamp-2">
            {description}
          </h6>
        </div>
        <h3 className="text-sm font-semibold text-right rounded-lg border border-neutral-700 px-2 py-1">
          {tag}
        </h3>
      </div>
    </div>
  );
};

export default ProjectCard;
