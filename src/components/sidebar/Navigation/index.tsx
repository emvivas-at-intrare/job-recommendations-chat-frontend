import { Plus, Search, NotebookText, FolderBookmark } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="flex flex-col gap-1 px-3 mt-4 text-sm text-gray-300">
      <a
        href="#"
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
