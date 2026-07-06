import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchCommand } from "../context/SearchCommandContext";
import { Boxes, Check, Copy, Moon, Search, Sun, X } from "lucide-react";
import { ExternalLinksData, NavlinksData } from "../data/NavLinksData";
import { myProjects } from "../data/ProjectsData";
import { myWorkEmail } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

type ResultType = "page" | "project" | "social" | "action";

interface ResultItem {
  id: string;
  type: ResultType;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  keywords?: string;
  run: (e?: React.MouseEvent) => void;
}

const TYPE_LABEL: Record<ResultType, string> = {
  page: "Pages",
  project: "Projects",
  social: "Social",
  action: "Actions",
};

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-sky-400 font-bold">{text.slice(i, i + query.length)}</span>
      {text.slice(i + query.length)}
    </>
  );
}

const SearchCommand = () => {
  const { isOpen, closeModal } = useSearchCommand();
  const { mode, toggleMode } = useTheme();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);
      setCopied(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeModal]);

  const navigateTo = useCallback(
    (link: string) => {
      closeModal();
      navigate(link);
    },
    [closeModal, navigate]
  );

  const copyEmail = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      await navigator.clipboard.writeText(myWorkEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  }, []);

  const items = useMemo<ResultItem[]>(() => {
    const pages: ResultItem[] = NavlinksData.flatMap((group) =>
      group.links.map((link) => ({
        id: `page-${link.href}`,
        type: "page" as const,
        label: link.label,
        icon: link.icon,
        run: () => navigateTo(link.href),
      }))
    );

    const projects: ResultItem[] = myProjects.map((p) => ({
      id: `project-${p.slug}`,
      type: "project" as const,
      label: p.title,
      sublabel: p.tag,
      keywords: p.description,
      icon: <Boxes size={17} />,
      run: () => navigateTo(`/projects/${p.slug}`),
    }));

    const social: ResultItem[] = ExternalLinksData.map((link) => ({
      id: `social-${link.href}`,
      type: "social" as const,
      label: link.label,
      sublabel: "Opens in new tab",
      icon: link.icon,
      run: () => {
        window.open(link.href, "_blank", "noopener,noreferrer");
        closeModal();
      },
    }));

    const actions: ResultItem[] = [
      {
        id: "action-theme",
        type: "action",
        label: mode === "dark" ? "Switch to light mode" : "Switch to dark mode",
        sublabel: "Toggle site theme",
        icon: mode === "dark" ? <Sun size={17} /> : <Moon size={17} />,
        run: (e) => {
          toggleMode(e ? { x: e.clientX, y: e.clientY } : undefined);
          closeModal();
        },
      },
      {
        id: "action-copy-email",
        type: "action",
        label: copied ? "Copied!" : "Copy email address",
        sublabel: myWorkEmail,
        icon: copied ? <Check size={17} className="text-green-400" /> : <Copy size={17} />,
        run: copyEmail,
      },
    ];

    return [...pages, ...projects, ...social, ...actions];
  }, [mode, copied, navigateTo, closeModal, toggleMode, copyEmail]);

  const isCommandMode = query.startsWith(">");
  const effectiveQuery = isCommandMode ? query.slice(1).trim() : query.trim();

  const filtered = useMemo(() => {
    const pool = isCommandMode ? items.filter((i) => i.type === "action") : items;
    if (!effectiveQuery) return pool;
    const q = effectiveQuery.toLowerCase();
    return pool.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.sublabel?.toLowerCase().includes(q) ||
        i.keywords?.toLowerCase().includes(q)
    );
  }, [items, isCommandMode, effectiveQuery]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selected]?.run();
    }
  };

  const groupOrder: ResultType[] = ["page", "project", "social", "action"];
  const groups = groupOrder
    .map((type) => ({ type, list: filtered.filter((i) => i.type === type) }))
    .filter((g) => g.list.length > 0);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="search-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[12vh]"
          onClick={() => closeModal()}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-neutral-900 p-3 rounded-lg w-full max-w-md lg:max-w-xl shadow-xl border border-neutral-700"
            style={{ color: "var(--text-base)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center text-sm">
              <Search size={20} className="text-neutral-500 flex-shrink-0" />
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search, or type > for actions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-2 outline-0 bg-transparent"
                style={{ color: "var(--text-base)" }}
                ref={inputRef}
              />
              {query && (
                <X
                  size={20}
                  onClick={() => setQuery("")}
                  className="text-neutral-500 hover:text-[var(--text-base)] transition-colors duration-300 cursor-pointer flex-shrink-0"
                />
              )}
            </div>

            <div
              ref={listRef}
              className="mt-2 pt-2 border-t border-neutral-700 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800 text-sm font-semibold"
            >
              {groups.length > 0 ? (
                groups.map((group) => (
                  <div key={group.type} className="mb-1 last:mb-0">
                    <p className="px-2 py-1 text-[0.65rem] font-bold tracking-[0.15em] text-neutral-600 uppercase">
                      {TYPE_LABEL[group.type]}
                    </p>
                    {group.list.map((item) => {
                      const globalIndex = filtered.indexOf(item);
                      const isSelected = globalIndex === selected;
                      return (
                        <div
                          key={item.id}
                          data-index={globalIndex}
                          onClick={(e) => item.run(e)}
                          onMouseEnter={() => setSelected(globalIndex)}
                          className={`list-none flex items-center justify-between gap-2 border px-2 py-2 rounded-md cursor-pointer duration-150 ${
                            isSelected
                              ? "bg-neutral-800 border-neutral-700"
                              : "border-transparent hover:bg-neutral-800/60 hover:border-neutral-700"
                          }`}
                          style={{ color: "var(--text-base)" }}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="flex-shrink-0 text-neutral-500">{item.icon}</span>
                            <p className="truncate">
                              <Highlight text={item.label} query={effectiveQuery} />
                            </p>
                          </div>
                          {item.sublabel && (
                            <span className="text-xs font-normal text-neutral-500 flex-shrink-0 truncate max-w-[40%]">
                              {item.sublabel}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 px-2 py-2 font-normal">No matching results.</p>
              )}
            </div>

            {/* Footer hint bar */}
            <div className="mt-2 pt-2 border-t border-neutral-800 flex items-center justify-between px-1 text-[0.65rem] text-neutral-500 font-normal">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">↑</kbd>
                  <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">↵</kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">esc</kbd>
                  close
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">&gt;</kbd>
                actions
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchCommand;
