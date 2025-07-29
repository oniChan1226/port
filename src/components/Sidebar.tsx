import { NavLink } from "react-router-dom";
import pfp from "../assets/pfp.png";
import { ExternalLinksData, NavlinksData } from "../data/NavLinksData";
import { ExternalLink } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="">
      {/* Profile Badge */}
      <div className="flex items-center gap-2">
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
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1 pt-10 font-semibold text-sm">
        {NavlinksData.map((link) => (
          <>
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
                      ? "bg-neutral-800 "
                      : "text-neutral-500 hover:text-white/90"
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <p>{link.label}</p>
                </div>
                <div className="flex items-center justify-between border p-2 py-1 text-[0.7rem] border-neutral-600 rounded-md">
                  <p>{link.number}</p>
                </div>
              </NavLink>
            ))}
          </>
        ))}
        {ExternalLinksData.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            className={`flex items-center justify-between gap-2 px-4 py-3 rounded-md transition duration-400 text-neutral-500 hover:text-white/90`}
          >
            <div className="flex items-center gap-2">
              {link.icon}
              <p>{link.label}</p>
            </div>
            <p>
              <ExternalLink size={15} />
            </p>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
