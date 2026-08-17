import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  selected: string;
  options: string[];
  onSelect: (option: string) => void;
}

export default function Dropdown({
  selected,
  options,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef} onClick={(e)=>e.preventDefault()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-gray-400 cursor-pointer hover:text-gray-200 flex items-center gap-1"
      >
        {selected} <span>{isOpen ? "⌃" : "⌄"}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 w-40 bg-[#2f2f2f] border border-gray-700 rounded-lg shadow-xl z-50 overflow-y-auto max-h-[500px]">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#424242] transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
