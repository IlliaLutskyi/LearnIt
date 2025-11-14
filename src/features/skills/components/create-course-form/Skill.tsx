import { useAppDispatch } from "@/lib/hooks";
import { deleteSkill, editSkill } from "@/lib/slices/create-course-slice";
import { MdDelete } from "react-icons/md";
import { Skill as TSkill } from "@/types/create-course";
import { Input } from "@/components/common";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
type Props = {
  skill: TSkill;
};
const Skill = ({ skill }: Props) => {
  const controlls = useAnimation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function inView() {
      await controlls.start("visible");
    }
    inView();
  }, []);
  function handleDeletePreriquisite(id: number) {
    dispatch(deleteSkill(id));
  }
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
        value={skill.content}
        className="w-full outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
        onChange={(e) =>
          dispatch(
            editSkill({
              id: skill.id,
              content: e.target.value,
            })
          )
        }
      />
      <button
        type="button"
        onClick={async () => {
          await controlls.start("exit");
          handleDeletePreriquisite(skill.id);
        }}
        className="text-red-500 m-auto text-lg"
      >
        <MdDelete />
      </button>
    </motion.div>
  );
};

export default Skill;
