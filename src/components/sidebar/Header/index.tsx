import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <a
      href="https://github.com/intrare-team/fs-challenge"
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 flex items-center justify-between hover:bg-[#2f2f2f] cursor-pointer rounded-lg mx-2 mt-2 transition-colors block"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold">
          <Sparkles />
        </div>
        <span className="font-semibold text-sm">fs-challenge</span>
      </div>
    </a>
  );
}
