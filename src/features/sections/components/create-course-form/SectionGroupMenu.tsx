"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAppDispatch } from "@/lib/hooks";
import {
  addSectionToSectionGroup,
  deleteSectionGroup,
} from "@/lib/slices/create-course-slice";
import { HiDotsVertical } from "react-icons/hi";
import { lazy, memo, Suspense, useState } from "react";
import { SectionGroup } from "@/types/create-course";
import { LegacyAnimationControls } from "framer-motion";
const RenameForm = lazy(() => import("./RenameForm"));

type Props = {
  sectionGroup: SectionGroup;
  controlls: LegacyAnimationControls;
};
const SectionGroupMenu = ({ sectionGroup, controlls }: Props) => {
  const dispatch = useAppDispatch();
  const [isRenameSectionGroupFormOpen, setIsRenameSectionGroupFormOpen] =
    useState(false);
  async function handleDeleteSectionGroup() {
    await controlls.start("exit");
    dispatch(deleteSectionGroup(sectionGroup.order));
  }
  function handleRenameSectionGroup() {
    setIsRenameSectionGroupFormOpen(true);
  }
  function handleAddSection() {
    dispatch(
      addSectionToSectionGroup({ sectionGroupOrder: sectionGroup.order })
    );
  }
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handleAddSection}>Add Section</MenubarItem>
            <MenubarItem onClick={handleRenameSectionGroup} id="rename-anchor">
              Rename Section Group
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleDeleteSectionGroup}>
              Delete SectionGroup
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Suspense>
        <RenameForm
          isOpen={isRenameSectionGroupFormOpen}
          sectionGroup={sectionGroup}
          setIsOpen={setIsRenameSectionGroupFormOpen}
        />
      </Suspense>
    </>
  );
};

export default memo(SectionGroupMenu);
