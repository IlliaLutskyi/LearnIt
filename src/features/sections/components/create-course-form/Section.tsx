"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SectionMenu from "./SectionMenu";
import { FaSort } from "react-icons/fa";
import { memo, lazy, Suspense, useEffect, useState } from "react";
import { Section as TSection } from "@/types/create-course";
import { Loader } from "@/components/common";
import { motion, useAnimation } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
const Lessons = lazy(
  () => import("@/features/lessons/components/create-course-form/Lessons")
);
type Props = {
  section: TSection;
};
const Section = ({ section }: Props) => {
  const controlls = useAnimation();
  const [isOpen, setIsOpen] = useState(section.order === 1 ? true : false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.order });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  useEffect(() => {
    async function inView() {
      await controlls.start("visible");
    }
    inView();
  }, []);

  return (
    <div ref={setNodeRef} style={style}>
      <Collapsible className="shadow-md rounded-sm p-4" open={isOpen}>
        <motion.div
          className="flex justify-between"
          variants={fadeInOutWithShiftVariants}
          initial="hidden"
          animate={controlls}
        >
          <button onClick={() => setIsOpen(!isOpen)} className="font-bold">
            {section.title}
          </button>
          <section className="flex gap-2">
            <SectionMenu section={section} controlls={controlls} />
            <button {...attributes} {...listeners}>
              <FaSort />
            </button>
          </section>
        </motion.div>
        <CollapsibleContent>
          {section.lessons.length > 0 ? (
            <Suspense fallback={<Loader />}>
              <Lessons lessons={section.lessons} />
            </Suspense>
          ) : (
            <p className="text-sm text-center">No Lessons</p>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default memo(Section);
