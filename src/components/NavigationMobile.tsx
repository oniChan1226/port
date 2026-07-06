import { NavLink } from "react-router-dom";
import { ExternalLinksData, NavlinksData } from "../data/NavLinksData";

const NavigationMobile = () => {
  return (
    <div className="flex flex-nowrap gap-x-1.5 sm:gap-x-2 w-full px-3 overflow-x-auto scrollbar-none snap-x snap-mandatory">
      {NavlinksData.map((navlink) =>
        navlink.links.map((link) => (
          <NavLink
            to={link.href}
            key={link.number}
            title={link.label}
            className={({ isActive }) =>
              `flex flex-shrink-0 items-center justify-center flex-col gap-0.5 px-2.5 py-2 sm:p-3 min-w-14 sm:min-w-16 transition-all duration-300 rounded-lg border text-[0.65rem] sm:text-xs snap-center ${
                isActive
                  ? "bg-[var(--accent-1,#38bdf8)]/10 border-[var(--accent-1,#38bdf8)]/30 font-semibold"
                  : "border-transparent text-neutral-500 hover:text-neutral-400"
              }`
            }
            style={({ isActive }) =>
              isActive ? { color: "var(--text-base)" } : {}
            }
          >
            {link.icon}
            <span className="truncate max-w-14 sm:max-w-16 whitespace-nowrap">{link.label}</span>
          </NavLink>
        ))
      )}

      {/* Divider before external links */}
      <div className="flex-shrink-0 w-px my-1 bg-neutral-800" />

      {ExternalLinksData.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.label}
          className="flex flex-shrink-0 items-center justify-center flex-col gap-0.5 px-2.5 py-2 sm:p-3 min-w-14 sm:min-w-16 transition-all duration-300 rounded-lg text-[0.65rem] sm:text-xs snap-center text-neutral-500 hover:text-neutral-400"
        >
          {link.icon}
          <span className="truncate max-w-14 sm:max-w-16 whitespace-nowrap">{link.label}</span>
        </a>
      ))}
    </div>
  );
};

export default NavigationMobile;
