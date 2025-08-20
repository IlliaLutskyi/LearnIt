import { DbLesson } from "./dbLesson";

export type DbSection = {
  title: string;
  order: number;
  id: number;
  lessons?: DbLesson[];
};
