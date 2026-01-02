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
import { motion, useAnimation } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
import LessonPreview from "./create-course-form/LessonPreview";
import { useEffect } from "react";
import { EditSection } from "@/features/sections/schemas/edit-section-schema";
type Props = {
  lesson: EditSection["lessons"][number];
  removeLesson: () => void;
  updateLesson: (data: EditSection["lessons"][number]) => void;
};

const Lesson = ({ lesson, removeLesson, updateLesson }: Props) => {
  const controls = useAnimation();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.order });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    async function inView() {
      await controls.start("visible");
    }

    inView();
  }, [controls]);

  return (
    <motion.div
      variants={fadeInOutWithShiftVariants}
      initial="hidden"
      animate={controls}
    >
      <Collapsible
        ref={setNodeRef}
        style={style}
        className="ring-1 ring-ring rounded-sm p-4"
      >
        <div className="flex justify-between">
          <CollapsibleTrigger>
            <h1 className="font-bold">{lesson.title}</h1>
          </CollapsibleTrigger>

          <section className="flex gap-2">
            <LessonMenu
              lesson={lesson}
              removeLesson={removeLesson}
              updateLesson={updateLesson}
            />
            <button {...attributes} {...listeners}>
              <FaSort />
            </button>
          </section>
        </div>

        <CollapsibleContent>
          <LessonPreview lesson={lesson} />
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};
export default Lesson;
