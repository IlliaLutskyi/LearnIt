import { DbLesson } from "./dbLesson";

export type DbSection = {
  id: number;
  title: string;
  slug: string;
  order: number;
  lessons?: DbLesson[];
  sectionRates?: { rate: number; sectionId?: number; userId?: number }[];
  sectionGroupId?: number;
};
