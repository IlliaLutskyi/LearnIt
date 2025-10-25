"use client";
import { useAppDispatch } from "@/lib/hooks";
import {
  addLessonToSection,
  editLesson,
} from "@/lib/slices/create-course-slice";
import { lazy, Suspense, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Lesson } from "@/types/create-course";
import { Loader, BlurBackground, Input } from "@/components/common";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateLessonSchema } from "@/features/lessons/schemas/create-lesson-schema";

const MarkdownOption = lazy(() => import("./lessonTypeOptions/MarkdownOption"));
const TableOption = lazy(() => import("./lessonTypeOptions/TableOption"));
const VideoOption = lazy(() => import("./lessonTypeOptions/VideoOption"));
const TextOption = lazy(() => import("./lessonTypeOptions/TextOption"));

type CreateLesson = z.infer<typeof CreateLessonSchema>;
type Props = {
  isOpen: boolean;
  sectionId?: string;
  sectionOrder?: number;
  sectionGroupOrder?: number;
  lesson?: Lesson;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateLessonForm = ({
  isOpen,
  sectionOrder,
  sectionGroupOrder,
  setIsOpen,
  lesson,
}: Props) => {
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

  const dispatch = useAppDispatch();
  const contentType = watch("contentType");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (lesson) {
      setValue("title", lesson.title);
      setValue("content", lesson.content || "");
      setValue("contentType", lesson.contentType);
      setValue("videoSource", lesson.videoSource);
    }
  }, [lesson, isOpen]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (
      formRef.current &&
      !formRef.current.contains(target) &&
      target.id !== "create-lesson-anchor"
    ) {
      setIsOpen(false);
    }
  }

  function onSubmit(data: CreateLesson) {
    if (!lesson && sectionGroupOrder && sectionOrder) {
      dispatch(
        addLessonToSection({
          sectionGroupOrder,
          sectionOrder,
          content: data.content,
          contentType: data.contentType,
          title: data.title,
          videoSource: data.videoSource,
        })
      );
    }

    if (lesson && sectionGroupOrder && sectionOrder) {
      dispatch(
        editLesson({
          content: data.content,
          sectionGroupOrder: lesson.sectionGroupId,
          contentType: data.contentType,
          title: data.title,
          sectionOrder,
          lessonOrder: String(lesson.order),
          videoSource: data.videoSource,
        })
      );
    }

    if (lesson && !sectionGroupOrder && !sectionOrder) {
      return;
    }

    reset();
    setIsOpen(false);

    toast.success(
      `Lesson ${data.title} was ${lesson ? "updated" : "added"} successfully`
    );
  }

  if (!isOpen) return null;

  return (
    <>
      <BlurBackground />
      <form
        ref={formRef}
        className="flex flex-col gap-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-6 w-9/10 bg-white rounded-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-bold text-center">
          Create content for a lesson
        </h1>
        <section className="flex gap-4 items-center">
          <label className="text-xs">Content type:</label>
          <select
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
      </form>
    </>
  );
};

export default CreateLessonForm;
