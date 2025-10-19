import { useAppDispatch } from "@/lib/hooks";
import { MdDelete } from "react-icons/md";
import {
  deletePrerequite,
  editPrerequite,
} from "@/lib/slices/create-course-slice";
import { Prerequisite } from "@/types/create-course";
import Input from "../common/Input";

type Props = {
  prerequisite: Prerequisite;
};
const Prerequisit = ({ prerequisite }: Props) => {
  const dispatch = useAppDispatch();

  function handleDeletePreriquisite(id: number) {
    dispatch(deletePrerequite(id));
  }
  return (
    <div className="grid grid-cols-[1fr_10fr_1fr]">
      <span className="m-auto">.</span>
      <Input
        type="text"
        multiline
        value={prerequisite.content}
        className="w-full outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm h-[4rem] resize-none"
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
        onClick={() => handleDeletePreriquisite(prerequisite.id)}
        className="text-red-500 m-auto text-lg"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default Prerequisit;
