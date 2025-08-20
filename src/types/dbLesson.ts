import { $Enums } from "../../prisma/generated/prisma";
import { DbQuiz } from "./dbQuiz";

export type DbLesson = {
  title: string;
  order: number;
  id: number;
  content: string | null;
  quiz: DbQuiz | null;
  videoSource: $Enums.VideoSource | null;
  contentType: $Enums.ContentType;
  quizId: number | null;
  sectionId: number;
};
