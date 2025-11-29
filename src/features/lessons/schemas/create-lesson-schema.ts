import { ContentTypeSchema } from "@/types/create-course/content-type";
import z from "zod";

export const CreateLessonSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  contentType: ContentTypeSchema,
  videoSource: z.enum(["Youtube"]).optional(),
});
export type CreateLesson = z.infer<typeof CreateLessonSchema>;
