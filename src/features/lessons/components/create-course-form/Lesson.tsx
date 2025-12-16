"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaSort } from "react-icons/fa";
import LessonMenu from "@/features/lessons/components/create-course-form/LessonMenu";
import { Lesson as TLesson } from "@/types/create-course";
import LessonPreview from "./LessonPreview";
import { motion, useAnimation } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
import { useEffect } from "react";
type Props = {
  lesson: TLesson;
};
const Lesson = ({ lesson }: Props) => {
  const controlls = useAnimation();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.order });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    async function inView() {
      await controlls.start("visible");
    }
    inView();
  }, [controlls]);

  return (
    <motion.div
      animate={controlls}
      initial="hidden"
      variants={fadeInOutWithShiftVariants}
    >
      <Collapsible
        className="ring-1 ring-ring rounded-sm p-4"
        ref={setNodeRef}
        style={style}
      >
        <div className="flex justify-between">
          <CollapsibleTrigger>
            <h1 className="font-bold">{lesson.title}</h1>
          </CollapsibleTrigger>

          <section className="flex gap-2">
            <LessonMenu lesson={lesson} controlls={controlls} />

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
