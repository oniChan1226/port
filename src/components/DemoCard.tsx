
interface DemoCardProps {
  demo: string;
  source: string;
}

const DemoCard = ({ demo, source }: DemoCardProps) => {
  return (
    <div className="bg-primary rounded-lg flex justify-between items-center flex-col lg:flex-row gap-4 p-5 lg:p-8">
      <div className="w-full lg:w-1/2">
        <h2 className="">Demo & Code</h2>
        <p className="text-neutral-500 text-xs">
          Would you like to take a quick demo or view the source code?
        </p>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-2">
        <a
          href={demo}
          target="_blank"
          className="px-4 py-2 w-full bg-neutral-800 hover:bg-neutral-800/80 hover:text-white/50 duration-300 text-white text-center rounded"
        >
          Demo
        </a>
        <a
          href={source}
          target="_blank"
          className="px-4 py-2 w-full bg-neutral-900 hover:bg-neutral-900/80 hover:text-white/50 duration-300 text-white text-center rounded"
        >
          Source
        </a>
      </div>
    </div>
  );
};

export default DemoCard;
