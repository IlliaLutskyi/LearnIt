import { MdDelete } from "react-icons/md";
import { Input } from "@/components/common";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
import {
  FieldValues,
  Path,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
type Props<T extends FieldValues> = {
  index: number;
  register: UseFormRegister<T>;
  remove: UseFieldArrayRemove;
  error?: string;
};
const Skill = <T extends FieldValues>({
  index,
  register,
  remove,
  error,
}: Props<T>) => {
  const controlls = useAnimation();
  useEffect(() => {
    async function inView() {
      await controlls.start("visible");
    }
    inView();
  }, []);

  return (
    <motion.div
      className="grid grid-cols-[1fr_10fr_1fr]"
      variants={fadeInOutWithShiftVariants}
      animate={controlls}
      initial="hidden"
    >
      <span className="m-auto">.</span>
      <Input
        multiline
        className="w-full outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
        register={register}
        error={error}
        field={`skills.${index}.content` as Path<T>}
      />
      <button
        type="button"
        onClick={async () => {
          await controlls.start("exit");
          remove(index);
        }}
        className="text-red-500 m-auto text-lg"
      >
        <MdDelete />
      </button>
    </motion.div>
  );
};

export default Skill;
