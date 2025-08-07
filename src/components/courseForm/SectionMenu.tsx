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
import { deleteSection } from "@/lib/slices/CreateCourseSlice";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import CreateLessonForm from "./CreateLessonForm";
import RenameSectionForm from "./RenameSectionForm";
import CreateQuizForm from "./CreateQuizForm";
import { Section } from "@/types/section";
type Props = {
  section: Section;
};
const SectionMenu = ({ section }: Props) => {
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [isRenameSectionOpen, setIsRenameSectionOpen] = useState(false);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const dispatch = useAppDispatch();
  function handleDeleteSection() {
    dispatch(
      deleteSection({
        sectionGroupOrder: section.sectionGroupId,
        sectionOrder: section.order,
      })
    );
  }
  function handleAddLesson() {
    setIsCreateLessonOpen(true);
  }
  function handleAddQuiz() {
    setIsCreateQuizOpen(true);
  }
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handleAddQuiz} id="create-quiz-anchor">
              Add Quiz
            </MenubarItem>
            <MenubarItem onClick={handleAddLesson} id="create-lesson-anchor">
              Add Lesson
            </MenubarItem>
            <MenubarItem
              onClick={() => setIsRenameSectionOpen(true)}
              id="rename-anchor"
            >
              Rename
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleDeleteSection}>
              Delete Section
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <CreateLessonForm
        isOpen={isCreateLessonOpen}
        sectionOrder={section.order}
        sectionGroupOrder={section.sectionGroupId}
        setIsOpen={setIsCreateLessonOpen}
      />
      <RenameSectionForm
        isOpen={isRenameSectionOpen}
        section={section}
        setIsOpen={setIsRenameSectionOpen}
      />
      <CreateQuizForm
        isOpen={isCreateQuizOpen}
        sectionOrder={section.order}
        setIsOpen={setIsCreateQuizOpen}
      />
    </>
  );
};

export default SectionMenu;
