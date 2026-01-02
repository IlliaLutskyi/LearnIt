"use client";
import { AnimatePresence } from "framer-motion";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
  description?: string;
  onYes?: () => Promise<void>;
};
const ConfirmationForm = ({
  message,
  onYes,
  description,
  setIsOpen,
  isOpen,
}: Props) => {
  async function handleYes() {
    await onYes?.();

    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent asChild className="w-1/2 p-6">
              <div className="flex flex-col gap-4">
                <section>
                  <DialogTitle className="text-center text-lg font-bold">
                    {message}
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    {description}
                  </DialogDescription>
                </section>

                <section className="flex justify-between items-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-success ring-1 ring-success hover:bg-success hover:text-success-foreground text-sm hover:scale-95 duration-500 focus:scale-95 rounded-sm"
                  >
                    No
                  </button>
                  <button
                    onClick={() => handleYes()}
                    className="px-3 py-2 text-success-foreground text-sm ring-1 ring-ring-seccess hover:bg-error hover:text-error-foreground hover:scale-95 duration-500 focus:scale-95 rounded-sm"
                  >
                    Yes
                  </button>
                </section>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationForm;
