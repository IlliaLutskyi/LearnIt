import type { Quiz } from "@/types/quiz";
import React from "react";

type Props = {
  quiz: Quiz;
};
const Quiz = ({ quiz }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-center text-lg">{quiz.question}</h1>
      {quiz.answers.map((answer, index) => {
        if (answer.isCorrect) {
          return (
            <div
              className="p-4 ring-1 ring-green-400 hover:bg-gray-300 "
              key={index}
            >
              <h1 className="text-center text-sm">{answer.content}</h1>
            </div>
          );
        }
        return (
          <div
            className="p-4 ring-1 ring-gray-400 hover:bg-gray-300"
            key={index}
          >
            <h1 className="text-center text-sm">{answer.content}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Quiz;
