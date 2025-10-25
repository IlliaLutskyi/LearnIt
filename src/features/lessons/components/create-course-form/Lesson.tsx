"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaSort } from "react-icons/fa";
import Quiz from "@/features/quizes/components/create-course-form/Quiz";
import LessonMenu from "@/features/lessons/components/create-course-form/LessonMenu";
import { Lesson as TLesson } from "@/types/create-course";

type Props = {
  lesson: TLesson;
};
const Lesson = ({ lesson }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.order });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div>
      <Collapsible
        className="shadow-md rounded-sm p-4"
        ref={setNodeRef}
        style={style}
      >
        <div className="flex justify-between">
          <CollapsibleTrigger>
            <h1 className="font-bold">{lesson.title}</h1>
          </CollapsibleTrigger>
          <section className="flex gap-2">
            <LessonMenu lesson={lesson} />
            <button {...attributes} {...listeners}>
              <FaSort />
            </button>
          </section>
        </div>
        <CollapsibleContent>
          {lesson.contentType === "Video" && (
            <iframe
              src={lesson.content}
              className="w-full aspect-vordereo p-4"
            />
          )}
          {lesson.contentType === "Quiz" && (
            <Quiz quiz={lesson.quiz!} key={lesson.order} />
          )}
          {(lesson.contentType === "Table" ||
            lesson.contentType === "Text" ||
            lesson.contentType === "Markdown") && (
            <div
              className="mx-auto prose prose-sm w-full whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{
                __html: lesson.content!,
              }}
            />
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Lesson;
