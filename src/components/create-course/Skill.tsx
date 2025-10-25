import { useAppDispatch } from "@/lib/hooks";
import { deleteSkill, editSkill } from "@/lib/slices/create-course-slice";
import { MdDelete } from "react-icons/md";
import { Skill as TSkill } from "@/types/create-course";
import Input from "../common/Input";

type Props = {
  skill: TSkill;
};
const Skill = ({ skill }: Props) => {
  const dispatch = useAppDispatch();
  function handleDeletePreriquisite(id: number) {
    dispatch(deleteSkill(id));
  }
  return (
    <div className="grid grid-cols-[1fr_10fr_1fr]">
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
        onClick={() => handleDeletePreriquisite(skill.id)}
        className="text-red-500 m-auto text-lg"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default Skill;
