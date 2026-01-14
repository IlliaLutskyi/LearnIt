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
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import { CreateQuiz } from "@/features/quizzes/schemas/create-quiz";
import { EditSection } from "@/features/sections/schemas/edit-section-schema";
import { LegacyAnimationControls } from "motion";
const CreateLessonForm = lazy(
  () =>
    import("@/features/lessons/components/create-course-form/CreateLessonForm")
);
const CreateQuizForm = lazy(
  () =>
    import("@/features/quizzes/components/create-course-form/CreateQuizForm")
);

type Props = {
  lesson: EditSection["lessons"][number];
  controls: LegacyAnimationControls;
  removeLesson: () => void;
  updateLesson: (data: EditSection["lessons"][number]) => void;
};
const LessonMenu = ({
  lesson,
  removeLesson,
  updateLesson,
  controls,
}: Props) => {
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [isEditQuizOpen, setIsEditQuizOpen] = useState(false);

  async function handleDeleteLesson() {
    await controls.start("exit");

    removeLesson();
  }
  function handleEditLesson() {
    setIsEditLessonOpen(true);
  }
  function handleEditQuiz() {
    setIsEditQuizOpen(true);
  }
  async function onSaveLesson(data: CreateLesson) {
    updateLesson({ ...lesson, ...data });
  }

  async function onSaveQuiz(data: CreateQuiz) {
    updateLesson({
      ...lesson,
      title: data.title,
      quiz: {
        question: data.question,
        answers: data.answers.map((answer) => ({
          content: answer.content,
          isCorrect: answer.isCorrect,
        })),
        explanation: data.explanation,
      },
    });
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
              onClick={
                lesson.contentType === "Quiz"
                  ? handleEditQuiz
                  : handleEditLesson
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
