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
type Props = {
  lesson: DbLesson;
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
      variants={fadeInOutWithShiftVariants}
      initial="hidden"
      animate={controlls}
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
            <LessonMenu lesson={lesson} />
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
