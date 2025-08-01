import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavigationMobile from "../components/NavigationMobile";
import { useEffect } from "react";
import { keyNavRoutes } from "../config/KeyNavConfig";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      console.log(e.key);
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
  }, [navigate]);

  return (
    <div
      className="flex relative text-white/90 selection:bg-sky-900 selection:text-white 
"
    >
      <div className="hidden lg:block w-64 h-screen fixed bg-primary px-2 pt-8 border-r-1 border-r-neutral-800 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 overflow-y-auto">
        <Sidebar />
      </div>
      <header className="absolute left-0 top-0 lg:hidden w-full py-4 z-[9999] bg-neutral-900 border-b border-neutral-800">
        <Header />
      </header>
      <div className="absolute left-0 bottom-0 lg:hidden w-full py-2 md:py-3 z-[9999] bg-primary border-t border-neutral-800">
        <NavigationMobile />
      </div>
      <div className="flex-1 relative bg-neutral-900 lg:ml-64 pt-8 lg:pt-0 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900">
        <main className="w-[90%] pb-32 lg:pb-0 max-w-4xl mx-auto mt-22 flex flex-col justify-between min-h-[93vh]">
          <Outlet />
          <footer className="hidden lg:block w-full max-w-6xl mx-auto mt-10 py-6 bg-primary border border-neutral-800 text-sm">
            <Footer />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
