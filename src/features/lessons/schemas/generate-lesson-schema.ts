import { ContentTypeSchema } from "@/types/create-course/content-type";
import z from "zod";

export const GenerateLessonSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  title: z.string().min(1, "Title is required"),
  contentType: ContentTypeSchema.extract(["Text", "HighlightedCode", "Table"]),
});
export type GenerateLesson = z.infer<typeof GenerateLessonSchema>;
