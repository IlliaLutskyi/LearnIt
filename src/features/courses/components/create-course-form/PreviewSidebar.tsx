import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Section, SectionGroup } from "@/types/create-course";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { useState } from "react";
type Props = {
  sectionGroups: SectionGroup[];
  currentSection: Section | undefined;
  setCurrentSection: React.Dispatch<React.SetStateAction<Section | undefined>>;
};
const PreviewSidebar = ({
  sectionGroups,
  currentSection,
  setCurrentSection,
}: Props) => {
  return (
    <aside className="flex flex-col gap-4 items-center bg-sidebar-primary text-sidebar-primary-foreground rounded-br-sm rounded-tr-sm">
      {sectionGroups.map((sectionGroup) => {
        const [isOpen, setIsOpen] = useState(
          sectionGroup.order === 1 ? true : false
        );
        return (
          <Collapsible open={isOpen} className="p-4" key={sectionGroup.order}>
            <button
              className="flex justify-between items-center hover:text-secondary-accent duration-400 gap-4 font-bold"
              onClick={() => setIsOpen(!isOpen)}
            >
              {sectionGroup.title}
              {isOpen ? <FaArrowUp /> : <FaArrowDown />}
            </button>

            <CollapsibleContent className="ml-2 mt-2">
              {sectionGroup.sections.map((section) => (
                <div
                  className={`${
                    section.slug === currentSection?.slug
                      ? "border-l-2 border-secondary-accent"
                      : "border-l-2 hover:border-secondary-accent border-slate-200"
                  } pl-4`}
                  key={section.order}
                >
                  <button
                    onClick={() => {
                      setCurrentSection(section);
                    }}
                    className={`text-sm ${
                      currentSection?.slug === section.slug
                        ? "text-secondary-accent"
                        : "hover:text-secondary-accent"
                    } duration-400`}
                  >
                    {section.title}
                  </button>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </aside>
  );
};

export default PreviewSidebar;
