import { Search } from "lucide-react";
import PageTitle from "../components/PageTitle";
import StackCard from "../components/StackCard";
import { myStackSections } from "../data/StackSectionData";
import { useState } from "react";
import type { TechItem } from "../data/StackData";

const Stack = () => {
  const [searchQuery, setSearchQuery] = useState<string>();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filterStack = (stackData: TechItem[]) => {
    if(!searchQuery) return stackData;
    console.log("Executing")
    return stackData.filter((item: TechItem) => 
      new RegExp(searchQuery, "i").test(item.name) ||
      new RegExp(searchQuery, "i").test(item.description) ||
      item.categories.some((cat) => new RegExp(searchQuery, "i").test(cat))
    )
  };

  return (
    <div>
      <PageTitle title="My Daily Dev Stack" />
      <div className="mt-2 space-y-8">
        <h2 className="text-neutral-400/70 text-xl tracking-wide">
          Frameworks, libraries, and tools I regularly use in development.
        </h2>
        <div className="relative">
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
        </div>
        <div className="space-y-6">
          {myStackSections.map((section) => {
            const filteredDataStack = filterStack(section.data);
            if(filteredDataStack?.length === 0) return null;
            return (<StackCard title={section.title} stackArray={filteredDataStack} />)
            })}
        </div>
      </div>
    </div>
  );
};

export default Stack;
