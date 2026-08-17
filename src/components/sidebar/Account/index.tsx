import { User } from "lucide-react";

export default function Account() {
  return (
    <div className="p-4 border-t border-[#2f2f2f] flex items-center gap-2 text-sm cursor-pointer hover:bg-[#2f2f2f] transition-colors">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold">
        <User />
      </div>
      <span>user</span>
    </div>
  );
}
