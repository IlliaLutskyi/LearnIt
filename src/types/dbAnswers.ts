export type DbAnswer = {
  id: number;
  content: string;
  isCorrect: boolean;
  quizId?: number;
};
