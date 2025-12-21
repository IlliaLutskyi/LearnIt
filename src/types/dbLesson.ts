import { $Enums } from "../../prisma/generated/prisma";
import { ContentType } from "./create-course";
import { DbQuiz } from "./dbQuiz";

export type DbLesson = {
  id: number;
  title: string;
  order: number;
  content: string | null;
  quiz: DbQuiz | null;
  videoSource: $Enums.VideoSource | null;
  codeStyle?: string;
  contentType: ContentType;
  quizId?: number;
  sectionId?: number;
};
