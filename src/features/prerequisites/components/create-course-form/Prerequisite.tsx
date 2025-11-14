import { useAppDispatch } from "@/lib/hooks";
import { MdDelete } from "react-icons/md";
import {
  deletePrerequite,
  editPrerequite,
} from "@/lib/slices/create-course-slice";
import type { Prerequisite } from "@/types/create-course";
import { Input } from "@/components/common";
import { motion, useAnimation } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
import { useEffect } from "react";
type Props = {
  prerequisite: Prerequisite;
};
const Prerequisite = ({ prerequisite }: Props) => {
  const controlls = useAnimation();
  const dispatch = useAppDispatch();

  function handleDeletePreriquisite(id: number) {
    dispatch(deletePrerequite(id));
  }
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
        type="text"
        multiline
        value={prerequisite.content}
        className="w-full outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
        onChange={(e) =>
          dispatch(
            editPrerequite({
              id: prerequisite.id,
              content: e.target.value,
            })
          )
        }
      />
      <button
        type="button"
        onClick={async () => {
          await controlls.start("exit");
          handleDeletePreriquisite(prerequisite.id);
        }}
        className="text-red-500 m-auto text-lg"
      >
        <MdDelete />
      </button>
    </motion.div>
  );
};

export default Prerequisite;
