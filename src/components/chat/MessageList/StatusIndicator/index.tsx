import { BotMessageSquare } from "lucide-react";

export default function StatusIndicator() {
  return (
    <div className="flex justify-start gap-4 max-w-3xl animate-pulse">
      <div className="w-8 h-8 bg-white text-black rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs mt-1">
        <BotMessageSquare />
      </div>
      <div className="text-sm text-gray-400 mt-2">Generando respuesta...</div>
    </div>
  );
}
