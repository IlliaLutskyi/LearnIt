import { Lesson } from "./lesson";

export type Section = {
  order: number;
  title: string;
  sectionGroupId: number;
  lessons: Lesson[];
};
