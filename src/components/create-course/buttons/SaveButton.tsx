"use client";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { toast } from "sonner";
const SaveContentButton = () => {
  const { sectionGroups } = useAppSelector((state) => state.CreateCourse);
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
    localStorage.setItem("sectionGroups", JSON.stringify(sectionGroups));
    setIsSaved(true);
    toast.success("All content was saved :)", { duration: 3000 });
  }
  return (
    <button
      className="self-end  bg-purple-500 text-white p-2 hover:scale-95 rounded-sm hover:bg-purple-700 duration-500 flex items-center gap-2"
      onClick={isSaved ? handleClearStorage : handleSave}
    >
      {!isSaved && <IoMdSave />}
      {isSaved ? "Clear storage" : "Save course"}
    </button>
  );
};

export default SaveContentButton;
