import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavigationMobile from "../components/NavigationMobile";
import { useCallback, useEffect, useRef, useState } from "react";
import { keyNavRoutes } from "../config/KeyNavConfig";
import SearchCommand from "../components/SearchCommand";
import { useSearchCommand } from "../context/SearchCommandContext";
// import PeekingCat from "../components/PeekingCat"; // disabled for now — revisit later
import ThemeDrawer from "../components/ThemeDrawer";
import BackgroundGlows from "../components/BackgroundGlows";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SIDEBAR_EXPANDED_WIDTH = 256; // w-64
const SIDEBAR_COLLAPSED_WIDTH = 80; // w-20

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { toggle } = useSearchCommand();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebar-collapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      spotlightRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
        return;
      }
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;
      const route = keyNavRoutes[e.key];
      if (route) {
        e.preventDefault();
        navigate(route);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, toggle]);

  return (
    <div
      className="flex relative"
      style={{ color: "var(--text-base)" }}
    >
      {/* Cursor spotlight overlay */}
      <div ref={spotlightRef} className="cursor-spotlight" aria-hidden="true" />

      {/* Atmospheric background glows — theme-specific large radial orbs */}
      <BackgroundGlows />

      {/* Sidebar */}
      <div
        className={`hidden lg:block ${collapsed ? "w-20" : "w-64"} h-screen fixed bg-primary px-2 pt-6 border-r border-neutral-700 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800 overflow-y-auto overflow-x-hidden z-10 transition-[width] duration-300 ease-in-out`}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Sidebar collapse toggle — straddles the sidebar's right border */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{ left: (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH) - 12 }}
        className="hidden lg:flex items-center justify-center fixed top-10 w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-500 hover:text-[var(--accent-1,#38bdf8)] hover:border-[var(--accent-1,#38bdf8)]/40 hover:bg-neutral-700 transition-[left,color,background-color,border-color] duration-300 ease-in-out z-20 cursor-pointer"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Mobile header */}
      <header className="absolute left-0 top-0 lg:hidden w-full py-4 z-[9999] bg-primary border-b border-neutral-700">
        <Header />
      </header>

      {/* Mobile bottom nav */}
      <div className="absolute left-0 bottom-0 lg:hidden w-full py-2 md:py-3 z-[9999] bg-primary border-t border-neutral-700">
        <NavigationMobile />
      </div>

      {/* Main content */}
      <div
        className={`flex-1 relative bg-neutral-900 ${collapsed ? "lg:ml-20" : "lg:ml-64"} pt-8 lg:pt-0 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800 z-[2] transition-[margin] duration-300 ease-in-out`}
      >
        <main className="w-[90%] pb-32 lg:pb-0 max-w-4xl mx-auto mt-22 flex flex-col justify-between min-h-[93vh]">
          <Outlet />
          <footer className="hidden lg:block w-full max-w-6xl mx-auto mt-10 py-6 bg-primary border border-neutral-700 text-sm">
            <Footer />
          </footer>
        </main>
      </div>

      <SearchCommand />
      <ThemeDrawer />
      {/* <PeekingCat /> */}
    </div>
  );
};

export default DashboardLayout;
