import { DBLesson } from "./dbLesson";

export type DBSection = {
  title: string;
  order: number;
  id: number;
  courseId: number;
  lessons: DBLesson[];
};
