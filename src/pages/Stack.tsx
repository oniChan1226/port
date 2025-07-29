import { Search } from "lucide-react";
import PageTitle from "../components/PageTitle";
import StackCard from "../components/StackCard";
import { myStackSections } from "../data/StackSectionData";
import { useState } from "react";
import type { TechItem } from "../data/StackData";
import { AnimatePresence, motion } from "motion/react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Stack = () => {
  const [searchQuery, setSearchQuery] = useState<string>();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filterStack = (stackData: TechItem[]) => {
    if (!searchQuery) return stackData;
    console.log("Executing");
    return stackData.filter(
      (item: TechItem) =>
        new RegExp(searchQuery, "i").test(item.name) ||
        new RegExp(searchQuery, "i").test(item.description) ||
        item.categories.some((cat) => new RegExp(searchQuery, "i").test(cat))
    );
  };

  return (
    <div>
      <PageTitle title="My Daily Dev Stack" />
      <div className="mt-2 space-y-8">
        <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-neutral-400/70 text-xl tracking-wide">
          Frameworks, libraries, and tools I regularly use in development.
        </motion.h2>
        <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative">
          <input
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value as string)}
            type="search"
            name="search"
            id="search"
            placeholder="Search tools..."
            className="border border-neutral-800/80 w-full rounded-md pl-9 pr-2 py-2 text-sm focus:outline-none focus:border-neutral-800 focus:shadow-xs shadow-neutral-800"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            size={17}
          />
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <AnimatePresence mode="wait">
            {myStackSections.map((section) => {
              const filteredDataStack = filterStack(section.data);
              if (filteredDataStack?.length === 0) return null;

              return (
                <motion.div
                  key={section.title}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <StackCard
                    title={section.title}
                    stackArray={filteredDataStack}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Stack;
