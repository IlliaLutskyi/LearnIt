import { Lesson } from "./lesson";

export type Section = {
  order: number;
  title: string;
  slug: string;
  sectionGroupOrder: number;
  lessons: Lesson[];
};
