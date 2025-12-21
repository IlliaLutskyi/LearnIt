"use client";
import { lazy, Suspense, useEffect, useState } from "react";
import { Loader } from "@/components/common";
import { setCurrentLessonViewId } from "@/lib/slices/course-view-slice";
import { useAppDispatch } from "@/lib/hooks";
import { useInView } from "react-intersection-observer";
import { DbAnswer, DbLesson } from "@/types";

const Explanation = lazy(() => import("./Explanation"));
type Props = {
  lesson: DbLesson;
};
const Quiz = ({ lesson }: Props) => {
  const [selection, setSelection] = useState<DbAnswer>();
  const [isExplanationShown, setIsExplanationShown] = useState(false);
  const dispatch = useAppDispatch();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) dispatch(setCurrentLessonViewId(lesson.id));
  }, [inView, dispatch, lesson.id]);

  function handleCheck(answer: DbAnswer) {
    if (selection) return;

    setSelection(answer);

    setIsExplanationShown(true);
  }

  return (
    <article id={`lesson-${lesson.id}`}>
      <div ref={ref} id={`lesson-${lesson.id}`} />

      <div
        className="flex flex-col gap-2 w-7/8 mx-auto my-4"
        id={`lesson-${lesson.id}`}
        ref={ref}
      >
        <h1 className="text-sm text-center font-bold">
          {lesson.quiz?.question}
        </h1>

        <section>
          {isExplanationShown && lesson.quiz?.explanation && (
            <Suspense fallback={<Loader />}>
              <Explanation content={lesson.quiz?.explanation} />
            </Suspense>
          )}
        </section>

        <section className="flex flex-col gap-2">
          {lesson.quiz?.answers.map((answer) => {
            const isRight =
              selection?.isCorrect && selection.id === answer.id
                ? "bg-success ring-ring-success text-success-foreground"
                : "";

            const isWrong =
              selection?.isCorrect === false && selection.id === answer.id
                ? "bg-error ring-ring-error text-error-foreground"
                : "";

            return (
              <button
                key={answer.id}
                className={`p-2 ring-1 hover:scale-95 ${isRight} ${isWrong} duration-400`}
                onClick={() => handleCheck(answer)}
              >
                <p className="text-sm">{answer.content}</p>
              </button>
            );
          })}
        </section>
      </div>
    </article>
  );
};

export default Quiz;
