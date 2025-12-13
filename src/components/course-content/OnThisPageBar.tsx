"use client";
import { useAppSelector } from "@/lib/hooks";
import { DbSection } from "@/types";

import Link from "next/link";

type Props = {
  section: DbSection;
};
const OnThisPageBar = ({ section }: Props) => {
  const { currentLessonViewId } = useAppSelector((store) => store.CourseView);
  if (section.lessons && section.lessons.length < 1) return null;
  return (
    <aside className="max-md:hidden flex flex-col gap-2 p-4 bg-sidebar-primary text-sidebar-primary-foreground h-[calc(100vh-48px)]">
      <h1 className="text-lg font-bold">In this section</h1>
      <div
        className="flex flex-col gap-2 h-full overflow-y-auto"
        id="scrollbar"
      >
        {section.lessons?.map((lesson) => {
          return (
            <Link
              key={lesson.id}
              href={`#lesson-${lesson.id}`}
              className={`text-sm ${
                lesson.id === currentLessonViewId
                  ? "text-secondary-accent"
                  : "hover:text-secondary-accent"
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

export default OnThisPageBar;
