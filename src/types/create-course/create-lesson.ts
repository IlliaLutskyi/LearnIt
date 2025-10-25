import { ContentType } from "./content-type";

export type CreateLesson = {
  title: string;
  content: string;
  contentType: ContentType;
  videoSource?: "Youtube";
};
