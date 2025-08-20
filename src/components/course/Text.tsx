import { useAppDispatch } from "@/lib/hooks";
import { setCurrentLessonViewId } from "@/lib/slices/CourseViewSlice";
import { DbLesson } from "@/types/dbLesson";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { generateHTML } from "@tiptap/react";
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
    <div id={`lesson-${lesson.id}`} ref={ref} className="">
      <h1 className="font-bold">{lesson.title}</h1>
      <div
        className="prose prose-sm whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{
          __html: generateHTML(JSON.parse(lesson.content!), [
            StarterKit.configure({}),
          ]),
        }}
      />
    </div>
  );
};

export default Text;
