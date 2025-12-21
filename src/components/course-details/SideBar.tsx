"use client";
import { useAppSelector } from "@/lib/hooks";
import { setCurrentTab } from "@/lib/slices/edit-course-detail-form-slice";
import { useDispatch } from "react-redux";
const SideBar = () => {
  const dispatch = useDispatch();
  const { currentTab } = useAppSelector((state) => state.EditCourseDetail);

  const tabs = [
    {
      onClick: () => dispatch(setCurrentTab("general_info")),
      name: "General Info",
      id: "general_info",
    },
    {
      onClick: () => dispatch(setCurrentTab("prerequisites")),
      name: "Prerequisites",
      id: "prerequisites",
    },
    {
      onClick: () => dispatch(setCurrentTab("skills")),
      name: "Learning Outcomes",
      id: "skills",
    },
    {
      onClick: () => dispatch(setCurrentTab("delete_course")),
      name: "Delete Course",
      id: "delete_course",
    },
  ];

  return (
    <aside className="flex flex-col gap-2 h-full bg-sidebar-primary text-sidebar-primary-foreground p-4 justify-center rounded-bl-sm rounded-tl-sm">
      {tabs.map((tab) => {
        return (
          <button
            className={`${
              currentTab === tab.id
                ? "bg-accent text-accent-foreground"
                : "bg-background text-accent hover:bg-accent hover:text-accent-foreground"
            } p-2 text-xs rounded-full duration-400`}
            key={tab.id}
            onClick={tab.onClick}
          >
            {tab.name}
          </button>
        );
      })}
    </aside>
  );
};

export default SideBar;
