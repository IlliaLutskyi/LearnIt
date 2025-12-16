"use client";
import { Section as TSection, SectionGroup } from "@/types/create-course";
import CollapsibleSectionGroup from "./CollapsibleSectionGroup";
import Section from "./Section";
type Props = {
  sectionGroups: SectionGroup[];
  currentSection: TSection | undefined;
  setCurrentSection: React.Dispatch<React.SetStateAction<TSection | undefined>>;
};
const PreviewSidebar = ({
  sectionGroups,
  currentSection,
  setCurrentSection,
}: Props) => {
  return (
    <aside className="flex flex-col bg-sidebar-primary text-sidebar-primary-foreground rounded-br-sm rounded-tr-sm p-4">
      {sectionGroups.map((sectionGroup) => {
        if (sectionGroup.showSectionsOnly)
          return sectionGroup.sections.map((section) => (
            <Section
              key={section.order}
              section={section}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
            />
          ));

        return (
          <CollapsibleSectionGroup
            key={sectionGroup.order}
            sectionGroup={sectionGroup}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        );
      })}
    </aside>
  );
};

export default PreviewSidebar;
