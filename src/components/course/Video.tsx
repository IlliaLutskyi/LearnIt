import { useAppDispatch } from "@/lib/hooks";
import { setCurrentLesson } from "@/lib/slices/CourseViewSlice";
import { DBLesson } from "@/types/dbLesson";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  lesson: DBLesson;
};
const Video = ({ lesson }: Props) => {
  const dispatch = useAppDispatch();
  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: false,
  });
  function getURl() {
    if (lesson.videoSource === "Youtube") {
      const url = new URL(lesson.content!);
      return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
    }
  }
  useEffect(() => {
    if (inView) dispatch(setCurrentLesson(lesson));
  }, [inView, lesson]);
  return (
    <iframe
      src={getURl()}
      ref={ref}
      className="w-full aspect-video"
      id={`lesson-${lesson.id}`}
    />
  );
};

export default Video;
