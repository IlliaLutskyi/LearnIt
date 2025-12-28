"use client";
import { DbSection } from "@/types";
import {
  lazy,
  memo,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Lesson from "@/features/lessons/components/Lesson";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Loader } from "../common";
import {
  EditSection,
  EditSectionSchema,
} from "@/features/sections/schemas/edit-section-schema";

import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import CreateQuizForm from "@/features/quizzes/components/create-course-form/CreateQuizForm";
import { CreateQuiz } from "@/features/quizzes/schemas/create-quiz";

const CreateLessonForm = lazy(
  () =>
    import("@/features/lessons/components/create-course-form/CreateLessonForm")
);

type Props = {
  section: DbSection;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const EditContentForm = ({ section, isOpen, setIsOpen }: Props) => {
  const router = useRouter();
  const params = useParams();
  const [isAddLessonFormOpen, setIsAddLessonFormOpen] = useState(false);
  const [isAddQuizFormOpen, setIsAddQuizFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    setValue,
  } = useForm({
    resolver: zodResolver(EditSectionSchema),
  });
  const lessons = watch("lessons");

  const saveMutation = useMutation({
    mutationFn: async (data: EditSection) => {
      const res = await api.patch(`/sections/${section.id}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      return router.push(
        `/course/${params.courseSlug}/${params.sectionGroupSlug}/${data.sectionSlug}`
      );
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  const addLessonMutation = useMutation({
    mutationFn: async (data: CreateLesson) => {
      const res = await api.post(`/sections/${section.id}/lessons`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  const addQuizMutation = useMutation({
    mutationFn: async (data: CreateQuiz) => {
      const res = await api.post(`/sections/${section.id}/quizzes`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    setValue("title", section.title);

    if (!section.lessons) return;
    setValue("lessons", section.lessons);
  }, [section]);

  function handleDragEnd(e: DragEndEvent) {
    const { over, active } = e;
    if (!lessons) return;
    if (over?.id !== active?.id) {
      const oldIndex = lessons.findIndex(
        (lesson) => lesson.order === active.id
      );
      const newIndex = lessons.findIndex((lesson) => lesson.order === over?.id);
      return setValue("lessons", arrayMove(lessons, oldIndex, newIndex));
    }
  }

  async function onAddQuiz(data: CreateQuiz) {
    await addQuizMutation.mutateAsync(data);
  }

  async function onAddLesson(data: CreateLesson) {
    await addLessonMutation.mutateAsync(data);
  }

  async function onSubmit(data: EditSection) {
    if (!isDirty) return;

    await saveMutation.mutateAsync(data);
  }

  if (!lessons) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
              asChild
              className="w-9/10 p-6 bg-popover text-popover-foreground"
            >
              <div className="flex flex-col gap-4">
                <DialogTitle className="text-center text-lg font-bold">
                  Edit Content
                </DialogTitle>

                <Input
                  {...register("title")}
                  label="title"
                  className="input-field"
                  error={errors.title?.message}
                />

                <section className="flex justify-end gap-2">
                  <button
                    className="button-base"
                    onClick={() => setIsAddQuizFormOpen(true)}
                  >
                    Add Quiz
                  </button>
                  <button
                    className="button-base"
                    onClick={() => setIsAddLessonFormOpen(true)}
                  >
                    Add Lesson
                  </button>
                </section>

                <section className="grow">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <div
                      className="flex flex-col gap-2 overflow-y-auto h-[24rem] max-h-full p-2"
                      id="scrollbar"
                    >
                      <SortableContext
                        items={lessons.map((lesson) => lesson.order)}
                        strategy={verticalListSortingStrategy}
                      >
                        {lessons.map((lesson) => {
                          return <Lesson key={lesson.id} lesson={lesson} />;
                        })}
                      </SortableContext>
                    </div>
                  </DndContext>
                </section>

                <button
                  className="button-base self-end"
                  onClick={handleSubmit(onSubmit)}
                  disabled={saveMutation.isPending}
                >
                  {saveMutation.isPending ? <Loader /> : "Save"}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <Suspense>
        <CreateLessonForm
          isOpen={isAddLessonFormOpen}
          setIsOpen={setIsAddLessonFormOpen}
          onSave={onAddLesson}
        />
        <CreateQuizForm
          isOpen={isAddQuizFormOpen}
          setIsOpen={setIsAddQuizFormOpen}
          onSave={onAddQuiz}
        />
      </Suspense>
    </>
  );
};

export default memo(EditContentForm);
