import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div
      className="flex text-white/90 selection:bg-sky-900 selection:text-white
"
    >
      <div className="w-64 h-screen bg-primary px-2 pt-8 border-r-1 border-r-neutral-800">
        <Sidebar />
      </div>
      <div className="flex-1 bg-neutral-900">
        <div className="xl:w-[90%] w-[95%] max-w-7xl mx-auto my-22">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
