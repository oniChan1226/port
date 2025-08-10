import { Search } from "lucide-react";
import pfp from "../assets/pfp.png";
import { Link } from "react-router-dom";
import { useSearchCommand } from "../context/SearchCommandContext";

const Header = () => {
  const { toggle } = useSearchCommand();

  return (
    <div className="w-[94%] mx-auto flex justify-between items-center">
      {/* pfp */}
      <Link to={"/"} className="flex items-center gap-1">
        <img
          src={pfp}
          alt="image"
          className="w-10 h-10 rounded-full object-contain bg-black/50"
        />
        <div>
          <h2 className="text-md font-semibold leading-5 text-shadow-lg">Fahad Khan</h2>
          <h6 className="text-xs text-neutral-400">
            Software Engineer
          </h6>
        </div>
      </Link>
      {/* search */}
      <div 
      onClick={() => toggle()}
      className="p-3 rounded-lg bg-primary cursor-pointer">
        <Search size={20}/>
      </div>
    </div>
  )
}

export default Header