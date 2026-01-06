import { DbSection } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { memo, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import SectionMenu from "./SectionMenu";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
type Props = {
  section: DbSection;
};
const Section = ({ section }: Props) => {
  const controls = useAnimation();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

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
      <div
        className="flex justify-between items-center ring-1 ring-ring rounded-sm p-4"
        ref={setNodeRef}
        style={style}
      >
        <p className="font-bold">{section.title}</p>

        <section className="flex gap-2">
          <SectionMenu section={section} controls={controls} />
          <button type="button" {...attributes} {...listeners}>
            <FaSort />
          </button>
        </section>
      </div>
    </motion.div>
  );
};

export default memo(Section);
