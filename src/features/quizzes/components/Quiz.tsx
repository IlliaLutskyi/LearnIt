"use client";
import { lazy, Suspense, useEffect, useState } from "react";
import { Loader } from "@/components/common";
import { setCurrentLessonViewId } from "@/lib/slices/course-view-slice";
import { useAppDispatch } from "@/lib/hooks";
import { useInView } from "react-intersection-observer";
import { DbLesson } from "@/types";

const Explanation = lazy(() => import("./Explanation"));
type Props = {
  lesson: DbLesson;
};
const Quiz = ({ lesson }: Props) => {
  const [result, setResult] = useState<{
    pick?: number;
    isCorrect?: boolean;
  }>();
  const [isExplanationShown, setIsExplanationShown] = useState(false);

  const dispatch = useAppDispatch();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) dispatch(setCurrentLessonViewId(lesson.id));
  }, [inView]);

  function handleCheck(pick: number) {
    if (result?.isCorrect !== undefined) return;
    const rightAnswer = lesson.quiz?.answers.find((answer) => answer.isCorrect);
    if (pick === rightAnswer?.id) {
      setResult({ isCorrect: true, pick: pick });
    } else {
      setResult({ isCorrect: false, pick: pick });
    }
    setIsExplanationShown(true);
  }
  return (
    <>
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
              result?.pick === answer.id && result?.isCorrect
                ? "bg-green-300 ring-green-400"
                : "";

            const isWrong =
              result?.pick === answer.id && result?.isCorrect === false
                ? "bg-red-300 ring-red-400"
                : "";

            return (
              <div
                key={answer.id}
                className={`p-2 ring-1 ring-gray-400 hover:scale-95 duration-500 ${isRight} ${isWrong}`}
                onClick={() => handleCheck(answer.id)}
              >
                <p className="text-sm">{answer.content}</p>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default Quiz;
