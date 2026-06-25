"use client";
import { lazy, Suspense, useEffect, useState } from "react";
import { ContentType, FormLesson } from "@/types/create-course";
import { Loader, Input } from "@/components/common";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateLesson,
  CreateLessonSchema,
} from "@/features/lessons/schemas/create-lesson-schema";
import { AnimatePresence } from "framer-motion";
import ImageOption from "./lessonTypeOptions/ImageOption";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const HighlightedCodeOption = lazy(
  () => import("./lessonTypeOptions/HighlightedCodeOption"),
);
const MarkdownOption = lazy(() => import("./lessonTypeOptions/MarkdownOption"));
const TableOption = lazy(() => import("./lessonTypeOptions/TableOption"));
const VideoOption = lazy(() => import("./lessonTypeOptions/VideoOption"));
const TextOption = lazy(() => import("./lessonTypeOptions/TextOption"));
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lesson?: FormLesson;
  onSave?: (data: CreateLesson) => Promise<unknown>;
};
const CreateLessonForm = ({ isOpen, setIsOpen, lesson, onSave }: Props) => {
  const [drafts, setDrafts] = useState<Partial<Record<ContentType, string>>>(
    lesson ? { [lesson.contentType]: lesson.content || "" } : {},
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(CreateLessonSchema),
    defaultValues: {
      codeStyle: lesson?.codeStyle || undefined,
      title: lesson?.title || "",
      content: lesson?.content || "",
      contentType: lesson?.contentType || "Text",
      videoSource: lesson?.videoSource || "Youtube",
    },
  });
  const contentType = watch("contentType");
  const content = watch("content");
  const codeStyle = watch("codeStyle");

  useEffect(() => {
    if (!isOpen) return;

    if (drafts[contentType]) {
      setValue("content", drafts[contentType]);
    }
  }, [isOpen, contentType, drafts]);

  function saveCurrentDraft() {
    setDrafts({ ...drafts, [contentType]: content });
    setValue("content", "");
  }
  async function onSubmit(data: CreateLesson) {
    if (!isDirty) return;

    await onSave?.(data);

    reset();
    setDrafts({});
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent asChild className="w-11/12 p-6">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <DialogTitle className="text-center text-lg font-bold">
                Create content for a lesson
              </DialogTitle>
              {errors.root && <p className="text-error text-center">{}</p>}

              <section className="flex flex-col gap-1">
                <label className="text-xs" htmlFor="lessonType">
                  Content type
                </label>
                <select
                  id="lessonType"
                  className="input-field"
                  {...register("contentType", {
                    onChange: () => {
                      saveCurrentDraft();
                    },
                  })}
                >
                  <option value="Text">Text</option>
                  <option value="Video">Video</option>
                  <option value="Table">Excel Table</option>
                  <option value="Markdown">Markdown</option>
                  <option value="Image">Image</option>
                  <option value="HighlightedCode">Highlighted Code</option>
                </select>

                <p className="text-error text-xs">
                  {errors.contentType?.message}
                </p>
              </section>
              <section className="grow flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Input
                    label="title"
                    {...register("title")}
                    error={errors.title?.message}
                    placeholder="e.g. introduction"
                    name="title"
                    className="input-field"
                  />
                </div>

                {contentType === "Text" && (
                  <Suspense fallback={<Loader />}>
                    <TextOption
                      isOpen={isOpen}
                      content={content}
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
                {contentType === "Image" && (
                  <Suspense fallback={<Loader />}>
                    <ImageOption setValue={setValue} />
                  </Suspense>
                )}
                {contentType === "HighlightedCode" && (
                  <Suspense fallback={<Loader />}>
                    <HighlightedCodeOption
                      codeStyle={codeStyle}
                      content={content}
                      register={register}
                      error={errors.content?.message}
                    />
                  </Suspense>
                )}
              </section>

              <button
                type="submit"
                className="self-end bg-accent text-accent-foreground text-sm hover:scale-95 p-2 rounded-sm duration-400"
              >
                Save
              </button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default CreateLessonForm;
