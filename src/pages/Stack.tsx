import { Search } from "lucide-react";
import PageTitle from "../components/PageTitle";

const Stack = () => {
  return (
    <div>
      <PageTitle title="My Daily Dev Stack" />
      <div className="mt-2 space-y-8">
        <h2 className="text-neutral-400/70 text-xl tracking-wide">
          Frameworks, libraries, and tools I regularly use in development.
        </h2>
        <div className="relative">
          <input
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
      </div>
    </div>
  );
};

export default Stack;
