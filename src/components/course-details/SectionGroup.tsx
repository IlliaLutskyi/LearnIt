import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaSort } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { memo, useEffect, useState } from "react";
import SectionGroupMenu from "./SectionGroupMenu";
import Sections from "./Sections";
import { UseFieldArrayRemove, UseFieldArrayUpdate } from "react-hook-form";
import { EditSectionGroups } from "@/features/sections/schemas/edit-section-group-schema";
import { SectionGroupProperties } from "@/features/sections/schemas/section-group-properties";
type Props = {
  index: number;
  sectionGroup: EditSectionGroups["sectionGroups"][number];
  update: UseFieldArrayUpdate<EditSectionGroups, "sectionGroups">;
  remove: UseFieldArrayRemove;
};
const SectionGroup = ({ sectionGroup, update, index, remove }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const controls = useAnimation();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sectionGroup.order });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    async function inView() {
      await controls.start("visible");
    }
    inView();
  }, []);
  function updateSections(
    index: number,
    sections: EditSectionGroups["sectionGroups"][number]["sections"]
  ) {
    update(index, {
      ...sectionGroup,
      sections: sections,
    });
  }
  function addSection(section: { title: string }) {
    update(index, {
      ...sectionGroup,
      sections: [
        ...sectionGroup.sections,
        {
          title: section.title,
          action: "create",
          order: sectionGroup.sections.length + 1,
        },
      ],
    });
  }
  function updateProperties(properties: SectionGroupProperties) {
    update(index, {
      ...sectionGroup,
      ...properties,
      action: sectionGroup.action === "create" ? "create" : "update",
    });
  }
  async function removeSectionGroup() {
    await controls.start("exit");

    if (sectionGroup.action === "create") return remove(index);

    update(index, {
      ...sectionGroup,
      action: "delete",
    });
  }

  if (sectionGroup.action === "delete") return null;

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={fadeInOutWithShiftVariants}
    >
      <Collapsible
        className="ring-1 ring-ring rounded-sm p-4"
        open={isOpen}
        ref={setNodeRef}
        style={style}
      >
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="font-bold"
          >
            {sectionGroup.title}
          </button>

          <section className="flex items-center gap-2">
            <SectionGroupMenu
              sectionGroup={sectionGroup}
              controls={controls}
              addSection={addSection}
              updateProperties={updateProperties}
              removeSectionGroup={removeSectionGroup}
            />

            <button type="button" {...attributes} {...listeners}>
              <FaSort />
            </button>
          </section>
        </div>

        <CollapsibleContent>
          {sectionGroup.sections && (
            <Sections
              key={sectionGroup.order}
              sections={sectionGroup.sections}
              updateSections={(
                sections: EditSectionGroups["sectionGroups"][number]["sections"]
              ) => updateSections(index, sections)}
            />
          )}
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

export default SectionGroup;
