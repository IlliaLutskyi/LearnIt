"use client";
import { useAppDispatch } from "@/lib/hooks";
import { toggleEditCourseDetailForm } from "@/lib/slices/edit-course-detail-form-slice";
import React from "react";

const EditButton = () => {
  const dispatch = useAppDispatch();

  function handleFormOpening() {
    dispatch(toggleEditCourseDetailForm(true));
  }
  return (
    <button
      className="text-xs text-accent hover:text-secondary-accent duration-400"
      id="edit_form_anchor"
      onClick={handleFormOpening}
    >
      Edit page
    </button>
  );
};

export default EditButton;
