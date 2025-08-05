import { useAppDispatch } from "@/lib/hooks";
import { setCurrentLesson } from "@/lib/slices/CourseViewSlice";
import { DBLesson } from "@/types/dbLesson";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
type Props = {
  lesson: DBLesson;
};
const Text = ({ lesson }: Props) => {
  const dispatch = useAppDispatch();
  const [ref, inView] = useInView({
    threshold: 0.55,
    triggerOnce: false,
  });
  useEffect(() => {
    if (inView) dispatch(setCurrentLesson(lesson));
  }, [inView, lesson]);
  return (
    <div>
      <h1 className="font-bold">{lesson.title}</h1>
      <div className="flex flex-col gap-1 ">
        {lesson.content?.split("\n").map((line, index) => {
          return (
            <p
              id={`lesson-${lesson.id}`}
              key={index}
              ref={ref}
              className="text-pretty whitespace-pre-wrap break-words"
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Text;
