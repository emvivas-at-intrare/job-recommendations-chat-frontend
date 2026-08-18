import { useState, useRef, useEffect } from "react";
import type { Dispatch } from "react";
import type { ChatSession } from "../../../types";
import { User, Trash2 } from "lucide-react";

export interface AccountProps {
  setChatSessions: Dispatch<React.SetStateAction<ChatSession[]>>;
}

export default function Account({ setChatSessions }: AccountProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleResetSession = () => {
    localStorage.clear();
    setChatSessions([]);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 border-t border-[#2f2f2f] flex items-center gap-2 text-sm cursor-pointer hover:bg-[#2f2f2f] transition-colors"
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold">
          <User />
        </div>
        <span className="truncate">user</span>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-16 left-4 right-4 bg-[#212121] border border-gray-700/60 rounded-xl shadow-xl py-1.5 z-50 text-xs hover:bg-red-500/10"
        >
          <button
            onClick={handleResetSession}
            className="w-full px-3 py-2 text-left flex items-center gap-2 text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Resetear sesión</span>
          </button>
        </div>
      )}
    </div>
  );
}
