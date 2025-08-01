import { aboutMe, myCards } from "../data/AboutMeData";
import pfp from "../assets/pfp.png";
import BadgeCards from "../components/BadgeCards";
import { CodeXml, Layers, MapPin } from "lucide-react";
import QuickAction from "../components/QuickAction";
import { motion } from "motion/react";
import { TextRevealCard } from "../components/ui/text-reveal-card";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

const TransitionDuration = {
  duration: 0.5,
};

const About = () => {
  return (
    <div>
      <motion.div
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 100,
        }}
        transition={{...TransitionDuration, delay: 0.2}}
        className="flex items-center gap-x-1 mb-4 text-sm font-semibold text-neutral-500"
      >
        <MapPin size={15} />
        <p>Based in Pakistan</p>
      </motion.div>
      {/* about me */}
      <article className="flex flex-col lg:flex-row justify-center items-center lg:gap-16 ">
        <div className="w-full lg:w-[70%] ">
          <motion.h2
            initial={{
              x: -40,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 100,
            }}
            transition={TransitionDuration}
            className="text-3xl lg:text-5xl font-semibold mb-5"
          >
            About Me
          </motion.h2>
          <motion.p
          initial={{
            x: -40,
            opacity: 0
          }}
          animate={{
            x: 0,
            opacity: 100,
          }}
          transition={TransitionDuration}
           className="">
            <TextGenerateEffect words={aboutMe}  />
          </motion.p>
          <div className="grid md:grid-cols-2 gap-4 my-12 hyphens-auto">
            {myCards.map((card, i) => (
              <BadgeCards
              index={i}
                key={card.title}
                title={card.title}
                Icon={card.Icon}
                brief={card.brief}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[30%] ">
          <motion.div
          initial={{
            scale: 0.85,
          }}
          animate={{
            scale: 1,
          }}
          transition={TransitionDuration}
          className="shadow-sm shadow-neutral-800 bg-gradient-to-r from-black via-neutral-900/30 to-black/80 flex items-center justify-center rounded-lg lg:max-w-56">
            <img
              src={pfp}
              alt=""
              className="lg:max-h-60 object-contain rounded-full"
            />
          </motion.div>
        </div>
      </article>
      <TextRevealCard revealText="I know the chemistry" text="You know the business"
      className="mb-8 hidden lg:block"
       />
      {/* quick actions */}
      <motion.div 
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={TransitionDuration}
      className="grid lg:grid-cols-2 items-center gap-8 mt-8 lg:mt-0">
        <QuickAction
          Icon={Layers}
          title="Stack"
          brief="Technologies and tools I use"
          actionText="View Stack"
          to="/stack"
          backgroundStyle="s"
        />
        <QuickAction
          Icon={CodeXml}
          title="Projects"
          brief="Explore my latest full-stack builds and experiments"
          actionText="Browse Projects"
          to="/projects"
          backgroundStyle="m"
        />
      </motion.div>
    </div>
  );
};

export default About;
