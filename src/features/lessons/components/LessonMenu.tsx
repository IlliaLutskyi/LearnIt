"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { lazy, memo, Suspense, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useAppDispatch } from "@/lib/hooks";
import { toggleConfirmationForm } from "@/lib/slices/confirmation-form-slice";
import { DbLesson } from "@/types";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import CreateQuizForm from "@/features/quizzes/components/create-course-form/CreateQuizForm";
import { CreateQuiz } from "@/features/quizzes/schemas/create-quiz";

const CreateLessonForm = lazy(
  () =>
    import("@/features/lessons/components/create-course-form/CreateLessonForm")
);
// const RenameForm = lazy(
//   () => import("@/features/sections/components/create-course-form/RenameForm")
// );
// const CreateQuizForm = lazy(
//   () => import("@/features/quizes/components/create-course-form/CreateQuizForm")
// );

type Props = {
  lesson: DbLesson;
};
const LessonMenu = ({ lesson }: Props) => {
  const dispatch = useAppDispatch();
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [isEditQuizOpen, setIsEditQuizOpen] = useState(false);
  function handleDeleteLesson() {
    dispatch(toggleConfirmationForm(true));
  }
  function handleEditLesson() {
    setIsEditLessonOpen(true);
  }
  function handleEditQuiz() {
    setIsEditQuizOpen(true);
  }
  async function onSaveLesson(data: CreateLesson) {
    return;
  }

  async function onSaveQuiz(data: CreateQuiz) {
    return;
  }
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={
                lesson.contentType === "Quiz"
                  ? handleEditQuiz
                  : handleEditLesson
              }
              id={
                lesson.contentType === "Quiz"
                  ? "create-quiz-anchor"
                  : "create-lesson-anchor"
              }
            >
              {lesson.contentType === "Quiz" ? "Edit quiz" : "Edit lesson"}
            </MenubarItem>
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
          setIsOpen={setIsEditLessonOpen}
          lesson={lesson}
          onSave={onSaveLesson}
        />
        <CreateQuizForm
          isOpen={isEditQuizOpen}
          setIsOpen={setIsEditQuizOpen}
          lesson={lesson}
          onSave={onSaveQuiz}
        />
      </Suspense>
    </>
  );
};

export default memo(LessonMenu);
