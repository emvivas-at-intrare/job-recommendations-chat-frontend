import type { Dispatch, SetStateAction } from "react";
import { Plus, Search, NotebookText, FolderBookmark } from "lucide-react";
import type { ChatSession } from "../../../types";
import { createChatSession } from "../../../utils/create-chat-session";

export interface NavigationsProps {
  chatSession: ChatSession;
  chatSessions: ChatSession[];
  setChatSessions: Dispatch<SetStateAction<ChatSession[]>>;
}

export default function Navigation({
  chatSession,
  chatSessions,
  setChatSessions,
}: NavigationsProps) {
  const createNewChatSession = () => {
    if (chatSession?.messages.length === 1) return;
    if (chatSessions.at(0)?.messages.length === 1) {
      localStorage.setItem("chat", chatSessions.at(0)?.id || "");
      setChatSessions([...chatSessions]);
      return;
    }
    const newChatSession: ChatSession = createChatSession(
      `Nuevo chat no. ${chatSessions.length + 1}`,
    );
    setChatSessions((chatSessions) => [newChatSession, ...chatSessions]);
    localStorage.setItem("chat", newChatSession.id);
  };
  return (
    <nav className="flex flex-col gap-1 px-3 mt-4 text-sm text-gray-300">
      <a
        href="#"
        onClick={createNewChatSession}
        className="flex items-center gap-2 p-2 hover:bg-[#2f2f2f] rounded-lg"
      >
        <Plus /> Nuevo Chat
      </a>
      <a
        href="#"
        className="flex items-center gap-2 p-2 hover:bg-[#2f2f2f] rounded-lg"
      >
        <Search /> Buscar
      </a>
      <a
        href="#"
        className="flex items-center gap-2 p-2 hover:bg-[#2f2f2f] rounded-lg"
      >
        <NotebookText /> Notas
      </a>
      <a
        href="#"
        className="flex items-center gap-2 p-2 hover:bg-[#2f2f2f] rounded-lg"
      >
        <FolderBookmark /> Espacio de trabajo
      </a>
    </nav>
  );
}
