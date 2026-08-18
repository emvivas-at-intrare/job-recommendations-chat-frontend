import { useState, useRef, useEffect } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import type { Message, ChatResponseDTO } from "../../../types";
import API from "../../../services/API";
import Header from "../../chat/Header";
import type { HeaderProps } from "../../chat/Header";
import MessageStack from "../../chat/Message/Stack";
import type { MessageStackProps } from "../../chat/Message/Stack";
import Input from "../../chat/Input";
import type { InputProps } from "../../chat/Input";

interface ChatProps extends HeaderProps {}

export default function Chat({ onOpenSidebar, onOpenSettings }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Cuéntanos un poco sobre ti, tus habilidades y qué tipo de vacante te interesa.",
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
    const sanitizedInput: string = input.trim();
    if (!sanitizedInput) return;

    // Show user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: sanitizedInput,
      timestamp: new Date().toISOString(),
    };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await API.post<ChatResponseDTO>("/candidate-chat", {
        model: selectedModel,
        systemPrompt: localStorage.getItem("system-prompt") || "",
        messages: updatedMessages.map(({ role, content, recommendations }) => ({
          role,
          content,
          recommendations,
        })),
      });
      const data = response.data;
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        recommendations: data.recommendations,
        timestamp: new Date().toISOString(),
        model: selectedModel,
      };
      setMessages((prev) => [...prev, newAiMsg]);
    } catch (error) {
      console.error("Error al comunicarse con el backend:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Lo siento, ocurrió un error al procesar tu mensaje con el servidor.",
        timestamp: new Date().toISOString(),
        model: selectedModel,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };
  const headerProps: HeaderProps = {
    onOpenSidebar,
    onOpenSettings,
  };
  const messageStackProps: MessageStackProps = {
    messages,
    isTyping,
    messagesEndRef,
  };
  const inputProps: InputProps = {
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
      <MessageStack {...messageStackProps} />
      <Input {...inputProps} />
    </main>
  );
}
