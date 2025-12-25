"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleConfirmationForm } from "@/lib/slices/confirmation-form-slice";
import { AnimatePresence } from "framer-motion";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
type Props = {
  warning?: string;
  description?: string;
  onYes?: () => void;
};
const ConfirmationForm = ({ warning, onYes, description }: Props) => {
  const isOpen = useAppSelector((store) => store.ConfirmationForm.isOpen);
  const dispatch = useAppDispatch();
  function handleNo() {
    dispatch(toggleConfirmationForm(false));
  }
  function handleYes() {
    onYes?.();
    dispatch(toggleConfirmationForm(false));
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Dialog
            open={isOpen}
            onOpenChange={(open) => dispatch(toggleConfirmationForm(open))}
          >
            <DialogContent asChild className="w-1/2 p-6">
              <div className="flex flex-col gap-4">
                <section>
                  <DialogTitle className="text-center text-lg font-bold">
                    {warning}
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    {description}
                  </DialogDescription>
                </section>

                <section className="flex justify-between items-end">
                  <button
                    onClick={handleNo}
                    className="px-3 py-2 text-success ring-1 ring-success hover:bg-success hover:text-success-foreground text-sm hover:scale-95 duration-500 focus:scale-95 rounded-sm"
                  >
                    No
                  </button>
                  <button
                    onClick={handleYes}
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
