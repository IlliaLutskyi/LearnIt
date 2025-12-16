"use client";

import { useAppDispatch } from "@/lib/hooks";
import { setCurrentLessonViewId } from "@/lib/slices/course-view-slice";
import { DbLesson } from "@/types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  lesson: DbLesson;
};
const Image = ({ lesson }: Props) => {
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      dispatch(setCurrentLessonViewId(lesson.id));
    }
  }, [inView, dispatch, lesson.id]);

  return (
    <>
      <div ref={ref} id={`lesson-${lesson.id}`} />
      <img
        src={lesson.content ? lesson.content : ""}
        loading="lazy"
        alt={lesson.title}
        width={600}
        className="mx-auto rounded-sm"
      />
    </>
  );
};

export default Image;
