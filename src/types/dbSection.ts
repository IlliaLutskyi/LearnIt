import { DbLesson } from "./dbLesson";

export type DbSection = {
  id: string;
  title: string;
  slug: string;
  order: number;
  lessons?: DbLesson[];
  sectionRates?: { rate: number; sectionId?: string; userId?: string }[];
  sectionGroupId?: string;
};
