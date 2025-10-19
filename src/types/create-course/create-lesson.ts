import { ContentType } from "./contentType";

export type CreateLesson = {
  title: string;
  content: string;
  contentType: ContentType;
  videoSource?: "Youtube";
};
