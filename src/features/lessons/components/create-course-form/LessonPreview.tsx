import { DbLesson } from "@/types";
import { Lesson } from "@/types/create-course";
import React from "react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { generateHTML } from "@tiptap/react";
import { convertTableToHtml } from "@/utils/convertTableToHtml";
import Quiz from "@/features/quizzes/components/create-course-form/Quiz";
type Props = {
  lesson: Lesson | DbLesson;
};
const LessonPreview = ({ lesson }: Props) => {
  return (
    <>
      {lesson.contentType === "Video" && (
        <iframe
          src={lesson.content || ""}
          className="w-full aspect-vordereo p-4"
        />
      )}
      {lesson.contentType === "Quiz" && (
        <Quiz quiz={lesson.quiz!} key={lesson.order} />
      )}
      {lesson.contentType === "Text" && (
        <div
          className="content mx-auto"
          dangerouslySetInnerHTML={{
            __html: lesson.content
              ? generateHTML(JSON.parse(lesson.content), [StarterKit, Image])
              : "",
          }}
        />
      )}
      {lesson.contentType === "Table" && (
        <div
          className="conent mx-auto"
          dangerouslySetInnerHTML={{
            __html: lesson.content
              ? convertTableToHtml(JSON.parse(lesson.content))
              : "",
          }}
        />
      )}
      {lesson.contentType === "Markdown" && (
        <div
          className="content mx-auto"
          dangerouslySetInnerHTML={{
            __html: lesson.content || "",
          }}
        />
      )}
      {lesson.contentType === "Image" && (
        <img
          className="mx-auto rounded-sm"
          width={400}
          src={lesson.content ? lesson.content : ""}
          alt={lesson.title}
        />
      )}
    </>
  );
};

export default LessonPreview;
