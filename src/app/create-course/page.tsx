"use client";
import MultiForm from "@/components/create-course/MultiForm";
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
