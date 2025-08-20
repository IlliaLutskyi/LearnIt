"use client";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { toast } from "sonner";
const SaveOrClearCourseButton = () => {
  const { title, description, sectionGroups, category } = useAppSelector(
    (state) => state.CreateCourse
  );
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("course")) setIsSaved(true);
  }, [localStorage.getItem("course")]);
  function handleClearStorage() {
    localStorage.setItem("course", "");
    setIsSaved(false);
    toast.success("All data was cleared :)", {
      duration: 5000,
    });
  }
  function handleSave() {
    const course = { title, description, sectionGroups, category };
    localStorage.setItem("course", JSON.stringify(course));
    setIsSaved(true);
    toast.success(
      "All data was saved and will be restored when you enter this page again, you can relax now :)",
      { duration: 5000 }
    );
  }
  return (
    <button
      className="self-end  bg-purple-500 text-white p-2 hover:scale-95 rounded-sm hover:bg-purple-700 duration-500 flex items-center gap-2"
      onClick={isSaved ? handleClearStorage : handleSave}
    >
      {!isSaved && <IoMdSave />}
      {isSaved ? "Clear storage" : "Save course for now"}
    </button>
  );
};

export default SaveOrClearCourseButton;
