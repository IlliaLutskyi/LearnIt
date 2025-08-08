"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { lazy, memo, Suspense, useCallback, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Lesson } from "@/types/lesson";
import { deleteLesson } from "@/lib/slices/CreateCourseSlice";
import { Section } from "@/types/section";
const CreateLessonForm = lazy(() => import("./CreateLessonForm"));
const RenameForm = lazy(() => import("./RenameForm"));
const CreateQuizForm = lazy(() => import("./CreateQuizForm"));

type Props = {
  lesson: Lesson;
};
const LessonMenu = ({ lesson }: Props) => {
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [isRenameSectionOpen, setIsRenameSectionOpen] = useState(false);
  const sectionGroups = useAppSelector(
    (state) => state.CreateCourse.sectionGroups
  );
  const [isEditQuizOpen, setIsEditQuizOpen] = useState(false);
  const dispatch = useAppDispatch();
  const findSection = useCallback(() => {
    const sectionGroup = sectionGroups.find(
      (sectionGroup) => sectionGroup.order === lesson.sectionId
    );
    const section = sectionGroup?.sections.find(
      (section) => section.order === lesson.sectionId
    );
    return section as Section;
  }, [sectionGroups]);
  function handleDeleteLesson() {
    dispatch(
      deleteLesson({
        sectionGroupOrder: lesson.sectionGroupId,
        sectionOrder: lesson.sectionId,
        lessonId: lesson.order,
      })
    );
  }
  function handleEditLesson() {
    setIsEditLessonOpen(true);
  }
  function handleEditQuiz() {
    setIsEditQuizOpen(true);
  }
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent>
            {lesson.contentType === "Quiz" && (
              <MenubarItem onClick={handleEditQuiz} id="create-quiz-anchor">
                Edit quiz
              </MenubarItem>
            )}
            {lesson.contentType !== "Quiz" && (
              <MenubarItem onClick={handleEditLesson} id="create-lesson-anchor">
                Edit lesson
              </MenubarItem>
            )}
            <MenubarSeparator />

            <MenubarItem onClick={handleDeleteLesson}>
              Delete {lesson.contentType === "Quiz" ? "quiz" : "lesson"}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Suspense>
        <CreateLessonForm
          isOpen={isEditLessonOpen}
          sectionOrder={lesson.sectionId}
          sectionGroupOrder={lesson.sectionGroupId}
          setIsOpen={setIsEditLessonOpen}
          lesson={lesson}
        />
        <RenameForm
          isOpen={isRenameSectionOpen}
          section={findSection()}
          setIsOpen={setIsRenameSectionOpen}
        />
        <CreateQuizForm
          isOpen={isEditQuizOpen}
          sectionOrder={lesson.sectionId}
          setIsOpen={setIsEditQuizOpen}
          lesson={lesson}
        />
      </Suspense>
    </>
  );
};

export default memo(LessonMenu);
