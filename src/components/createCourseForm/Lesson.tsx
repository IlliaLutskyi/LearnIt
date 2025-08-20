"use client";
import type { Lesson } from "@/types/lesson";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaSort } from "react-icons/fa";
import Quiz from "./Quiz";
import LessonMenu from "./LessonMenu";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
type Props = {
  lesson: Lesson;
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
        className="shadow-md rounded-md p-4 "
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
          {lesson.contentType === "Text" && (
            <div
              className="mx-auto prose prose-sm w-full whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{
                __html: generateHTML(JSON.parse(lesson.content!), [
                  StarterKit.configure(),
                ]),
              }}
            ></div>
          )}
          {lesson.contentType === "Video" && (
            <iframe
              src={lesson.content}
              className="w-full aspect-vordereo p-4"
            />
          )}
          {lesson.contentType === "Quiz" && (
            <Quiz quiz={lesson.quiz!} key={lesson.order} />
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Lesson;
