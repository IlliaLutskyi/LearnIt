import { useAppDispatch } from "@/lib/hooks";
import { setCurrentLessonViewId } from "@/lib/slices/course-view-slice";
import { DbLesson } from "@/types";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { convertLessonUrl } from "../utils/convertLessonUrl";
import { createSlug } from "@/features/courses/utils/create-slug";

type Props = {
  lesson: DbLesson;
};
const Video = ({ lesson }: Props) => {
  const [ref, inView] = useInView();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inView) dispatch(setCurrentLessonViewId(lesson.id));
  }, [inView, dispatch, lesson.id]);

  if (!lesson.content || !lesson.videoSource) return null;

  return (
    <>
      <div ref={ref} id={createSlug(lesson.title)} />
      <iframe
        src={convertLessonUrl(lesson.content, lesson.videoSource)}
        ref={ref}
        allowFullScreen
        className="w-full aspect-video my-5"
        id={`lesson-${lesson.id}`}
      />
    </>
  );
};

export default Video;
