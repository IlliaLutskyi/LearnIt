import { MdDelete } from "react-icons/md";
import { Input } from "@/components/common";
import { motion, useAnimation } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
import { useEffect } from "react";
import {
  FieldValues,
  Path,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  index: number;
  remove: UseFieldArrayRemove;
  error?: string;
};
const Prerequisite = <T extends FieldValues>({
  register,
  index,
  remove,
  error,
}: Props<T>) => {
  const controls = useAnimation();

  useEffect(() => {
    async function inView() {
      await controls.start("visible");
    }
    inView();
  }, [controls]);
  return (
    <motion.div
      className="grid grid-cols-[1fr_10fr_1fr]"
      variants={fadeInOutWithShiftVariants}
      animate={controls}
      initial="hidden"
    >
      <span className="m-auto">.</span>
      <Input
        type="text"
        multiline
        className="input-field max-h-[5rem]"
        register={register}
        error={error}
        field={`prerequisites.${index}.content` as Path<T>}
      />
      <button
        type="button"
        onClick={async () => {
          await controls.start("exit");
          remove(index);
        }}
        className="text-error m-auto text-lg"
      >
        <MdDelete />
      </button>
    </motion.div>
  );
};

export default Prerequisite;
