import { useAppDispatch } from "@/lib/hooks";
import { setCurrentLessonViewId } from "@/lib/slices/CourseViewSlice";
import { DbLesson } from "@/types/dbLesson";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
type Props = {
  lesson: DbLesson;
};
const Text = ({ lesson }: Props) => {
  const dispatch = useAppDispatch();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) dispatch(setCurrentLessonViewId(lesson.id));
  }, [inView]);
  return (
    <div>
      <div ref={ref} id={`lesson-${lesson.id}`} />
      <h1 className="font-bold">{lesson.title}</h1>
      <div
        className="prose prose-sm whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{
          __html: lesson.content ? lesson.content : "",
        }}
      />
    </div>
  );
};

export default Text;
