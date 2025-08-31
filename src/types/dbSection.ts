import { DbLesson } from "./dbLesson";

export type DbSection = {
  title: string;
  order: number;
  id: number;
  sectionGroupId: number;
  lessons?: DbLesson[];
};
