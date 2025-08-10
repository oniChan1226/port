import { NavLink } from "react-router-dom";
import { NavlinksData } from "../data/NavLinksData";

const NavigationMobile = () => {
  return (
    <div className="flex flex-nowrap gap-x-2 w-[95%] mx-auto overflow-x-auto scrollbar-none">
      {NavlinksData.map((navlink) => (
        navlink.links.map((link) =>
        <NavLink
          to={link.href}
          key={link.number}
          className={({ isActive }) =>
            `flex items-center justify-center flex-col p-3 transition-all duration-300 rounded-lg text-xs ${
              isActive
                ? "text-white/90 bg-neutral-800/95 font-semibold"
                : "text-neutral-500 hover:text-neutral-600"
            }`
          }
        >
          {link.icon}
          {link.label}
        </NavLink>)
      ))}
    </div>
  );
};

export default NavigationMobile;
