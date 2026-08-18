import { useState, useEffect } from "react";
import type { ChatSession } from "../types";
import { createChatSession } from "../utils/create-chat-session";

export function useChatSession() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    try {
      const savedChats = localStorage.getItem("chats");
      if (savedChats) {
        const parsed = JSON.parse(savedChats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("LocalStorage error: ", error);
    }
    return [createChatSession()];
  });

  useEffect(() => {
    const savedChat = localStorage.getItem("chat");
    const currentChatSession = chatSessions.filter(
      (chatSession) => chatSession.id === savedChat,
    );
    if (
      (savedChat &&
        currentChatSession.length > 0 &&
        currentChatSession[0].messages.length > 1) ||
      chatSessions.at(0)?.id === currentChatSession[0]?.id
    )
      return;
    else localStorage.setItem("chat", chatSessions.at(0)?.id ?? "");
  }, []);

  useEffect(() => {
    if (chatSessions.length === 0) {
      const newChatSession = createChatSession();
      setChatSessions([newChatSession]);
      localStorage.setItem("chat", newChatSession.id);
    }
    try {
      localStorage.setItem("chats", JSON.stringify(chatSessions));
    } catch (error) {
      console.error("Localstorage error:", error);
    }
  }, [chatSessions]);

  return [chatSessions, setChatSessions] as const;
}
