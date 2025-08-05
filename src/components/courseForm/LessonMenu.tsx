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
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import CreateLessonForm from "./CreateLessonForm";
import RenameSectionForm from "./RenameSectionForm";
import { Lesson } from "@/types/lesson";
import CreateQuizForm from "./CreateQuizForm";
import { deleteLesson } from "@/lib/slices/CreateCourseSlice";
type Props = {
  lesson: Lesson;
};
const LessonMenu = ({ lesson }: Props) => {
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [isRenameSectionOpen, setIsRenameSectionOpen] = useState(false);
  const sections = useAppSelector((state) => state.CreateCourse.sections);
  const [isEditQuizOpen, setIsEditQuizOpen] = useState(false);
  const dispatch = useAppDispatch();
  function findIdOfSection() {
    return sections.find((section) => {
      return section.lessons.find((lesson) => lesson.order === lesson.order);
    })!.order;
  }
  function handleDeleteLesson() {
    dispatch(
      deleteLesson({ sectionOrder: lesson.sectionId, lessonId: lesson.order })
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
      <CreateLessonForm
        isOpen={isEditLessonOpen}
        order={findIdOfSection()}
        setIsOpen={setIsEditLessonOpen}
        lesson={lesson}
      />
      <RenameSectionForm
        isOpen={isRenameSectionOpen}
        section={sections.find((section) => section.order === lesson.order)!}
        setIsOpen={setIsRenameSectionOpen}
      />
      <CreateQuizForm
        isOpen={isEditQuizOpen}
        order={findIdOfSection()}
        setIsOpen={setIsEditQuizOpen}
        lesson={lesson}
      />
    </>
  );
};

export default LessonMenu;
