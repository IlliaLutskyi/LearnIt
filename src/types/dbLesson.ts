import { $Enums } from "../../prisma/generated/prisma";
import { DBQuiz } from "./dbQuiz";

export type DBLesson = {
  title: string;
  order: number;
  id: number;
  content: string | null;
  quiz: DBQuiz | null;
  videoSource: $Enums.VideoSource | null;
  contentType: $Enums.ContentType;
  quizId: number | null;
  sectionId: number;
};
