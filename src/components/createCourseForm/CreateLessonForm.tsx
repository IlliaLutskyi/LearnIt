"use client";
import { useAppDispatch } from "@/lib/hooks";
import { addLessonToSection, editLesson } from "@/lib/slices/CreateCourseSlice";
import { FormEvent, lazy, Suspense, useEffect, useRef, useState } from "react";
import InputField from "../common/InputField";
import BlurBackground from "../common/BlurBackground";
import { toast } from "sonner";
import { Lesson } from "@/types/lesson";
import Loader from "../common/Loader";
const VideoOption = lazy(() => import("./lessonTypeOptions/VideoOption"));
const TextOption = lazy(() => import("./lessonTypeOptions/TextOption"));

type contentType = "Text" | "Video" | "File" | "Quiz";
type Props = {
  isOpen: boolean;
  sectionOrder: number;
  sectionGroupOrder: number;
  lesson?: Lesson;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type CreateLesson = {
  title: string;
  content: string;
  contentType: contentType;
  videoSource?: "Youtube";
};
const CreateLessonForm = ({
  isOpen,
  sectionOrder,
  sectionGroupOrder,
  setIsOpen,
  lesson,
}: Props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<CreateLesson>({
    title: "",
    content: "",
    contentType: "Text",
    videoSource: "Youtube",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title,
        content: lesson.content || "",
        contentType: lesson.contentType,
        videoSource: lesson.videoSource,
      });
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

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.title) return toast.error("Title is required");

    if (!formData.content) return toast.error("Content is required");

    if (!lesson) {
      dispatch(
        addLessonToSection({
          sectionGroupOrder,
          sectionOrder,
          content: formData.content,
          contentType: formData.contentType,
          title: formData.title,
          videoSource: formData.videoSource ? "Youtube" : undefined,
        })
      );
    } else {
      dispatch(
        editLesson({
          content: formData.content,
          sectionGroupOrder: lesson.sectionGroupId,
          contentType: formData.contentType,
          title: formData.title,
          sectionOrder,
          lessonOrder: String(lesson.order),
          videoSource: formData.videoSource ? "Youtube" : undefined,
        })
      );
    }
    setIsOpen(false);
    setFormData({
      title: "",
      content: "",
      contentType: "Text",
      videoSource: "Youtube",
    });

    toast.success(
      `Lesson ${formData.title} was ${
        lesson ? "updated" : "added"
      } successfully`
    );
  }

  return (
    <>
      {isOpen && (
        <>
          <BlurBackground />
          <form
            ref={formRef}
            className="flex flex-col gap-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-6 w-9/10 bg-white rounded-sm"
            onSubmit={handleSubmit}
            method="post"
          >
            <h1 className="text-lg font-bold text-center">
              Create content for a lesson
            </h1>
            <section className="flex gap-4 items-center">
              <label className="text-sm">Content type:</label>
              <select
                className="outline-0  text-sm shadow-sm p-2 rounded-md"
                value={formData.contentType}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    contentType: e.target.value as contentType,
                    content: e.target.value === "Video" ? "" : formData.content,
                  });
                }}
              >
                <option value="Text">Text</option>
                <option value="Video">Video</option>
              </select>
            </section>

            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <InputField
                  label="Title"
                  type="text"
                  maxLength={50}
                  value={formData.title}
                  placeholder="e.g. introduction"
                  name="title"
                  inputClassName="w-full text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 focus:ring-1 focus:ring-purple-500 rounded-md "
                  onChange={handleChange}
                />
              </div>

              {formData.contentType === "Text" && (
                <Suspense fallback={<Loader />}>
                  <TextOption formData={formData} setFormData={setFormData} />
                </Suspense>
              )}

              {formData.contentType === "Video" && (
                <Suspense fallback={<Loader />}>
                  <VideoOption formData={formData} setFormData={setFormData} />
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
      )}
    </>
  );
};

export default CreateLessonForm;
