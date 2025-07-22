import { NavLink } from "react-router-dom";
import { NavlinksData } from "../data/NavLinksData";

const NavigationMobile = () => {
  return (
    <div className="flex gap-x-2 w-[95%] mx-auto overflow-y-auto scrollbar-none">
      {NavlinksData.map((navlink) => (
        <NavLink
          to={navlink.href}
          key={navlink.number}
          className={({ isActive }) =>
            `flex items-center justify-center flex-col p-3 transition-all duration-300 rounded-lg text-xs ${
              isActive
                ? "text-white/90 bg-neutral-800/95 font-semibold"
                : "text-neutral-500 hover:text-neutral-600"
            }`
          }
        >
          {navlink.icon}
          {navlink.label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavigationMobile;
