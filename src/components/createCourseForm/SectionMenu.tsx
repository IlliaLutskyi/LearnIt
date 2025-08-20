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
import { lazy, memo, Suspense, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Section } from "@/types/section";
const CreateLessonForm = lazy(() => import("./CreateLessonForm"));
const CreateQuizForm = lazy(() => import("./CreateQuizForm"));
const RenameForm = lazy(() => import("./RenameForm"));
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
      <Suspense>
        <CreateLessonForm
          isOpen={isCreateLessonOpen}
          sectionOrder={section.order}
          sectionGroupOrder={section.sectionGroupId}
          setIsOpen={setIsCreateLessonOpen}
        />
        <RenameForm
          isOpen={isRenameSectionOpen}
          section={section}
          setIsOpen={setIsRenameSectionOpen}
        />
        <CreateQuizForm
          isOpen={isCreateQuizOpen}
          sectionGroupOrder={section.sectionGroupId}
          sectionOrder={section.order}
          setIsOpen={setIsCreateQuizOpen}
        />
      </Suspense>
    </>
  );
};

export default memo(SectionMenu);
