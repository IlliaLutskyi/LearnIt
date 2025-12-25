"use client";
import { FaArrowUp } from "react-icons/fa";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import Section from "./Section";
import { useParams } from "next/navigation";
import { DbSectionGroup } from "@/types";
import { motion } from "framer-motion";
type Props = {
  sectionGroup: DbSectionGroup;
};

const SectionGroup = ({ sectionGroup }: Props) => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(sectionGroup.order === 1 ? true : false);

  useEffect(() => {
    if (params.sectionGroupSlug == sectionGroup.slug) setIsOpen(true);
  }, [params.sectionGroupSlug, sectionGroup.slug]);

  if (sectionGroup.showSectionsOnly)
    return (
      <div>
        {sectionGroup.sections &&
          sectionGroup.sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              sectionGroupSlug={sectionGroup.slug}
            />
          ))}
      </div>
    );

  return (
    <Collapsible open={isOpen}>
      <button
        className="flex justify-between items-center gap-4  hover:text-secondary-accent duration-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-md text-left line-clamp-1 hover:line-clamp-none font-bold">
          {sectionGroup.title}
        </p>

        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <FaArrowUp />
        </motion.span>
      </button>

      <CollapsibleContent>
        <div className="ml-4 mt-2">
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
