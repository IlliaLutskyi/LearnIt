import { useAppDispatch } from "@/lib/hooks";
import { deleteSkill, editSkill } from "@/lib/slices/CreateCourseSlice";
import InputField from "../common/InputField";
import { MdDelete } from "react-icons/md";

type Props = {
  id: number;
  content: string;
};
const Skill = ({ id, content }: Props) => {
  const dispatch = useAppDispatch();
  function handleDeletePreriquisite(id: number) {
    dispatch(deleteSkill(id));
  }
  return (
    <div className="grid grid-cols-[1fr_10fr_1fr]">
      <span className="m-auto">.</span>
      <InputField
        multiline
        value={content}
        inputClassName="w-full outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-md h-[4rem] resize-none"
        onChange={(e) =>
          dispatch(
            editSkill({
              id: id,
              content: e.target.value,
            })
          )
        }
      />
      <button
        onClick={() => handleDeletePreriquisite(id)}
        className="text-red-500 m-auto text-lg"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default Skill;
