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
import LessonMenu from "./LessonMenu";
import { motion } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
import LessonPreview from "./create-course-form/LessonPreview";
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
      className="ring-1 ring-ring rounded-sm p-4"
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
        <LessonPreview lesson={lesson} />
      </CollapsibleContent>
    </Collapsible>
  );
};
export default Lesson;
