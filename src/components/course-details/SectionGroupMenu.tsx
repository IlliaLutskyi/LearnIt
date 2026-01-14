import { lazy, memo, Suspense, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import { HiDotsVertical } from "react-icons/hi";
import { LegacyAnimationControls } from "framer-motion";
import { SectionGroupProperties } from "@/features/sections/schemas/section-group-properties";
import { EditSectionGroups } from "@/features/sections/schemas/edit-section-group-schema";

const RenameForm = lazy(
  () => import("@/features/sections/components/create-course-form/RenameForm")
);
const SectionGroupPropertiesForm = lazy(
  () =>
    import("@/features/sections/components/create-course-form/PropertiesForm")
);
type Props = {
  sectionGroup: EditSectionGroups["sectionGroups"][number];
  controls: LegacyAnimationControls;
  addSection: (section: { title: string }) => void;
  updateProperties: (properties: SectionGroupProperties) => void;
  removeSectionGroup: () => void;
};
const SectionGroupMenu = ({
  sectionGroup,
  addSection,
  updateProperties,
  removeSectionGroup,
}: Props) => {
  const [
    isSectionGroupPropertiesFormOpen,
    setIsSectionGroupPropertiesFormOpen,
  ] = useState(false);

  const [isAddSectionFormOpen, setIsAddSectionFormOpen] = useState(false);

  async function onSaveSectionGroupProperties(data: SectionGroupProperties) {
    updateProperties(data);
  }
  async function onSaveAddSection(data: { title: string }) {
    addSection(data);
  }
  function onRemoveSectionGroup() {
    removeSectionGroup();
  }

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent className="pointer-events-auto">
            <MenubarItem
              onClick={() => setIsSectionGroupPropertiesFormOpen(true)}
            >
              Properties
            </MenubarItem>

            <MenubarItem onClick={() => setIsAddSectionFormOpen(true)}>
              Add Section
            </MenubarItem>
            <MenubarSeparator />

            <MenubarItem onClick={onRemoveSectionGroup}>
              Delete SectionGroup
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Suspense>
        <SectionGroupPropertiesForm
          isOpen={isSectionGroupPropertiesFormOpen}
          setIsOpen={setIsSectionGroupPropertiesFormOpen}
          sectionGroupProperties={{
            title: sectionGroup.title,
            showSectionsOnly: sectionGroup.showSectionsOnly,
            state: sectionGroup.state,
          }}
          onSave={onSaveSectionGroupProperties}
        />
        <RenameForm
          isOpen={isAddSectionFormOpen}
          setIsOpen={setIsAddSectionFormOpen}
          onSave={onSaveAddSection}
        />
      </Suspense>
    </>
  );
};

export default memo(SectionGroupMenu);
