import { $Enums } from "../../prisma/generated/prisma";
import { DbQuiz } from "./dbQuiz";

export type DbLesson = {
  id: number;
  title: string;
  order: number;
  content: string | null;
  quiz: DbQuiz | null;
  videoSource: $Enums.VideoSource | null;
  contentType: $Enums.ContentType;
  quizId?: number | null;
  sectionId?: number;
};
