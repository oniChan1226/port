import { Check, CodeXml, Copy, LayoutDashboard, Newspaper } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { myWorkEmail } from "../constants/constants.ts";
import ProjectCard from "../components/ProjectCard.tsx";
import CardContainer from "../components/CardContainer.tsx";
import Tooltip from "../components/Tooltip.tsx";
import { myProjects } from "../data/ProjectsData.tsx";
import { myArticles } from "../data/ArticlesData.tsx";
import QuickAction from "../components/QuickAction.tsx";

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
          <h2 className="text-5xl font-semibold leading-16 tracking-wide text-shadow-lg/10">
            Hey, I'm Fahad,
          </h2>
          <h2 className="text-5xl font-semibold leading-14 tracking-wide text-shadow-lg/10">
            A Full-Stack <span className="text-neutral-500">Developer.</span>{" "}
          </h2>
          <div className="my-4 text-neutral-400/70 text-md ">
            <h6>
              I enjoy building web applications that look good and scale well —
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
          <Tooltip
            content={copied ? "Copied!" : "Copy"}
            position="top"
            alignments="mb-1"
          >
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
          {myProjects.map((project) => (
            <ProjectCard
              title={project.title}
              description={project.description}
              projectImage={project.img}
              tag={project.tag}
            />
          ))}
        </CardContainer>
      </div>
      {/* articles */}
      <div className=" border border-neutral-800 rounded-md">
        <div className="w-[90%] mx-auto my-6">
          <div>
            <h2 className="text-lg font-semibold">Articles</h2>
            <p className="text-neutral-500">
              Explore concise articles sharing insights, tutorials, and ideas
              from my development journey.
            </p>
          </div>
          <div className="flex items-center gap-2 py-2 mt-2">
            {myArticles.slice(0, 2).map((article) => (
              <div className="flex gap-3 items-center cursor-pointer border border-transparent hover:border hover:border-neutral-800 hover:bg-primary py-3 duration-300 rounded-lg pl-2">
                <div className="bg-neutral-800 p-4 rounded">
                  <Newspaper size={20} />
                </div>

                <div>
                  <h2 className="line-clamp-1 font-semibold">
                    {article.title}
                  </h2>
                  <p className="line-clamp-1 text-sm text-neutral-500">
                    {article.brief}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-primary flex justify-between items-center px-5 py-6">
          <div>
            <h2 className="font-semibold">Join 500+ Readers</h2>
            <p className="text-neutral-500 text-sm">
              Read about authentic insights and articles regarding tech.
            </p>
          </div>
          <form className="flex items-center gap-2">
            <input
              type="email"
              name=""
              id=""
              className="border border-neutral-800 outline-none px-3 py-2 rounded-md"
              placeholder="Your Email"
              required
            />
            <button
              type="submit"
              className="px-12 py-2 rounded-md bg-neutral-800 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* quick actions */}
      <div className="grid grid-cols-2 items-center gap-8">
        <QuickAction
          Icon={LayoutDashboard}
          title="Feed"
          brief="Dive into my quick thoughs"
          actionText="View Feed"
          to="#"
          backgroundStyle="s"
        />
        <QuickAction
          Icon={CodeXml}
          title="Projects"
          brief="Explore my latest full-stack builds and experiments"
          actionText="Browse Projects"
          to="#"
          backgroundStyle="m"
        />
      </div>
    </div>
  );
};

export default Home;
