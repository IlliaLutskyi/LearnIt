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
import { lazy, memo, Suspense, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import {
  deleteLesson,
  editLesson,
  editQuiz,
} from "@/lib/slices/create-course-slice";
import { Section } from "@/types/create-course/section";
import { Lesson } from "@/types/create-course";
import { CreateLesson } from "../../schemas/create-lesson-schema";
import { CreateQuiz } from "@/features/quizzes/schemas/create-quiz";
import { toast } from "sonner";
const CreateLessonForm = lazy(() => import("./CreateLessonForm"));
const RenameForm = lazy(
  () => import("@/features/sections/components/create-course-form/RenameForm")
);
const CreateQuizForm = lazy(
  () =>
    import("@/features/quizzes/components/create-course-form/CreateQuizForm")
);

type Props = {
  lesson: Lesson;
};
const LessonMenu = ({ lesson }: Props) => {
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [isRenameSectionOpen, setIsRenameSectionOpen] = useState(false);
  const [isEditQuizOpen, setIsEditQuizOpen] = useState(false);

  const sectionGroups = useAppSelector(
    (state) => state.CreateCourse.sectionGroups
  );
  const dispatch = useAppDispatch();
  const findSection = (): Section => {
    const sectionGroup = sectionGroups.find(
      (sectionGroup) => sectionGroup.order === lesson.sectionOrder
    );
    const section = sectionGroup?.sections.find(
      (section) => section.order === lesson.sectionOrder
    );
    return section as Section;
  };
  function handleDeleteLesson() {
    dispatch(
      deleteLesson({
        sectionGroupOrder: lesson.sectionGroupOrder,
        sectionOrder: lesson.sectionOrder,
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
  function onSaveLesson(data: CreateLesson) {
    const section = findSection();

    dispatch(
      editLesson({
        sectionGroupOrder: section.sectionGroupOrder,
        sectionOrder: section.order,
        lessonOrder: lesson.order,
        content: data.content,
        contentType: data.contentType,
        title: data.title,
        videoSource: data.videoSource,
      })
    );
    return toast.message("Lesson updated");
  }
  function onSaveQuiz(data: CreateQuiz) {
    const section = findSection();
    dispatch(
      editQuiz({
        sectionOrder: section.order,
        sectionGroupOrder: section.sectionGroupOrder,
        quiz: {
          answers: data.answers,
          explanation: data.explanation,
          question: data.question,
        },
        lessonOrder: lesson.order,
        title: data.title,
      })
    );
    return toast.message("Quiz updated");
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
          onSave={onSaveLesson}
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
          setIsOpen={setIsEditQuizOpen}
          lesson={lesson}
          onSave={onSaveQuiz}
        />
      </Suspense>
    </>
  );
};

export default memo(LessonMenu);
