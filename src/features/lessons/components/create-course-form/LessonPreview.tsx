import { Lesson } from "@/types/create-course";
import React from "react";
import { convertTableToHtml } from "@/utils/convertTableToHtml";
import Quiz from "@/features/quizzes/components/create-course-form/Quiz";
import * as styles from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { isJsonValid } from "@/utils/isJsonValid";
import { convertLessonUrl } from "../../utils/convertLessonUrl";
type Props = {
  lesson: Omit<Lesson, "sectionGroupOrder" | "sectionOrder">;
};
const LessonPreview = ({ lesson }: Props) => {
  return (
    <section>
      {lesson.contentType === "Video" && (
        <iframe
          src={convertLessonUrl(lesson.content!, lesson.videoSource!)}
          className="w-full min-h-[400px] aspect-vordereo p-4"
        />
      )}
      {lesson.contentType === "Quiz" && (
        <Quiz quiz={lesson.quiz!} key={lesson.order} />
      )}
      {lesson.contentType === "Text" && (
        <div
          className="content mx-auto"
          dangerouslySetInnerHTML={{
            __html: lesson.content || "",
          }}
        />
      )}
      {lesson.contentType === "Table" && (
        <div
          className="content mx-auto"
          dangerouslySetInnerHTML={{
            __html:
              lesson.content && isJsonValid(lesson.content)
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
      {lesson.contentType === "HighlightedCode" && (
        <div>
          <SyntaxHighlighter
            style={styles[lesson.codeStyle as keyof typeof styles]}
            wrapLongLines
          >
            {lesson.content || ""}
          </SyntaxHighlighter>
        </div>
      )}
    </section>
  );
};

export default LessonPreview;
