"use client";

import { useAppDispatch } from "@/lib/hooks";
import { toggleEditCourseContentForm } from "@/lib/slices/edit-course-content-form-slice";

const EditButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(toggleEditCourseContentForm())}
      className="self-end text-xs text-purple-500 hover:text-purple-700"
    >
      Edit Page
    </button>
  );
};

export default EditButton;
