import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { myWorkEmail } from "../constants/constants.ts";
import ProjectCard from "../components/ProjectCard.tsx";
import CardContainer from "../components/CardContainer.tsx";
import Tooltip from "../components/Tooltip.tsx";
import { myProjects } from "../data/ProjectsData.tsx";

const Home = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(myWorkEmail);
      setCopied(() => true);
      setTimeout(() => setCopied(() => false), 1500);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-8">
      {/* introduction */}
      <div>
        <div>
          <h2 className="text-5xl font-semibold leading-16 tracking-wide">
            Hey, I'm Fahad,
          </h2>
          <h2 className="text-5xl font-semibold leading-14 tracking-wide">
            A Full-Stack <span className="text-neutral-500">Developer.</span>{" "}
          </h2>
          <div className="my-4 text-neutral-400/70 text-md ">
            <h6>
              I enjoy building web applications that look good and scale well—
            </h6>
            <h6>Rare combo.I know</h6>
          </div>
        </div>
        <div className="flex items-center gap-3 font-semibold text-sm">
          <Tooltip content="More about me" position="top" alignments="mb-3">
            <Link
              to={"/about"}
              className="rounded bg-neutral-800 px-5 py-2 border border-neutral-700 hover:bg-neutral-800/70 hover:text-white/80 duration-300"
            >
              About
            </Link>
          </Tooltip>
          <Tooltip content={copied ? "Copied!" : "Copy"} position="top" alignments="mb-1">
            <button
              className="flex items-center gap-2 cursor-pointer bg-neutral-800/50 px-5 py-2 rounded border border-neutral-800 hover:text-white/70 duration-300"
              onClick={copyEmailToClipboard}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              Email
            </button>
          </Tooltip>
        </div>
      </div>
      {/* new drops */}
      <div>
        <h4 className="text-lg font-semibold">New Drops</h4>
        <CardContainer>
          {myProjects.map((project) => <ProjectCard title={project.title} description={project.description} projectImage={project.img} tag={project.tag} />)}
        </CardContainer>
      </div>
      {/* articles */}
      <div>
        <div>
          <h2>Articles</h2>
          <p>Explore concise articles sharing insights, tutorials, and ideas from my development journey.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
