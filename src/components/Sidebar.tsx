import { Link, NavLink, useLocation } from "react-router-dom";
import pfp from "../assets/pfp.png";
import { ExternalLinksData, NavlinksData } from "../data/NavLinksData";
import { ExternalLink, Moon, Search, Sun } from "lucide-react";
import { useSearchCommand } from "../context/SearchCommandContext";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { toggle: toggleSearch } = useSearchCommand();
  const { theme, toggle: toggleTheme } = useTheme();
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
      <div className="flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <div className="relative">
            <img
              src={pfp}
              alt="Fahad Khan"
              className="w-14 h-14 rounded-full object-contain dark:bg-black/50 bg-neutral-200/60"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 flex items-center justify-center">
              <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-60" />
              <span className="relative w-3 h-3 rounded-full bg-green-500 border-2 border-primary" />
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Fahad Khan</h2>
            <h6 className="text-xs tracking-wide text-neutral-500">Software Engineer</h6>
          </div>
        </Link>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-md hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors duration-200 text-neutral-500 hover:text-[var(--text-base)] flex-shrink-0"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={16} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Live clock */}
      <div className="mt-3 ml-0.5 flex items-center gap-1.5 text-[0.7rem] text-neutral-500">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500/70 inline-block" />
        <span>PKT {formattedTime}</span>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1 pt-8 font-semibold text-sm flex-1 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800 overflow-y-auto">
        {NavlinksData.map((group, i) => (
          <div key={group.group + i}>
            {group.group !== "Main" && (
              <h6 className="pl-4 text-neutral-500 my-4 font-medium">{group.group}</h6>
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
                      isActive ? "text-[var(--text-base)]" : "text-neutral-500 hover:text-[var(--text-base)]"
                    }`
                  }
                >
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
                  <div className="relative z-10 border px-1.5 py-0.5 text-[0.7rem] border-neutral-600 rounded-md">
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
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-md transition-colors duration-200 text-neutral-500 hover:text-[var(--text-base)]"
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
        className="flex items-center justify-between gap-2 px-3 py-2 mb-2 border border-neutral-700 rounded-md text-sm cursor-pointer hover:bg-neutral-800 transition-colors duration-200"
        onClick={() => toggleSearch()}
      >
        <div className="flex items-center gap-2 text-neutral-500">
          <Search size={14} />
          <span>Search</span>
        </div>
        <kbd className="bg-neutral-800 text-[var(--text-base)] px-2 py-0.5 rounded text-xs border border-neutral-700">
          Ctrl + K
        </kbd>
      </div>
    </div>
  );
};

export default Sidebar;
