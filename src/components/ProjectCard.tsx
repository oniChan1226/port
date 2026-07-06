import { Link } from "react-router-dom";
import type { Project } from "../data/ProjectsData";
import { motion, useMotionValue, useTransform } from "motion/react";
import { FeaturedBadge, StatusBadge, TagBadge } from "./ProjectBadges";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative"
    >
      {/* Gradient glow that follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none z-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(56,189,248,0.08) 0%, transparent 70%)`
          ),
        }}
      />
      <Link
        to={`/projects/${project.slug}`}
        className="relative block w-fit rounded-lg overflow-hidden bg-primary border border-neutral-800 cursor-pointer group hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/50 duration-300"
      >
        <div>
          {project.src ? (
            <video
              src={project.src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-40 object-cover"
            />
          ) : project.images?.length ? (
            <div className="relative w-full h-40 overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                draggable={false}
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-2">
                {project.featured ? <FeaturedBadge /> : <span />}
                <StatusBadge status={project.status} />
              </div>
            </div>
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 flex items-center justify-center">
              <StatusBadge status={project.status} />
            </div>
          )}
        </div>
        <div className="w-[90%] mx-auto my-4 flex justify-between items-center gap-5">
          <div>
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <h6 className="text-xs md:text-sm text-neutral-500 line-clamp-2 leading-4 lg:leading-5">
              {project.description}
            </h6>
          </div>
          <TagBadge tag={project.tag} className="text-right" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
