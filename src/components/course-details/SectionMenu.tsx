"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { HiDotsVertical } from "react-icons/hi";
import { LegacyAnimationControls } from "framer-motion";
import { EditSectionGroups } from "@/features/sections/schemas/edit-section-group-schema";
import { lazy, memo, Suspense, useState } from "react";

const RenameForm = lazy(
  () => import("@/features/sections/components/create-course-form/RenameForm")
);

type Props = {
  section: EditSectionGroups["sectionGroups"][number]["sections"][number];
  renameSection: (title: string) => void;
  deleteSection: () => void;
  controls: LegacyAnimationControls;
};
const SectionMenu = ({
  section,
  controls,
  deleteSection,
  renameSection,
}: Props) => {
  const [isRenameFormOpen, setIsRenameFormOpen] = useState(false);
  async function onDelete() {
    await controls.start("exit");
    deleteSection();
  }
  async function onRename(data: { title: string }) {
    renameSection(data.title);
  }

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent className="pointer-events-auto">
            <MenubarItem onClick={() => setIsRenameFormOpen(true)}>
              Rename Section
            </MenubarItem>

            <MenubarItem onClick={onDelete}>Delete Section</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Suspense>
        <RenameForm
          isOpen={isRenameFormOpen}
          setIsOpen={setIsRenameFormOpen}
          onSave={onRename}
          section={{ title: section.title }}
        />
      </Suspense>
    </>
  );
};

export default memo(SectionMenu);
