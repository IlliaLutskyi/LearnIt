import { useAppDispatch } from "@/lib/hooks";
import React from "react";
import { MdDelete } from "react-icons/md";
import InputField from "../common/InputField";
import {
  deletePreriquite,
  editPreriquite,
} from "@/lib/slices/CreateCourseSlice";
type Props = {
  id: number;
  content: string;
};
const Preriquisit = ({ content, id }: Props) => {
  const dispatch = useAppDispatch();
  function handleDeletePreriquisite(id: number) {
    dispatch(deletePreriquite(id));
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
            editPreriquite({
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

export default Preriquisit;
