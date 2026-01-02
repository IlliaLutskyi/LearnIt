import { $Enums } from "../../prisma/generated/prisma";
import { ContentType } from "./create-course";
import { DbQuiz } from "./dbQuiz";

export type DbLesson = {
  id: string;
  title: string;
  order: number;
  content: string | null;
  quiz?: DbQuiz;
  videoSource?: $Enums.VideoSource;
  codeStyle?: string;
  contentType: ContentType;
  quizId?: string;
  sectionId?: string;
};
