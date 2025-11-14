"use client";
import { formEmergenceVariants } from "@/features/animations/form-emergence";
import BlurBackground from "./BlurBackground";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleConfirmationForm } from "@/lib/slices/confirmation-form-slice";
import { AnimatePresence, motion } from "framer-motion";
type Props = {
  warning?: string;
  onYes?: () => void;
};
const ConfirmationForm = ({ warning, onYes }: Props) => {
  const isOpen = useAppSelector((store) => store.ConfirmationForm.isOpen);
  const dispatch = useAppDispatch();
  function handleClose() {
    dispatch(toggleConfirmationForm(false));
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <BlurBackground />
          <motion.div
            variants={formEmergenceVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-6 absolute top-[40%] left-1/2 translate-x-[-50%] translate-y-[-50%] min-h-[200px] p-10 w-1/2 bg-white rounded-sm"
          >
            <h1 className="grow text-lg text-center font-medium">{warning}</h1>
            <section className="flex justify-between items-end">
              <button
                onClick={handleClose}
                className="px-3 py-2 text-red-500 border-[1px] border-red-600  hover:bg-red-400 hover:text-white text-sm hover:scale-95 duration-500 focus:scale-95 rounded-sm"
              >
                No
              </button>
              <button
                onClick={onYes}
                className="px-3 py-2 text-green-500 text-sm border-[1px] border-green-600 hover:bg-green-400 hover:text-white hover:scale-95 duration-500 focus:scale-95 rounded-sm"
              >
                Yes
              </button>
            </section>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationForm;
