"use client";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { DbSectionGroup } from "@/types/dbSectionGroup";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { useState } from "react";
import Section from "./Section";
type Props = {
  sectionGroup: DbSectionGroup;
};

const SectionGroup = ({ sectionGroup }: Props) => {
  const [isOpen, setIsOpen] = useState(sectionGroup.order === 1 ? true : false);
  return (
    <Collapsible open={isOpen}>
      <div
        className="flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-lg text-white hover:text-purple-400 duration-400 ">
          {sectionGroup.title}
        </h1>
        {isOpen ? (
          <FaArrowUp className="text-gray-400 hover:text-white duration-400" />
        ) : (
          <FaArrowDown className="text-gray-400 hover:text-white duration-400" />
        )}
      </div>
      <CollapsibleContent className="border-l-[1px] border-gray-200 pl-4 ml-2 mt-2">
        {sectionGroup.sections &&
          sectionGroup.sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SectionGroup;
