import { DbAnswer } from "./dbAnswers";

export type DbQuiz = {
  id: number;
  question: string;
  explanation: string | null;
  answers: DbAnswer[];
  lessonId?: number;
};
