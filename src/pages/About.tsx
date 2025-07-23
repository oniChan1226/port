import { aboutMe, myCards } from "../data/AboutMeData";
import pfp from "../assets/pfp.png";
import BadgeCards from "../components/BadgeCards";
import { CodeXml, Layers, MapPin } from "lucide-react";
import QuickAction from "../components/QuickAction";
import {motion} from "motion/react";

const About = () => {
  return (
    <div>
      <div className="flex items-center gap-x-1 mb-4 text-sm font-semibold text-neutral-500">
        <MapPin size={15}/>
        <p>Based in Pakistan</p>
      </div>
      {/* about me */}
      <article className="flex flex-col lg:flex-row justify-center items-center lg:gap-16 ">
        <div className="w-full lg:w-[70%] ">
          <h2 className="text-3xl lg:text-5xl font-semibold mb-5">About Me</h2>
          <motion.p className="text-lg leading-6 font-semibold text-neutral-400/70 tracking-wide hyphens-auto"
          
          >
            {aboutMe}
          </motion.p>
          <div className="grid md:grid-cols-2 gap-4 my-12 hyphens-auto">
            {myCards.map((card) => (
              <BadgeCards
                key={card.title}
                title={card.title}
                Icon={card.Icon}
                brief={card.brief}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[30%] ">
          <div className="shadow-sm shadow-neutral-800 bg-gradient-to-r from-black via-neutral-900/30 to-black/80 flex items-center justify-center rounded-lg lg:max-w-56">
            <img
              src={pfp}
              alt=""
              className="lg:max-h-60 object-contain rounded-full"
            />
          </div>
        </div>
      </article>
      {/* quick actions */}
      <div className="grid lg:grid-cols-2 items-center gap-8 mt-8 lg:mt-0">
        <QuickAction
          Icon={Layers}
          title="Stack"
          brief="Technologies and tools I use"
          actionText="View Stack"
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

export default About;
