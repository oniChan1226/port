import React from "react";
import type { TechItem } from "../data/StackData";
import Tag from "./Tag";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StackCardProps {
  title: string;
  stackArray: TechItem[];
}
const containerVariants = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const StackCard: React.FC<StackCardProps> = ({ title, stackArray }) => {
  return (
      <motion.div
        variants={cardVariants}
        className="border border-neutral-800 rounded-xl overflow-hidden"
      >
        <h2 className="bg-primary text-lg font-bold p-5">{title}</h2>
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-5 p-6"
        >
          {stackArray.map((stack) => (
            <motion.a
              key={stack.name}
              variants={cardVariants} // apply child variants
              href={stack.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-x-2 items-start justify-start border border-transparent rounded-lg p-4 cursor-pointer group hover:border-neutral-800 hover:scale-105 hover:shadow-lg duration-300"
            >
              <div className="bg-primary rounded-md p-3">
                <stack.icon size={30} />
              </div>
              <div className="space-y-2">
                <h2 className="font-semibold text-md flex items-center space-x-1">
                  <span>{stack.name}</span>
                  <ExternalLink
                    size={12}
                    className="hidden group-hover:block duration-300"
                  />
                </h2>
                <p className="text-sm text-neutral-500">{stack.description}</p>
                <div className="flex items-center justify-start space-x-2">
                  {stack.categories.map((cat: string) => (
                    <Tag tag={cat} key={cat} />
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
  );
};

export default StackCard;
