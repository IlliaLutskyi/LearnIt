"use client";
import { useAppDispatch } from "@/lib/hooks";
import { createSectionGroup } from "@/lib/slices/CreateCourseSlice";
import React from "react";
import { FaPlus } from "react-icons/fa";
const AddSectionButton = () => {
  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(createSectionGroup());
  }
  return (
    <button
      className="flex items-center gap-4 bg-purple-500 self-end text-white p-2 rounded-sm hover:bg-purple-700  hover:scale-95 focus:scale-95 duration-500"
      onClick={handleClick}
    >
      <FaPlus />
      <span>Add sectionGroup</span>
    </button>
  );
};

export default AddSectionButton;
