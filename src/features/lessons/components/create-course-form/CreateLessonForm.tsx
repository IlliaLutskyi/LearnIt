"use client";
import { lazy, Suspense, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Lesson } from "@/types/create-course";
import { Loader, BlurBackground, Input } from "@/components/common";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateLesson,
  CreateLessonSchema,
} from "@/features/lessons/schemas/create-lesson-schema";
import { DbLesson } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { formEmergenceVariants } from "@/features/animations/form-emergence";
const MarkdownOption = lazy(() => import("./lessonTypeOptions/MarkdownOption"));
const TableOption = lazy(() => import("./lessonTypeOptions/TableOption"));
const VideoOption = lazy(() => import("./lessonTypeOptions/VideoOption"));
const TextOption = lazy(() => import("./lessonTypeOptions/TextOption"));
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lesson?: Lesson | DbLesson;
  onSave?: (data: CreateLesson) => void;
};
const CreateLessonForm = ({ isOpen, setIsOpen, lesson, onSave }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(CreateLessonSchema),
    defaultValues: {
      contentType: "Text",
    },
  });
  const contentType = watch("contentType");

  useEffect(() => {
    if (lesson) {
      setValue("title", lesson.title);
      setValue("content", lesson.content || "");
      setValue("contentType", lesson.contentType);
      setValue(
        "videoSource",
        lesson.videoSource ? lesson.videoSource : undefined
      );
    }
  }, [lesson, isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.id === "create-lesson-anchor") return;
      if (
        formRef.current &&
        !formRef.current.contains(target.closest("form"))
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function onSubmit(data: CreateLesson) {
    if (onSave) onSave(data);

    toast.success(
      `Lesson ${data.title} was ${lesson ? "updated" : "added"} successfully`
    );

    reset();

    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <BlurBackground />
          <motion.form
            ref={formRef}
            variants={formEmergenceVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-11/12 bg-white rounded-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-lg font-bold text-center">
              Create content for a lesson
            </h1>
            <section className="flex gap-4 items-center">
              <label className="text-xs" htmlFor="lessonType">
                Content type:
              </label>
              <select
                id="lessonType"
                className="outline-0 text-xs shadow-sm p-2 rounded-sm"
                {...register("contentType")}
              >
                <option value="Text">Text</option>
                <option value="Video">Video</option>
                <option value="Table">Excel Table</option>
                <option value="Markdown">Markdown</option>
              </select>
            </section>
            <section className="grow flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  label="title"
                  {...register("title")}
                  error={errors.title?.message}
                  placeholder="e.g. introduction"
                  name="title"
                  className="w-full text-sm outline-none focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
                />
              </div>

              {contentType === "Text" && (
                <Suspense fallback={<Loader />}>
                  <TextOption
                    content={watch("content")}
                    setValue={setValue}
                    error={errors.content?.message}
                  />
                </Suspense>
              )}

              {contentType === "Video" && (
                <Suspense fallback={<Loader />}>
                  <VideoOption
                    register={register}
                    error={errors.content?.message}
                  />
                </Suspense>
              )}
              {contentType === "Table" && (
                <Suspense fallback={<Loader />}>
                  <TableOption setValue={setValue} />
                </Suspense>
              )}
              {contentType === "Markdown" && (
                <Suspense fallback={<Loader />}>
                  <MarkdownOption setValue={setValue} />
                </Suspense>
              )}
            </section>
            <button
              type="submit"
              className="bg-purple-500 p-2 rounded-md text-sm text-white self-end"
            >
              Save
            </button>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateLessonForm;
