import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Chat from "./components/layout/Chat";
import Settings from "./components/modals/Settings";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const sidebarProps = {
    onCloseMobile: () => setIsSidebarOpen(false),
  };
  const chatProps = {
    onOpenSidebar: () => setIsSidebarOpen(true),
    onOpenSettings: () => setIsSettingsOpen(true),
  };
  const settingsProps = {
    isOpen: isSettingsOpen,
    onClose: () => setIsSettingsOpen(false),
  };

  return (
    <div className="flex h-screen w-full bg-[#212121] text-gray-200 font-sans overflow-hidden">
      {/* Dark overlay for smartphone resolution */}
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
