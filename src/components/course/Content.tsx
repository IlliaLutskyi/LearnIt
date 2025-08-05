"use client";

import { useAppSelector } from "@/lib/hooks";
import Video from "./Video";
import Text from "./Text";
import Quiz from "./Quiz";

const Content = () => {
  const { currentSection } = useAppSelector((store) => store.CourseView);
  return (
    <div className="flex flex-col gap-1 w-3/4 mx-auto">
      {currentSection?.lessons.map((lesson) => {
        if (lesson.contentType === "Text") {
          return <Text key={lesson.id} lesson={lesson} />;
        }
        if (lesson.contentType === "Video")
          return <Video key={lesson.id} lesson={lesson} />;
        if (lesson.contentType === "Quiz") {
          return <Quiz key={lesson.id} lesson={lesson} />;
        }
        return <></>;
      })}
    </div>
  );
};

export default Content;
