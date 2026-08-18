import { useState } from "react";
import Modal, { type ModalProps } from "../../ui/Modal";

export interface SettingsProps extends ModalProps {
  title?: string | undefined;
}

export default function Settings({ isOpen, onClose, title }: SettingsProps) {
  type ThemeOptions = "light" | "dark";
  const [systemPrompt, setSystemPrompt] = useState<string>(
    localStorage.getItem("system-prompt") ||
      "Eres un reclutador técnico experto. Mantén una conversación fluida, amigable y empática.",
  );
  const [theme, setTheme] = useState<ThemeOptions>(
    (localStorage.getItem("theme") as ThemeOptions) || "light",
  );
  const saveSettings = () => {
    localStorage.setItem("system-prompt", systemPrompt);
    localStorage.setItem("theme", theme);
    onClose();
  };
  const modalProps: ModalProps = {
    isOpen,
    onClose,
    title: title ?? "Configuración",
  };

  return (
    <Modal {...modalProps}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tema</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeOptions)}
            className="w-full bg-[#171717] border border-[#2f2f2f] rounded-lg p-2 outline-none"
          >
            <option value="light">Modo claro</option>
            <option value="dark">Modo oscuro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Prompt de sistema
          </label>
          <textarea
            className="w-full bg-[#171717] border border-[#2f2f2f] rounded-lg p-2 outline-none resize-none h-24"
            placeholder="Eres un asistente servicial..."
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </div>
        <button
          onClick={saveSettings}
          className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Guardar cambios
        </button>
      </div>
    </Modal>
  );
}
