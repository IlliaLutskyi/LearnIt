"use client";
import { useAppDispatch } from "@/lib/hooks";
import { addLessonToSection, editLesson } from "@/lib/slices/CreateCourseSlice";
import { FormEvent, useEffect, useRef, useState } from "react";
import InputField from "../common/InputField";
import BlurBackground from "../common/BlurBackground";
import { toast } from "sonner";
import { Lesson } from "@/types/lesson";
type contentType = "Text" | "Video" | "File" | "Quiz";
type Props = {
  isOpen: boolean;
  order: number;
  lesson?: Lesson;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateLessonForm = ({ isOpen, order, setIsOpen, lesson }: Props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    contentType: contentType;
    videoSource?: string;
  }>({ title: "", content: "", contentType: "Text", videoSource: "Youtube" });

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
          sectionOrder: order,
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
          contentType: formData.contentType,
          title: formData.title,
          sectionOrder: order,
          lessonOrder: String(lesson.order),
          videoSource: formData.videoSource ? "Youtube" : undefined,
        })
      );
    }
    setIsOpen(false);
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
            className="flex flex-col gap-4 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] px-15 py-10 w-3/4  bg-white rounded-sm"
            onSubmit={handleSubmit}
            method="post"
          >
            <h1 className="text-lg font-bold text-center">
              Create content for a lesson
            </h1>

            <section className="flex gap-4 items-center">
              <label>Content type:</label>
              <select
                className="outline-0  text-sm shadow-sm p-2 rounded-md"
                value={formData.contentType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contentType: e.target.value as contentType,
                  })
                }
              >
                <option value="Text">Text</option>
                <option value="Video">Video</option>
                <option value="File" disabled>
                  File
                </option>
              </select>
            </section>

            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <InputField
                  label="Title"
                  type="text"
                  value={formData.title}
                  placeholder="Lesson..."
                  name="title"
                  inputClassName="w-full text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 focus:ring-1 focus:ring-purple-500 rounded-md "
                  onChange={handleChange}
                />
              </div>

              {formData.contentType === "Text" && (
                <InputField
                  multiline={true}
                  label="Content"
                  type="text"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  inputClassName="w-full text-sm p-2 focus:ring-1 focus:ring-purple-500 shadow-sm rounded-md h-[10rem]"
                />
              )}

              {formData.contentType === "Video" && (
                <>
                  <section className="flex gap-4 items-center">
                    <label>Video Source:</label>
                    <select
                      value={formData.videoSource}
                      onChange={handleChange}
                      className="outline-0  text-sm shadow-sm p-2 rounded-md"
                    >
                      <option value={"Youtube"}>Youtube</option>
                    </select>
                  </section>
                  <InputField
                    label="Video URL (YouTube):"
                    onChange={handleChange}
                    name="content"
                    value={formData.content}
                    rootClassName="flex gap-1 items-center"
                    placeholder="https://www.youtube.com/watch?v=zHNxbJeEa"
                    inputClassName="w-full text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 focus:ring-1 focus:ring-purple-500 rounded-md "
                  />
                </>
              )}
              {formData.contentType === "File" && <input type="file" />}
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
