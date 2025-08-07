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
} from "@/lib/slices/CreateCourseSlice";
import { HiDotsVertical } from "react-icons/hi";

import { SectionGroup } from "@/types/sectionGroup";
type Props = {
  sectionGroup: SectionGroup;
};
const SectionGroupMenu = ({ sectionGroup }: Props) => {
  const dispatch = useAppDispatch();
  function handleDeleteSectionGroup() {
    dispatch(deleteSectionGroup(sectionGroup.order));
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
            <MenubarSeparator />
            <MenubarItem onClick={handleDeleteSectionGroup}>
              Delete SectionGroup
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};

export default SectionGroupMenu;
