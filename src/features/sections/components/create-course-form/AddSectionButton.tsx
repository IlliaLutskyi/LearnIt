"use client";
import { useAppDispatch } from "@/lib/hooks";
import { createSectionGroup } from "@/lib/slices/create-course-slice";
import React from "react";
import { FaPlus } from "react-icons/fa";
const AddSectionButton = () => {
  const dispatch = useAppDispatch();
  function handleAdd() {
    dispatch(createSectionGroup());
  }
  return (
    <button
      type="button"
      className="self-end flex items-center gap-4 bg-accent text-accent-foreground text-sm p-2 rounded-sm hover:scale-95 duration-400"
      onClick={handleAdd}
    >
      <FaPlus />
      <span>Add sectionGroup</span>
    </button>
  );
};

export default AddSectionButton;
