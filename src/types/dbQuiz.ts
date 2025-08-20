import { DbAnswer } from "./dbAnswers";

export type DbQuiz = {
  id: number;
  lessonId: number;
  question: string;
  explanation: string | null;
  answers: DbAnswer[];
};
