import { useState, useRef, useEffect } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import type { Message } from "../../../types/chat";
import Header from "../../chat/Header";
import type { HeaderProps } from "../../chat/Header";
import MessageList from "../../chat/MessageList";
import type { MessageListProps } from "../../chat/MessageList";
import Input from "../../chat/Input";
import type { InputPŕops } from "../../chat/Input";

interface ChatProps extends HeaderProps {}

export default function Chat({ onOpenSidebar, onOpenSettings }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hola, ¿cómo puedo ayudarte hoy?",
      timestamp: new Date().toISOString(),
      model: "gpt-5-nano",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-5-nano");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleInputResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSendMessage = async (
    e?: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Show user message
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Backend request
    setTimeout(() => {
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Esta es una respuesta simulada del backend para: "${newUserMsg.content}".`,
        timestamp: new Date().toISOString(),
        model: selectedModel,
      };
      setMessages((prev) => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500); // 1.5 seconds as response simulation
  };

  const headerProps: HeaderProps = {
    onOpenSidebar,
    onOpenSettings,
  };

  const messageListProps: MessageListProps = {
    messages,
    isTyping,
    messagesEndRef,
  };

  const inputProps: InputPŕops = {
    handleSendMessage,
    textareaRef,
    input,
    handleInputResize,
    selectedModel,
    setSelectedModel,
    isTyping,
  };

  return (
    <main className="flex-1 flex flex-col relative h-full">
      <Header {...headerProps} />
      <MessageList {...messageListProps} />
      <Input {...inputProps} />
    </main>
  );
}
