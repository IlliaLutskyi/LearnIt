"use client";
import { useAppSelector } from "@/lib/hooks";
import { DbSection } from "@/types/dbSection";
import Link from "next/link";

type Props = {
  section: DbSection;
};
const ContentSideBar = ({ section }: Props) => {
  const { currentLessonViewId } = useAppSelector((store) => store.CourseView);
  if (section.lessons && section.lessons.length <= 1) return null;
  return (
    <aside className="max-md:hidden flex flex-col gap-2 p-4 bg-black h-[calc(100vh-3.5rem)]">
      <h1 className="text-lg font-bold text-white">In this section</h1>
      <div
        className="flex flex-col gap-2  h-full text-white overflow-y-auto"
        id="scrollbar"
      >
        {section.lessons?.map((lesson) => {
          return (
            <Link
              key={lesson.id}
              href={`#lesson-${lesson.id}`}
              className={`text-sm ${
                lesson.id === currentLessonViewId
                  ? "text-purple-400"
                  : "hover:text-purple-400"
              } duration-500`}
            >
              <span className="m-1">{lesson.order}.</span> {lesson.title}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default ContentSideBar;
