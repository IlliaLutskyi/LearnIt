"use client";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { toast } from "sonner";
const SaveContentButton = () => {
  const { sectionGroups } = useAppSelector((state) => state.CreateCourse);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sectionGroups")) setIsSaved(true);
  }, []);

  function handleClearStorage() {
    localStorage.setItem("sectionGroups", "");
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
      type="button"
      className="self-start flex items-center gap-2 bg-accent text-accent-foreground text-sm p-2 hover:scale-95 rounded-sm duration-400"
      onClick={isSaved ? handleClearStorage : handleSave}
    >
      {!isSaved && <IoMdSave />}
      {isSaved ? "Clear saved content" : "Save content"}
    </button>
  );
};

export default SaveContentButton;
