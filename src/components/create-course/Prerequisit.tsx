import { useAppDispatch } from "@/lib/hooks";
import React from "react";
import { MdDelete } from "react-icons/md";
import InputField from "../common/InputField";
import {
  deletePrerequite,
  editPrerequite,
} from "@/lib/slices/CreateCourseSlice";
import { Prerequisite } from "@/types/create-course";
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
      <InputField
        multiline
        value={prerequisite.content}
        inputClassName="w-full outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-md h-[4rem] resize-none"
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
