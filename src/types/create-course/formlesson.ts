import { ContentType } from "./content-type";

export type FormLesson = {
  title: string;
  content?: string;
  contentType: ContentType;
  codeStyle?: string;
  videoSource?: "Youtube";
  order: number;
  quiz?: {
    question: string;
    answers: { content: string; isCorrect: boolean }[];
    explanation?: string;
  };
  sectionOrder?: number;
  sectionGroupOrder?: number;
};
