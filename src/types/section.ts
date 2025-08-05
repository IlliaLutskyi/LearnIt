import { Lesson } from "./lesson";

export type Section = {
  order: number;
  title: string;
  lessons: Lesson[];
};
