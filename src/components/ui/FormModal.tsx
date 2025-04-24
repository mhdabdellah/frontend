import { Dialog } from "@headlessui/react";

interface FormModalProps {
  title: string;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  modalClassName?: string;
}

export const FormModal = ({
  title,
  setOpen,
  children,
  modalClassName = "",
}: FormModalProps) => {
  return (
    <Dialog open={true} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={`w-full max-w-xl rounded-2xl bg-white p-6 ${modalClassName}`}
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close Modal"
            >
              <span className="text-xl">&times;</span>
            </button>
          </div>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
