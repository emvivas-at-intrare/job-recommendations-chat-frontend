import type { RefObject } from "react";
import Dropdown from "../../ui/Dropdown";
import type {
  SyntheticEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { CircleFadingPlus, SendHorizontal } from "lucide-react";

export interface InputPŕops {
  handleSendMessage: (
    e?: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => Promise<void>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  input: string;
  handleInputResize: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  selectedModel: string;
  setSelectedModel: Dispatch<SetStateAction<string>>;
  isTyping: boolean;
}

export default function Input({
  handleSendMessage,
  textareaRef,
  input,
  handleInputResize,
  selectedModel,
  setSelectedModel,
  isTyping,
}: InputPŕops) {
  const models: string[] = [
    "gpt-4-vision-preview",
    "gpt-4o-2024-05-13",
    "gpt-4o-mini-2024-07-18",
    "gpt-4o-2024-08-06",
    "o1-mini-2024-09-12",
    "gpt-4o-2024-11-20",
    "o1-2024-12-17",
    "gpt-4o-nano",
    "gpt-4o-mini",
    "gpt-4o",
    "o1-mini",
    "o1-preview",
    "o1",
    "gpt-4.1-nano",
    "gpt-4.1-mini",
    "gpt-4.1",
    "o3-mini",
    "o3",
    "gpt-5.3-codex",
    "gpt-5-nano",
    "gpt-5-mini",
    "gpt-5.4-nano",
    "gpt-5.4-mini",
    "gpt-5.4",
    "gpt-5.5",
    "gpt-realtime-2.1",
    "gpt-5.6-luna",
    "gpt-5.6-terra",
    "gpt-5.6-sol",
  ];
  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <form className="bg-[#2f2f2f] rounded-3xl p-2 flex flex-col gap-2 relative shadow-lg">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputResize}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="w-full bg-transparent text-sm p-3 outline-none resize-none max-h-32 min-h-[44px] overflow-y-auto"
          placeholder="Pregunta algo"
          rows={1}
        />
        <div className="flex justify-between items-center px-2 pb-1">
          <div className="flex items-center gap-2 text-gray-400">
            <label className="p-2 hover:bg-[#424242] rounded-full transition-colors cursor-pointer flex items-center justify-center">
              <CircleFadingPlus />
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log(file);
                  }
                }}
              />
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown
              selected={selectedModel}
              options={models}
              onSelect={setSelectedModel}
            />
            <button
              type="submit"
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isTyping}
              className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
