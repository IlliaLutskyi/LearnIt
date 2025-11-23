import { ContentType } from "./content-type";
import { Quiz } from "./quiz";
export type Lesson = {
  order: number;
  content?: string;
  quiz?: Quiz;
  videoSource?: "Youtube";
  title: string;
  sectionOrder: number;
  sectionGroupOrder: number;
  contentType: ContentType;
};
