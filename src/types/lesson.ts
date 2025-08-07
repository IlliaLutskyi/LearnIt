import { Quiz } from "./quiz";

export type Lesson = {
  order: number;
  content?: string;
  quiz?: Quiz;
  videoSource?: "Youtube";
  title: string;
  sectionId: number;
  sectionGroupId: number;
  contentType: "Video" | "Text" | "File" | "Quiz";
};
