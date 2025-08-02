import { Link, NavLink } from "react-router-dom";
import pfp from "../assets/pfp.png";
import { ExternalLinksData, NavlinksData } from "../data/NavLinksData";
import { ExternalLink, Search } from "lucide-react";
import { useSearchCommand } from "../context/SearchCommandContext";

const Sidebar = () => {

  const { toggle } = useSearchCommand();

  return (
    <div className="relative h-full flex flex-col">
      {/* Profile Badge */}
      <Link to={"/"} className="flex items-center gap-2">
        <img
          src={pfp}
          alt="image"
          className="w-14 h-14 rounded-full object-contain bg-black/50"
        />
        <div>
          <h2 className="text-xl font-bold text-shadow-lg">Fahad Khan</h2>
          <h6 className="text-xs tracking-wide text-neutral-400">
            Software Engineer
          </h6>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="space-y-1 pt-10 font-semibold text-sm flex-1 overflow-y-auto">
        {NavlinksData.map((link, i) => (
          <div key={link.group + i}>
            {link.group !== "Main" && (
              <h6 className="pl-4 text-neutral-500 my-4 font-medium">
                {link.group}
              </h6>
            )}
            {link.links.map((link) => (
              <NavLink
                key={link.number}
                to={link.href}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-2 px-4 py-3 rounded-md transition duration-400 ${
                    isActive
                      ? "bg-neutral-800"
                      : "text-neutral-500 hover:text-white/90"
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <p>{link.label}</p>
                </div>
                <div className="flex items-center justify-between border px-1.5 py-0.5 text-[0.7rem] border-neutral-600 rounded-md">
                  <p>{link.number}</p>
                </div>
              </NavLink>
            ))}
          </div>
        ))}
        {ExternalLinksData.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
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

      {/* Sticky Search Command Bar */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 mb-2 border border-neutral-700/70 rounded-md text-sm cursor-pointer"
      onClick={() => toggle()}>
        <div className="flex items-center gap-2">
          <Search size={14} />
          <span>Search</span>
        </div>
        <kbd className="bg-neutral-800 text-white px-2 py-0.5 rounded">Ctrl + K</kbd>
      </div>
    </div>
  );
};


export default Sidebar;