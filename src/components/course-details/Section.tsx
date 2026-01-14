import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { memo, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import SectionMenu from "./SectionMenu";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
import { EditSectionGroups } from "@/features/sections/schemas/edit-section-group-schema";
type Props = {
  section: EditSectionGroups["sectionGroups"][number]["sections"][number];
  update: (
    order: number,
    edits: EditSectionGroups["sectionGroups"][number]["sections"][number]
  ) => void;
  remove: (order: number) => void;
};
const Section = ({ section, update, remove }: Props) => {
  const controls = useAnimation();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.order });

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

  async function removeSection() {
    await controls.start("exit");

    if (section.action === "create") return remove(section.order);

    update(section.order, {
      ...section,
      action: "delete",
    });
  }
  async function renameSection(title: string) {
    update(section.order, {
      ...section,
      title,
      action: section.action === "create" ? "create" : "update",
    });
  }

  if (section.action === "delete") return null;

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

        <section className="flex gap-2 items-center">
          <SectionMenu
            section={section}
            controls={controls}
            deleteSection={removeSection}
            renameSection={(title: string) => renameSection(title)}
          />
          <button type="button" {...attributes} {...listeners}>
            <FaSort />
          </button>
        </section>
      </div>
    </motion.div>
  );
};

export default memo(Section);
