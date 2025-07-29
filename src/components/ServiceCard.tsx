import type { IconType } from "react-icons"
import Tag from "./Tag";
import {motion} from "motion/react";

interface ServiceCardProps {
    Icon: IconType;
    title: string;
    description: string;
    tags: string[];
    cta: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ServiceCard: React.FC<ServiceCardProps> = ({ Icon, title, description, tags, cta }) => {
  return (
    <motion.div
    variants={cardVariants}
    className="border border-neutral-700/50 p-5 rounded-lg space-y-3 hover:shadow-xl hover:border-neutral-700/90 duration-400">
        <div className="flex items-center justify-start space-x-2">
            <div className="p-3 bg-neutral-800/80 rounded-full">
                <Icon size={20}/>
            </div>
            <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="space-y-3">
            <p className="text-neutral-400/80">{description}</p>
            <div className="flex space-x-2">
            {tags.map((tag) => <Tag tag={tag} key={tag} />)}
            </div>
        </div>
    </motion.div>
  )
}

export default ServiceCard