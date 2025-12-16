import { useAppDispatch } from "@/lib/hooks";
import { setCurrentLessonViewId } from "@/lib/slices/course-view-slice";
import { DbLesson } from "@/types";
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
  }, [inView, dispatch, lesson.id]);

  return (
    <div>
      <div ref={ref} id={`lesson-${lesson.id}`} />
      <article
        className="content"
        dangerouslySetInnerHTML={{
          __html: lesson.content || "",
        }}
      />
    </div>
  );
};

export default Text;
