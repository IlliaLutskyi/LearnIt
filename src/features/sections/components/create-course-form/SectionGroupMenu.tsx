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
import { SiGooglegemini } from "react-icons/si";
import { HiDotsVertical } from "react-icons/hi";
import { lazy, memo, Suspense, useState } from "react";
import { Section, SectionGroup } from "@/types/create-course";
import { LegacyAnimationControls } from "framer-motion";
import { GenerateSection } from "../../schemas/generate-section";
import { toast } from "sonner";

const PropertiesForm = lazy(() => import("./PropertiesForm"));

const GenerateSectionForm = lazy(() => import("./GenerateSectionForm"));

type Props = {
  sectionGroup: SectionGroup;
  controlls: LegacyAnimationControls;
};
const SectionGroupMenu = ({ sectionGroup, controlls }: Props) => {
  const dispatch = useAppDispatch();
  const [isPropertiesFormOpen, setIsPropertiesFormOpen] = useState(false);
  const [isGenerateSectionOpen, setIsGenerateSectionOpen] = useState(false);
  async function handleDeleteSectionGroup() {
    await controlls.start("exit");
    dispatch(deleteSectionGroup(sectionGroup.order));
  }
  function handleRenameSectionGroup() {
    setIsPropertiesFormOpen(true);
  }
  function handleGenerateSection() {
    setIsGenerateSectionOpen(true);
  }
  function handleAddSection() {
    dispatch(
      addSectionToSectionGroup({ sectionGroupOrder: sectionGroup.order })
    );
  }
  function onSaveSection(data: GenerateSection & { section: Section }) {
    dispatch(
      addSectionToSectionGroup({
        sectionGroupOrder: sectionGroup.order,
        title: data.section.title,
        lessons: data.section.lessons || [],
      })
    );
    toast.success("Section generated");
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
              Properties
            </MenubarItem>
            <MenubarItem
              onClick={handleGenerateSection}
              id="generate-section-anchor"
            >
              <SiGooglegemini /> Generate Section
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleDeleteSectionGroup}>
              Delete SectionGroup
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Suspense>
        <PropertiesForm
          isOpen={isPropertiesFormOpen}
          sectionGroup={sectionGroup}
          setIsOpen={setIsPropertiesFormOpen}
        />
        <GenerateSectionForm
          isOpen={isGenerateSectionOpen}
          setIsOpen={setIsGenerateSectionOpen}
          onSave={onSaveSection}
        />
      </Suspense>
    </>
  );
};

export default memo(SectionGroupMenu);
