import { DBAnswer } from "./dbAnswers";

export type DBQuiz = {
  id: number;
  lessonId: number;
  question: string;
  explanation: string | null;
  answers: DBAnswer[];
};
