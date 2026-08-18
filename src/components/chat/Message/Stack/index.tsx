import type { RefObject } from "react";
import type { Message as MessageType } from "../../../../types";
import MessageCard from "../Card";
import type { MessageCardProps } from "../Card";
import StatusIndicator from "../StatusIndicator";

export interface MessageStackProps {
  messages: MessageType[];
  isTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export default function MessageStack({
  messages,
  isTyping,
  messagesEndRef,
}: MessageStackProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6">
      {messages.map((message) => {
        const messageCardProps: MessageCardProps = { message };
        return (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start gap-4 max-w-4xl"}`}
          >
            <MessageCard {...messageCardProps} />
          </div>
        );
      })}
      {isTyping && <StatusIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
