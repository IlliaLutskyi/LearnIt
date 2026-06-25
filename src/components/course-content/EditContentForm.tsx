"use client";
import { DbSection } from "@/types";
import { lazy, memo, SetStateAction, Suspense, useState } from "react";
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
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Loader } from "../common";
import {
  EditSection,
  EditSectionSchema,
} from "@/features/sections/schemas/edit-section-schema";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import { CreateQuiz } from "@/features/quizzes/schemas/create-quiz";
import { GenerateLesson } from "@/features/lessons/schemas/generate-lesson-schema";
import { AiResponse } from "@/features/lessons/schemas/ai-response-schema";
import { SiGooglegemini } from "react-icons/si";
import ConfirmationForm from "../common/ConfirmationForm";
import Change from "../course-details/Change";

const CreateLessonForm = lazy(
  () =>
    import("@/features/lessons/components/create-course-form/CreateLessonForm"),
);
const CreateQuizForm = lazy(
  () =>
    import("@/features/quizzes/components/create-course-form/CreateQuizForm"),
);
const GenerateLessonForm = lazy(
  () =>
    import("@/features/lessons/components/create-course-form/GenerateLessonForm"),
);

type Props = {
  section?: DbSection;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  onSave?: (data: EditSection) => Promise<void>;
};

const EditContentForm = ({ section, isOpen, setIsOpen, onSave }: Props) => {
  const [isAddLessonFormOpen, setIsAddLessonFormOpen] = useState(false);
  const [isAddQuizFormOpen, setIsAddQuizFormOpen] = useState(false);
  const [isGenerateLessonFormOpen, setIsGenerateLessonFormOpen] =
    useState(false);
  const [isConfirmationFormOpen, setIsConfirmationFormOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(EditSectionSchema),
    defaultValues: section
      ? {
          title: section.title,
          lessons: section?.lessons?.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            contentType: lesson.contentType,
            order: lesson.order,
            codeStyle: lesson.codeStyle || undefined,
            videoSource: lesson.videoSource || undefined,
            content: lesson.content || undefined,
            quiz: lesson.quiz
              ? {
                  ...lesson.quiz,
                  explanation: lesson?.quiz?.explanation || undefined,
                }
              : undefined,
          })),
        }
      : {},
  });

  const {
    fields: lessons,
    append,
    update,
    remove,
  } = useFieldArray({
    control: control,
    name: "lessons",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(e: DragEndEvent) {
    const { over, active } = e;
    if (!lessons) return;
    if (over?.id !== active?.id) {
      const oldIndex = lessons.findIndex(
        (lesson) => lesson.order === active.id,
      );
      const newIndex = lessons.findIndex((lesson) => lesson.order === over?.id);
      return setValue("lessons", arrayMove(lessons, oldIndex, newIndex));
    }
  }
  function showChanges() {
    return (
      <section className="flex flex-col gap-3">
        {lessons.map((lesson) => {
          if (!lesson.action) return null;

          return (
            <Change
              changeType={lesson.action}
              title={lesson.title}
              key={lesson.order}
            />
          );
        })}
      </section>
    );
  }

  function removeLesson(index: number) {
    if (lessons[index].action === "create") return remove(index);

    return update(index, { ...lessons[index], action: "delete" });
  }
  function updateLesson(index: number, data: EditSection["lessons"][number]) {
    update(index, { ...data, action: "update" });
  }
  async function onAddQuiz(data: CreateQuiz) {
    append({
      title: data.title,
      content: "",
      contentType: "Quiz",
      order: lessons.length + 1,
      action: "create",
      quiz: {
        answers: data.answers.map((answer) => ({
          content: answer.content,
          isCorrect: answer.isCorrect,
        })),
        explanation: data.explanation,
        question: data.question,
      },
    });
  }

  async function onAddLesson(data: CreateLesson) {
    append({
      title: data.title,
      content: data.content,
      contentType: data.contentType,
      order: lessons.length + 1,
      action: "create",
    });
  }
  async function onGenerateLesson(
    data: GenerateLesson & { lesson: AiResponse },
  ) {
    append({
      title: data.title,
      content: data.lesson.content,
      contentType: data.lesson.contentType,
      order: lessons.length + 1,
      action: "create",
    });
  }
  async function onYes(data: EditSection) {
    if (!isDirty) return;
    const lessons = data.lessons.map((lesson) => {
      const existing = section!.lessons!.find((l) => l.title === lesson.title);
      if (existing) {
        return {
          ...lesson,
          id: existing.id,
        };
      }
      return lesson;
    });
    await onSave?.({ ...data, lessons });
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            onOpenChange={() => {
              reset();
              setIsOpen(false);
            }}
          >
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
                    className="button-base flex items-center gap-2"
                    onClick={() => setIsGenerateLessonFormOpen(true)}
                  >
                    <SiGooglegemini /> Generate Lesson
                  </button>

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
                  {lessons.length === 0 ? (
                    <p className="text-sm text-center">No lessons yet</p>
                  ) : (
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
                          {lessons.map((lesson, index) => {
                            return (
                              <Lesson
                                key={index}
                                lesson={lesson}
                                removeLesson={() => removeLesson(index)}
                                updateLesson={(
                                  data: EditSection["lessons"][number],
                                ) => updateLesson(index, data)}
                              />
                            );
                          })}
                        </SortableContext>
                      </div>
                    </DndContext>
                  )}
                </section>

                <button
                  className="button-base self-end"
                  onClick={() => setIsConfirmationFormOpen(true)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader /> : "Save"}
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
        <GenerateLessonForm
          isOpen={isGenerateLessonFormOpen}
          setIsOpen={setIsGenerateLessonFormOpen}
          onSave={onGenerateLesson}
        />
        <ConfirmationForm
          isOpen={isConfirmationFormOpen}
          setIsOpen={setIsConfirmationFormOpen}
          onYes={handleSubmit(onYes, () => console.log(errors))}
          message="Are you sure, you wanna save changes?"
          description="This action cannot be undone."
          body={showChanges()}
        />
      </Suspense>
    </>
  );
};

export default memo(EditContentForm);
