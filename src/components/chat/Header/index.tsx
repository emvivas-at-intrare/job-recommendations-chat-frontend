import { Menu, Settings } from "lucide-react";

export interface HeaderProps {
  onOpenSidebar: () => void;
  onOpenSettings: () => void;
  title: string | undefined;
}

export default function Header({
  onOpenSidebar,
  onOpenSettings,
  title = "Recomendación laboral",
}: HeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between px-4 text-sm border-b md:border-none border-[#2f2f2f]">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="md:hidden text-gray-400 hover:text-white text-xl cursor-pointer"
        >
          <Menu />
        </button>
        <span className="font-medium">{title}</span>
      </div>
      <button
        onClick={onOpenSettings}
        className="text-gray-400 hover:text-white cursor-pointer"
      >
        <Settings />
      </button>
    </header>
  );
}
