"use client";
import { useAppSelector } from "@/lib/hooks";
import { IoMdSave } from "react-icons/io";
import { toast } from "sonner";
const SaveSectionsButton = () => {
  const { title, description, steps, sections, category } = useAppSelector(
    (state) => state.CreateCourse
  );

  function handleSave() {
    if (sections.length > 0)
      localStorage.setItem("sections", JSON.stringify(sections));
    if (title) localStorage.setItem("title", title);
    if (description) localStorage.setItem("description", description);
    if (category) localStorage.setItem("category", category);
    localStorage.setItem("steps", JSON.stringify(steps));

    toast.success("All data was saved now, you can relax :)");
  }
  return (
    <button
      className="self-end  bg-purple-500 text-white p-2 hover:scale-95 rounded-sm hover:bg-purple-700 duration-500 flex items-center gap-2"
      onClick={handleSave}
    >
      <IoMdSave /> Save for now
    </button>
  );
};

export default SaveSectionsButton;
