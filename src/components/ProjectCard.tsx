import { Link } from "react-router-dom";
import type { Project } from "../data/ProjectsData";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      whileHover={{ scale: 1.02 }}
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
            <video src={project.src} autoPlay loop muted playsInline preload="metadata" />
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 flex items-center justify-center">
              {project.status === "live" && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-900/40 border border-green-700/50 text-green-400">
                  Live
                </span>
              )}
              {project.status === "in-development" && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-900/40 border border-amber-700/50 text-amber-400">
                  In Development
                </span>
              )}
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
          <h3 className="text-xs lg:text-sm font-semibold text-right rounded-lg border border-neutral-700 px-2 py-1 whitespace-nowrap">
            {project.tag}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
