import type { IconType } from "react-icons";
import Tag from "./Tag";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";

interface ServiceCardProps {
  Icon: IconType;
  title: string;
  description: string;
  tags: string[];
  cta: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const ServiceCard: React.FC<ServiceCardProps> = ({ Icon, title, description, tags }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 280, damping: 32 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 280, damping: 32 });

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
      variants={cardVariants}
      whileInView="show"
      initial="hidden"
      viewport={{ once: true, margin: "-60px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="border border-neutral-700/50 p-4 lg:p-5 rounded-lg space-y-3 hover:shadow-xl hover:border-neutral-600/70 hover:bg-neutral-800/20 duration-300 cursor-default"
    >
      <div className="flex items-center justify-start space-x-2">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="p-3 bg-neutral-800/80 rounded-full"
        >
          <Icon size={20} />
        </motion.div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-3">
        <p className="text-neutral-400/90">{description}</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
