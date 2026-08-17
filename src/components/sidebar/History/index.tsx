import { Ellipsis, CirclePlus } from "lucide-react";

export default function History() {
  return (
    <div className="flex-1 overflow-y-auto mt-6 px-3">
      <div className="text-xs text-gray-500 mb-2 px-2 flex justify-between">
        <span>Carpetas</span>
        <CirclePlus className="w-4 h-4 cursor-pointer" />
      </div>
      <div className="text-xs text-gray-500 mb-2 px-2 mt-4">Chats</div>
      <div className="text-xs text-gray-500 mb-2 px-2 mt-4">Hoy</div>
      <div className="p-2 bg-[#2f2f2f] rounded-lg text-sm truncate cursor-pointer flex justify-between items-center text-gray-200">
        <span>Recomendación laboral</span>
        <Ellipsis className="w-4 h-4" />
      </div>
    </div>
  );
}
