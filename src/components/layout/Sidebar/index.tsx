import Header from "../../sidebar/Header";
import Navigation from "../../sidebar/Navigation";
import History from "../../sidebar/History";
import Account from "../../sidebar/Account";
import { X } from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-[#171717] flex-shrink-0 flex flex-col border-r border-[#2f2f2f]">
      <div className="md:hidden flex justify-end p-2">
        <button
          onClick={onCloseMobile}
          className="text-gray-400 hover:text-white text-xl p-2"
        >
          <X className="w-4 h-4 cursor-pointer" />
        </button>
      </div>
      <Header />
      <Navigation />
      <History />
      <Account />
    </aside>
  );
}
