import type { ChatSession } from "../types";

export const createChatSession = (
  title: string = "Nuevo chat",
): ChatSession => ({
  id: crypto.randomUUID(),
  title: title,
  messages: [
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Cuéntanos un poco sobre ti, tus habilidades y qué tipo de vacante te interesa.",
      timestamp: new Date().toISOString(),
      model: "gpt-5-nano",
    },
  ],
  updatedAt: new Date().toISOString(),
});
