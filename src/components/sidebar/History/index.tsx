import { useState, useRef, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Ellipsis, CirclePlus, Trash2 } from "lucide-react";
import type { ChatSession } from "../../../types";

export interface HistoryProps {
  chatSession: ChatSession;
  chatSessions: ChatSession[];
  setChatSession: Dispatch<SetStateAction<ChatSession>>;
  setChatSessions: Dispatch<SetStateAction<ChatSession[]>>;
}

export default function History({
  chatSession,
  chatSessions,
  setChatSession,
  setChatSessions,
}: HistoryProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const selectChatSession = (chat: ChatSession) => {
    localStorage.setItem("chat", chat.id);
    setChatSession(chat);
    setActiveMenuId(null);
  };
  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    const updatedSessions = chatSessions.filter((chat) => chat.id !== chatId);
    setChatSessions(updatedSessions);
    // Drop current chat
    if (chatSession?.id === chatId && updatedSessions.length > 0) {
      setChatSession(updatedSessions[0]);
      localStorage.setItem("chat", updatedSessions[0].id);
    }
    setActiveMenuId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto mt-6 px-3">
      <div className="text-xs text-gray-500 mb-2 px-2 flex justify-between">
        <span>Carpetas</span>
        <CirclePlus className="w-4 h-4 cursor-pointer hover:text-gray-300 transition-colors" />
      </div>
      <div className="text-xs text-gray-500 mb-2 px-2 mt-4">
        Recomendaciones laborales
      </div>
      {chatSessions.map((chat) => {
        const isCurrentActive = chatSession?.id === chat.id;
        const isMenuOpen = activeMenuId === chat.id;
        return (
          <div
            key={chat.id}
            onClick={() => selectChatSession(chat)}
            className={`group relative p-2 my-1 ${
              isCurrentActive
                ? "bg-[#2f2f2f]"
                : "bg-[#171717] hover:bg-[#212121]"
            } rounded-lg text-sm cursor-pointer flex justify-between items-center text-gray-200 transition-colors`}
          >
            <span className="block max-w-[160px] truncate">{chat.title}</span>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenuId(isMenuOpen ? null : chat.id);
              }}
              className="p-1 rounded hover:bg-black/20 text-gray-400 hover:text-gray-200"
            >
              <Ellipsis className="w-4 h-4" />
            </div>
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute right-2 top-10 w-36 bg-[#212121] border border-gray-700/60 rounded-xl shadow-xl py-1.5 z-50 text-xs hover:bg-red-500/10"
              >
                <button
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                  className="w-full px-3 py-2 text-left flex items-center gap-2 text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar chat</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
