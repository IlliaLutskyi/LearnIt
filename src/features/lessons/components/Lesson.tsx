"use client";
import { DbLesson } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import { FaSort } from "react-icons/fa";
import { CSS } from "@dnd-kit/utilities";
import Quiz from "../../quizes/components/create-course-form/Quiz";
import LessonMenu from "./LessonMenu";
import { motion } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";

type Props = {
  lesson: DbLesson;
};

const Lesson = ({ lesson }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.order });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Collapsible
      className="shadow-md rounded-sm p-4"
      ref={setNodeRef}
      style={style}
    >
      <motion.div
        className="flex justify-between"
        variants={fadeInOutWithShiftVariants}
        initial="hidden"
        animate="visible"
      >
        <CollapsibleTrigger>
          <h1 className="font-bold">{lesson.title}</h1>
        </CollapsibleTrigger>

        <section className="flex gap-2">
          <LessonMenu lesson={lesson} />
          <button {...attributes} {...listeners}>
            <FaSort />
          </button>
        </section>
      </motion.div>

      <CollapsibleContent>
        {lesson.contentType === "Video" && (
          <iframe
            src={lesson.content!}
            className="w-full aspect-vordereo p-4"
          />
        )}
        {lesson.contentType === "Quiz" && (
          <Quiz
            quiz={{
              answers: lesson.quiz?.answers!,
              question: lesson.quiz?.question!,
              explanation: lesson.quiz?.explanation!,
            }}
            key={lesson.order}
          />
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
  );
};
export default Lesson;
