import CardContainer from "../components/CardContainer";
import PageTitle from "../components/PageTitle";
import ProjectCard from "../components/ProjectCard";
import { myProjects } from "../data/ProjectsData";

const Projects = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <PageTitle title="Projects" brief="A quick look at what I’ve built." />
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 shadow-sm">
          🚧 Updating Soon
        </span>
      </div>

      <div className="mt-8 lg:mt-16">
        <CardContainer>
          {myProjects.map((project, i) => (
            <ProjectCard project={project} key={project._id + i} />
          ))}
        </CardContainer>
      </div>
    </div>
  );
};

export default Projects;
