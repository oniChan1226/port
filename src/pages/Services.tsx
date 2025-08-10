import PageTitle from "../components/PageTitle";
import ServiceCard from "../components/ServiceCard";
import { myServices } from "../data/ServicesData";
import {motion} from "motion/react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};


const Services = () => {
  return (
    <div>
      <PageTitle title="Services" brief="A list of services I offer" />
      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          Freelancing on{" "}
          <a
            href="https://www.fiverr.com/fahadkhanhere?public_mode=true"
            target="_blank"
            className="bg-gradient-to-b from-green-800 to-green-950 rounded-md px-2 py-1 hover:text-white/50 cursor-pointer duration-300"
          >
            Fiverr
          </a>{" "}
          &{" "}
          <a
            href="https://www.upwork.com/freelancers/~011b2c1ef8ac9b0568?viewMode=1"
            target="_blank"
            className="bg-gradient-to-b from-gray-400 to-gray-700 px-2 py-1 rounded-md hover:text-white/50 cursor-pointer duration-300"
          >
            Upwork
          </a>
        </h2>
      </div>
      <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-y-5 mt-6">
        {myServices.map((service) => (
          <ServiceCard
            Icon={service.icon}
            title={service.title}
            description={service.description}
            key={service.title}
            cta={service.cta}
            tags={service.tags}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
