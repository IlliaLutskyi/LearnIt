import { DbQuiz } from "@/types";
import { Quiz as TQuiz } from "@/types/create-course";
import { Loader } from "lucide-react";
import React from "react";
import { Suspense } from "react";
import Explanation from "../Explanation";

type Props = {
  quiz: TQuiz | DbQuiz;
};
const Quiz = ({ quiz }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-center text-lg">{quiz.question}</h1>

      <section>
        {quiz.explanation && (
          <Suspense fallback={<Loader />}>
            <Explanation content={quiz.explanation} />
          </Suspense>
        )}
      </section>

      {quiz.answers.map((answer, index) => {
        if (answer.isCorrect) {
          return (
            <div
              className="bg-success ring-1 ring-ring-success text-success-foreground p-2 hover:scale-95 duration-400"
              key={index}
            >
              <h1 className="text-center text-sm">{answer.content}</h1>
            </div>
          );
        }
        return (
          <button
            className="p-2 ring-1 hover:scale-95 duration-400"
            disabled={true}
            key={index}
          >
            <p className="text-sm">{answer.content}</p>
          </button>
        );
      })}
    </div>
  );
};

export default Quiz;
