import { Link, NavLink, useLocation } from "react-router-dom";
import pfp from "../assets/pfp.png";
import { ExternalLinksData, NavlinksData } from "../data/NavLinksData";
import { ExternalLink, Search } from "lucide-react";
import { useSearchCommand } from "../context/SearchCommandContext";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { toggle } = useSearchCommand();
  const location = useLocation();
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi",
  });

  return (
    <div className="relative h-full flex flex-col">
      {/* Profile Badge */}
      <Link to={"/"} className="flex items-center gap-2">
        <div className="relative">
          <img
            src={pfp}
            alt="Fahad Khan"
            className="w-14 h-14 rounded-full object-contain bg-black/50"
          />
          {/* Availability pulse dot */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 flex items-center justify-center">
            <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-60" />
            <span className="relative w-3 h-3 rounded-full bg-green-500 border-2 border-neutral-900" />
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-shadow-lg">Fahad Khan</h2>
          <h6 className="text-xs tracking-wide text-neutral-400">
            Software Engineer
          </h6>
        </div>
      </Link>

      {/* Live clock + location */}
      <div className="mt-3 ml-0.5 flex items-center gap-1.5 text-[0.7rem] text-neutral-500">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500/70 inline-block" />
        <span>PKT {formattedTime}</span>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1 pt-8 font-semibold text-sm flex-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 overflow-y-auto">
        {NavlinksData.map((group, i) => (
          <div key={group.group + i}>
            {group.group !== "Main" && (
              <h6 className="pl-4 text-neutral-500 my-4 font-medium">
                {group.group}
              </h6>
            )}
            {group.links.map((link) => {
              const isActive =
                link.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.href);

              return (
                <NavLink
                  key={link.number}
                  to={link.href}
                  className={() =>
                    `relative flex items-center justify-between gap-2 px-4 py-3 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "text-white/90"
                        : "text-neutral-500 hover:text-white/90"
                    }`
                  }
                >
                  {/* Sliding background indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-md bg-neutral-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 38 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="relative flex items-center gap-2 z-10">
                    {link.icon}
                    <p>{link.label}</p>
                  </div>
                  <div className="relative z-10 flex items-center justify-between border px-1.5 py-0.5 text-[0.7rem] border-neutral-600 rounded-md">
                    <p>{link.number}</p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        ))}

        {ExternalLinksData.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-md transition duration-400 text-neutral-500 hover:text-white/90"
          >
            <div className="flex items-center gap-2">
              {link.icon}
              <p>{link.label}</p>
            </div>
            <ExternalLink size={15} />
          </a>
        ))}
      </nav>

      {/* Search Command Bar */}
      <div
        className="flex items-center justify-between gap-2 px-3 py-2 mb-2 border border-neutral-700/70 rounded-md text-sm cursor-pointer hover:border-neutral-600 hover:bg-neutral-800/30 transition-colors duration-200"
        onClick={() => toggle()}
      >
        <div className="flex items-center gap-2">
          <Search size={14} />
          <span>Search</span>
        </div>
        <kbd className="bg-neutral-800 text-white px-2 py-0.5 rounded text-xs">Ctrl + K</kbd>
      </div>
    </div>
  );
};

export default Sidebar;
