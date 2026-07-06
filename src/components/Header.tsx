import { Moon, Search, Sun } from "lucide-react";
import pfp from "../assets/pfp.png";
import { Link } from "react-router-dom";
import { useSearchCommand } from "../context/SearchCommandContext";
import { useTheme } from "../context/ThemeContext";
import { AnimatePresence, motion } from "motion/react";

const Header = () => {
  const { toggle: toggleSearch } = useSearchCommand();
  const { mode: theme, toggleMode: toggleTheme } = useTheme();

  return (
    <div className="w-[94%] mx-auto flex justify-between items-center gap-2">
      {/* Profile */}
      <Link to={"/"} title="Fahad Khan" className="flex items-center gap-1 min-w-0">
        <img
          src={pfp}
          alt="Fahad Khan"
          className="w-10 h-10 rounded-full object-contain dark:bg-black/50 bg-neutral-200/60 flex-shrink-0"
        />
        <div className="min-w-0">
          <h2 className="text-md font-semibold leading-5 truncate">Fahad Khan</h2>
          <h6 className="text-xs text-neutral-500 truncate">Software Engineer</h6>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 cursor-pointer text-neutral-500 hover:text-[var(--text-base)] transition-colors duration-200"
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
                <Sun size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Search */}
        <button
          onClick={toggleSearch}
          className="p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 cursor-pointer text-neutral-500 hover:text-[var(--text-base)] transition-colors duration-200"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
};

export default Header;
