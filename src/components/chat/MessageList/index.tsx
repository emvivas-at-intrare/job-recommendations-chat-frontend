import type { RefObject } from "react";
import type { Message } from "../../../types/chat";
import StatusIndicator from "./StatusIndicator";
import { Bot } from "lucide-react";

export interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export default function MessageList({
  messages,
  isTyping,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start gap-4 max-w-3xl"}`}
        >
          {msg.role === "assistant" && (
            <div className="w-8 h-8 bg-white text-black rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs mt-1">
              <Bot />
            </div>
          )}
          <div
            className={
              msg.role === "user"
                ? "bg-[#2f2f2f] px-5 py-3 rounded-3xl max-w-[85%] md:max-w-2xl text-sm"
                : "flex flex-col gap-1 w-full"
            }
          >
            {msg.role === "assistant" && (
              <div className="text-xs text-gray-400 font-medium">
                {msg.model}
              </div>
            )}
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {msg.content}
            </div>
          </div>
        </div>
      ))}

      {isTyping && <StatusIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
