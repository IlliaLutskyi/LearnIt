"use client";
import MultiForm from "@/components/courseForm/MultiForm";
import { useAppDispatch } from "@/lib/hooks";
import { loadFromLocalStorage } from "@/lib/slices/CreateCourseSlice";
import { useEffect } from "react";
export default function CreateCourse() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, []);
  return (
    <>
      <MultiForm />
    </>
  );
}
