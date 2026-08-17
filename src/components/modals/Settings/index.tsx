import Modal, { type ModalProps } from "../../ui/Modal";

export interface SettingsProps extends ModalProps {
  title?: string | undefined;
}

export default function Settings({ isOpen, onClose, title }: SettingsProps) {
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
          <select className="w-full bg-[#171717] border border-[#2f2f2f] rounded-lg p-2 outline-none">
            <option>Modo oscuro</option>
            <option>Modo claro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Prompt de sistema
          </label>
          <textarea
            className="w-full bg-[#171717] border border-[#2f2f2f] rounded-lg p-2 outline-none resize-none h-24"
            placeholder="Eres un asistente servicial..."
          />
        </div>
        <button
          onClick={onClose}
          className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Guardar cambios
        </button>
      </div>
    </Modal>
  );
}
