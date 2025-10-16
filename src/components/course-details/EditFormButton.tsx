"use client";
import { useAppDispatch } from "@/lib/hooks";
import { toggleEditCourseDetailForm } from "@/lib/slices/edit-course-detail-form-slice";
import { DbUser } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  author: DbUser;
};
const EditFormButton = ({ author }: Props) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  if (
    !session?.user ||
    status !== "authenticated" ||
    author.id !== session.user.id
  )
    return null;
  function handleFormOpening() {
    dispatch(toggleEditCourseDetailForm(true));
  }
  return (
    <button
      className="text-xs text-purple-400 hover:text-purple-600"
      id="edit_form_anchor"
      onClick={handleFormOpening}
    >
      Edit page
    </button>
  );
};

export default EditFormButton;
