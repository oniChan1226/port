import React, { useEffect, useRef, useState } from "react";
import { useSearchCommand } from "../context/SearchCommandContext";
import { Search, X } from "lucide-react";
import { NavlinksData } from "../data/NavLinksData";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const SearchCommand = () => {
  const { isOpen, closeModal } = useSearchCommand();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if(isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const clearText = () => setSearchQuery(() => "");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navigate = useNavigate();
  const navigateTo = (link: string) => {
    closeModal();
    navigate(link);
  };
  const filteredLinks = NavlinksData.flatMap((navLink) =>
    navLink.links.filter((link) =>
      link.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return (
    <AnimatePresence mode="wait">
      {isOpen && <motion.div
      key={"search-query"}
      initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-center justify-center"
        onClick={() => closeModal()}
      >
        <motion.div
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0
        }}
          className="bg-neutral-900 text-white p-3 rounded-lg w-full max-w-md lg:max-w-xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center text-sm mt-2">
            <Search size={20} className="text-neutral-400" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Type your command..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-2  outline-0"
              ref={inputRef}
            />
            {searchQuery && (
              <X
                size={20}
                onClick={clearText}
                className="text-neutral-500 hover:text-neutral-200 transition-colors duration-300 cursor-pointer"
              />
            )}
          </div>
          <div className="mt-2 pt-2 border-t border-t-neutral-700 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 text-sm font-semibold">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <div
                  onClick={() => navigateTo(link.href)}
                  key={link.href}
                  className="list-none flex items-center border border-transparent hover:border-neutral-700 px-2 py-2 rounded-md cursor-pointer duration-300 text-neutral-100 hover:text-neutral-300 space-x-2"
                >
                  {link.icon}
                  <p>{link.label}</p>
                </div>
              ))
            ) : (
              <p className="text-neutral-500 px-2">No matching results.</p>
            )}
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
};

export default SearchCommand;
