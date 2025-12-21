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
import { CreateQuiz } from "@/features/quizzes/schemas/create-quiz";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { isAxiosError } from "axios";

const ConfirmationForm = lazy(
  () => import("@/components/common/ConfirmationForm")
);
const CreateLessonForm = lazy(
  () =>
    import("@/features/lessons/components/create-course-form/CreateLessonForm")
);
const CreateQuizForm = lazy(
  () =>
    import("@/features/quizzes/components/create-course-form/CreateQuizForm")
);

type Props = {
  lesson: DbLesson;
};
const LessonMenu = ({ lesson }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [isEditQuizOpen, setIsEditQuizOpen] = useState(false);

  const lessonMutation = useMutation({
    mutationFn: async (data: CreateLesson) => {
      const res = await api.patch(`/lessons/${lesson.id}`, data);
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/lessons/${lesson.id}`);
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  const quizMutation = useMutation({
    mutationFn: async (data: CreateQuiz) => {
      const res = await api.patch(`/quizzes/${lesson?.quiz?.id}`, data);
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });
  function openConformationForm() {
    dispatch(toggleConfirmationForm(true));
  }
  function handleEditLesson() {
    setIsEditLessonOpen(true);
  }
  function handleEditQuiz() {
    setIsEditQuizOpen(true);
  }
  async function onSaveLesson(data: CreateLesson) {
    await lessonMutation.mutateAsync(data);
  }

  async function handleDeleteLesson() {
    await deleteLessonMutation.mutateAsync();
  }

  async function onSaveQuiz(data: CreateQuiz) {
    await quizMutation.mutateAsync(data);
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

            <MenubarItem onClick={openConformationForm}>
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
        <ConfirmationForm onYes={handleDeleteLesson} warning="Are you sure?" />
      </Suspense>
    </>
  );
};

export default memo(LessonMenu);
