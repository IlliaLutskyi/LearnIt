"use client";
import { useAppSelector } from "@/lib/hooks";
import { setCurrentTab } from "@/lib/slices/edit-course-detail-form-slice";
import { useDispatch } from "react-redux";
const SideBar = () => {
  const dispatch = useDispatch();
  const { currentTab } = useAppSelector((state) => state.EditCourseDetail);

  return (
    <aside className="flex flex-col gap-2 h-full bg-sidebar-primary text-sidebar-primary-foreground p-4 justify-center rounded-bl-sm rounded-tl-sm">
      <button
        onClick={() => dispatch(setCurrentTab("general_info"))}
        type="button"
        className={`${
          currentTab === "general_info"
            ? "bg-accent text-accent-foreground"
            : "bg-background text-accent hover:bg-accent hover:text-accent-foreground"
        } p-2 text-xs rounded-full duration-400`}
      >
        General Info
      </button>
      <button
        onClick={() => dispatch(setCurrentTab("prerequisites"))}
        type="button"
        className={`${
          currentTab === "prerequisites"
            ? "bg-accent text-accent-foreground"
            : "bg-background text-accent hover:bg-accent hover:text-accent-foreground"
        } p-2 text-xs rounded-full duration-400`}
      >
        Prerequisites
      </button>
      <button
        onClick={() => dispatch(setCurrentTab("skills"))}
        type="button"
        className={`${
          currentTab === "skills"
            ? "bg-accent text-accent-foreground"
            : "bg-background text-accent hover:bg-accent hover:text-accent-foreground"
        } p-2 text-xs rounded-full duration-400`}
      >
        Learning Outcomes
      </button>
    </aside>
  );
};

export default SideBar;
