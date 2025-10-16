import { ContentType } from "./contentType";
import { Quiz } from "./quiz";
import { Table } from "./table";

export type Lesson = {
  order: number;
  content?: string;
  quiz?: Quiz;
  table?: Table;
  videoSource?: "Youtube";
  title: string;
  sectionId: number;
  sectionGroupId: number;
  contentType: ContentType;
};
