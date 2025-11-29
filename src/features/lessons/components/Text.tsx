import { useAppDispatch } from "@/lib/hooks";
import { setCurrentLessonViewId } from "@/lib/slices/course-view-slice";
import { DbLesson } from "@/types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { generateHTML } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { Lesson } from "@/types/create-course";
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
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: lesson.content
            ? generateHTML(JSON.parse(lesson.content), [StarterKit, Image])
            : "",
        }}
      />
    </div>
  );
};

export default Text;
