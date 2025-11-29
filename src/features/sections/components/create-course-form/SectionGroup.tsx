"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FaSort } from "react-icons/fa";
import Sections from "./Sections";
import SectionGroupMenu from "./SectionGroupMenu";
import { memo, useEffect, useState } from "react";
import { SectionGroup as TSectionGroup } from "@/types/create-course";
import { motion, useAnimation } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
type Props = {
  sectionGroup: TSectionGroup;
};
const SectionGroup = ({ sectionGroup }: Props) => {
  const controlls = useAnimation();
  const [isOpen, setIsOpen] = useState(sectionGroup.order === 1 ? true : false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sectionGroup.order });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  useEffect(() => {
    async function inView() {
      await controlls.start("visible");
    }
    inView();
  });
  return (
    <div ref={setNodeRef} style={style}>
      <Collapsible className="ring-1 ring-ring rounded-sm p-4" open={isOpen}>
        <motion.div
          className="flex justify-between"
          initial="hidden"
          animate={controlls}
          variants={fadeInOutWithShiftVariants}
        >
          <button onClick={() => setIsOpen(!isOpen)} className="font-bold">
            {sectionGroup.title}
          </button>

          <section className="flex gap-2">
            <SectionGroupMenu
              sectionGroup={sectionGroup}
              controlls={controlls}
            />
            <button {...attributes} {...listeners}>
              <FaSort />
            </button>
          </section>
        </motion.div>
        <CollapsibleContent>
          {sectionGroup.sections.length > 0 ? (
            <Sections
              key={sectionGroup.order}
              sections={sectionGroup.sections}
            />
          ) : (
            <p className="text-sm text-center">No sections</p>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default memo(SectionGroup);
