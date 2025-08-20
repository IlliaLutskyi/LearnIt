import { useAppDispatch } from "@/lib/hooks";
import { setCurrentLessonViewId } from "@/lib/slices/CourseViewSlice";
import { DbLesson } from "@/types/dbLesson";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  lesson: DbLesson;
};
const Video = ({ lesson }: Props) => {
  const dispatch = useAppDispatch();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) dispatch(setCurrentLessonViewId(lesson.id));
  }, [inView]);
  function getURl() {
    if (lesson.videoSource === "Youtube") {
      const url = new URL(lesson.content!);
      return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
    }
  }
  return (
    <iframe
      src={getURl()}
      ref={ref}
      allowFullScreen
      className="w-full aspect-video my-5"
      id={`lesson-${lesson.id}`}
    />
  );
};

export default Video;
