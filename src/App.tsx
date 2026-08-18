import { useState, useEffect } from "react";
import Sidebar, { type SidebarProps } from "./components/layout/Sidebar";
import Chat from "./components/layout/Chat";
import Settings from "./components/modals/Settings";
import { useChatSession } from "./hooks/use-chat";
import type { ChatSession } from "./types";

export default function App() {
  const selectChatSession = (): ChatSession => {
    const selectedChatSession: ChatSession[] = chatSessions.filter(
      (chatSession: ChatSession) =>
        chatSession.id === localStorage.getItem("chat"),
    );
    return selectedChatSession[0];
  };
  const [chatSessions, setChatSessions] = useChatSession();
  const [chatSession, setChatSession] =
    useState<ChatSession>(selectChatSession());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const sidebarProps: SidebarProps = {
    chatSession,
    chatSessions,
    setChatSession,
    setChatSessions,
    onCloseMobile: () => setIsSidebarOpen(false),
  };
  const chatProps = {
    title: chatSession?.title,
    chatSession,
    chatSessions,
    setChatSessions,
    onOpenSidebar: () => setIsSidebarOpen(true),
    onOpenSettings: () => setIsSettingsOpen(true),
  };
  const settingsProps = {
    isOpen: isSettingsOpen,
    onClose: () => setIsSettingsOpen(false),
  };

  useEffect(() => setChatSession(selectChatSession()), [chatSessions]);

  return (
    <div className="flex h-screen w-full bg-[#212121] text-gray-200 font-sans overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar {...sidebarProps} />
      </div>
      <Chat {...chatProps} />
      <Settings {...settingsProps} />
    </div>
  );
}
