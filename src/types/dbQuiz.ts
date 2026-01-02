import { DbAnswer } from "./dbAnswers";

export type DbQuiz = {
  id: string;
  question: string;
  explanation: string | null;
  answers: DbAnswer[];
  lessonId?: string;
};
