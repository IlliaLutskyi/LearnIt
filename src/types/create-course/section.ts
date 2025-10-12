import { Lesson } from "./lesson";

export type Section = {
  order: number;
  title: string;
  slug: string;
  sectionGroupId: number;
  lessons: Lesson[];
};
