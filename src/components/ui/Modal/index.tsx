import type { ReactNode } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | undefined;
  children?: ReactNode | undefined;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#212121] rounded-2xl w-full max-w-md border border-[#2f2f2f] shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-[#2f2f2f]">
          {title && (
            <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl leading-none"
          >
            <X className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
        {children && <div className="p-4 text-gray-300">{children}</div>}
      </div>
    </div>
  );
}
