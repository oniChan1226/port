import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavigationMobile from "../components/NavigationMobile";
import { useCallback, useEffect, useRef } from "react";
import { keyNavRoutes } from "../config/KeyNavConfig";
import SearchCommand from "../components/SearchCommand";
import { useSearchCommand } from "../context/SearchCommandContext";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { toggle } = useSearchCommand();
  const spotlightRef = useRef<HTMLDivElement>(null);

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
    <div className="flex relative text-white/90 selection:bg-sky-900 selection:text-white">
      {/* Cursor spotlight overlay */}
      <div ref={spotlightRef} className="cursor-spotlight" aria-hidden="true" />

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="ambient-blob-1 absolute top-[-10%] left-[10%] w-80 h-80 rounded-full bg-sky-900/10 blur-3xl" />
        <div className="ambient-blob-2 absolute top-[40%] right-[5%] w-72 h-72 rounded-full bg-indigo-900/10 blur-3xl" />
        <div className="ambient-blob-3 absolute bottom-[10%] left-[30%] w-64 h-64 rounded-full bg-violet-900/8 blur-3xl" />
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block w-64 h-screen fixed bg-primary px-2 pt-8 border-r-1 border-r-neutral-800 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 overflow-y-auto z-10">
        <Sidebar />
      </div>

      {/* Mobile header */}
      <header className="absolute left-0 top-0 lg:hidden w-full py-4 z-[9999] bg-neutral-900 border-b border-neutral-800">
        <Header />
      </header>

      {/* Mobile bottom nav */}
      <div className="absolute left-0 bottom-0 lg:hidden w-full py-2 md:py-3 z-[9999] bg-primary border-t border-neutral-800">
        <NavigationMobile />
      </div>

      {/* Main content */}
      <div className="flex-1 relative bg-neutral-900 lg:ml-64 pt-8 lg:pt-0 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 z-[2]">
        <main className="w-[90%] pb-32 lg:pb-0 max-w-4xl mx-auto mt-22 flex flex-col justify-between min-h-[93vh]">
          <Outlet />
          <footer className="hidden lg:block w-full max-w-6xl mx-auto mt-10 py-6 bg-primary border border-neutral-800 text-sm">
            <Footer />
          </footer>
        </main>
      </div>

      <SearchCommand />
    </div>
  );
};

export default DashboardLayout;
