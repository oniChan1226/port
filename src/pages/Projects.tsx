import CardContainer from "../components/CardContainer";
import PageTitle from "../components/PageTitle";
import ProjectCard from "../components/ProjectCard";
import { myProjects } from "../data/ProjectsData";

const Projects = () => {
  return (
    <div>
      {/* header */}
      <PageTitle title="Projects" brief="A quick look at what I’ve built." />
      <div className="mt-8 lg:mt-16">
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
    </div>
  );
};

export default Projects;
