"use client";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Section as TSection, SectionGroup } from "@/types/create-course";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Section from "./Section";
type Props = {
  sectionGroup: SectionGroup;
  currentSection: TSection | undefined;
  setCurrentSection: React.Dispatch<React.SetStateAction<TSection | undefined>>;
};
const SectionGroupsPreview = ({
  sectionGroup,
  currentSection,
  setCurrentSection,
}: Props) => {
  const [isOpen, setIsOpen] = useState(sectionGroup.order === 1 ? true : false);

  return (
    <Collapsible open={isOpen} key={sectionGroup.order} className="mt-2">
      <button
        className="flex justify-between items-center text-start hover:text-secondary-accent duration-400 gap-4 font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {sectionGroup.title}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <FaArrowUp />
        </motion.span>
      </button>

      <CollapsibleContent className="ml-2 mt-2">
        {sectionGroup.sections.map((section) => (
          <Section
            key={section.order}
            section={section}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SectionGroupsPreview;
