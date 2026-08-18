import { useState, useRef, useEffect } from "react";
import type {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import type { Message, ChatResponseDTO, ChatSession } from "../../../types";
import API from "../../../services/API";
import Header from "../../chat/Header";
import type { HeaderProps } from "../../chat/Header";
import MessageStack from "../../chat/Message/Stack";
import type { MessageStackProps } from "../../chat/Message/Stack";
import Input from "../../chat/Input";
import type { InputProps } from "../../chat/Input";

interface ChatProps extends HeaderProps {
  chatSession: ChatSession;
  setChatSessions: Dispatch<SetStateAction<ChatSession[]>>;
}

export default function Chat({
  chatSession,
  setChatSessions,
  onOpenSidebar,
  onOpenSettings,
}: ChatProps) {
  if (!chatSession)
    return (
      <main className="flex-1 flex flex-col items-center justify-center h-full text-gray-500">
        <p>Selecciona un chat para comenzar</p>
      </main>
    );

  const [messages, setMessages] = useState<Message[]>(chatSession.messages);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-5-nano");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (chatSession) {
      setMessages(chatSession.messages);
    }
  }, [chatSession?.id]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Update messages
  const updateGlobalChatSessions = (newMessages: Message[]) => {
    if (!chatSession) return;
    const updatedCurrentSession: ChatSession = {
      ...{
        ...chatSession,
        title:
          newMessages.at(-1)?.candidateData?.skills.join(", ") ||
          chatSession.title,
      },
      messages: newMessages,
    };
    setChatSessions((prevSessions) => {
      const filteredSessions = prevSessions.filter(
        (s) => s.id !== chatSession.id,
      );
      return [updatedCurrentSession, ...filteredSessions];
    });
  };

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
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: sanitizedInput,
      timestamp: new Date().toISOString(),
    };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    updateGlobalChatSessions(updatedMessages);
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
      const data: ChatResponseDTO = response.data;
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        recommendations: data.recommendations,
        candidateData: data.candidateData,
        timestamp: new Date().toISOString(),
        model: selectedModel,
      };
      const finalMessages = [...updatedMessages, newAiMsg];
      setMessages(finalMessages);
      updateGlobalChatSessions(finalMessages);
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
      const finalMessages = [...updatedMessages, errorMsg];
      setMessages(finalMessages);
      updateGlobalChatSessions(finalMessages);
    } finally {
      setIsTyping(false);
    }
  };
  const headerProps: HeaderProps = {
    onOpenSidebar,
    onOpenSettings,
    title: chatSession?.title,
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
