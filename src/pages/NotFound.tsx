import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 lg:py-28 space-y-5">
      <div className="p-4 rounded-full bg-neutral-800 border border-neutral-700">
        <Compass size={32} className="text-neutral-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-5xl font-semibold tracking-wide leading-tight">
          404 — Page not found
        </h1>
        <p className="text-neutral-400/90 text-base lg:text-lg max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>
      <Link
        to="/"
        className="rounded bg-neutral-800 px-5 py-2 border border-neutral-700 hover:bg-neutral-800/70 hover:opacity-80 duration-300 font-semibold text-sm"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
