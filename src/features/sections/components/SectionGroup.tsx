"use client";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import Section from "./Section";
import { useParams } from "next/navigation";
import { DbSectionGroup } from "@/types";
type Props = {
  sectionGroup: DbSectionGroup;
};

const SectionGroup = ({ sectionGroup }: Props) => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(sectionGroup.order === 1 ? true : false);
  useEffect(() => {
    if (params.sectionGroupSlug == sectionGroup.slug) setIsOpen(true);
  }, [params.sectionGroupSlug]);
  return (
    <Collapsible open={isOpen}>
      <div
        className="flex justify-between items-baseline"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-md font-bold hover:text-secondary-accent duration-400">
          {sectionGroup.title}
        </h1>
        {isOpen ? <FaArrowUp /> : <FaArrowDown />}
      </div>
      <CollapsibleContent>
        <div className="ml-2 mt-2">
          {sectionGroup.sections &&
            sectionGroup.sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                sectionGroupSlug={sectionGroup.slug}
              />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SectionGroup;
