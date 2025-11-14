import z from "zod";

export const CreateLessonSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  contentType: z.enum(["Video", "Text", "Quiz", "Markdown", "Table"]),
  videoSource: z.enum(["Youtube"]).optional(),
});
export type CreateLesson = z.infer<typeof CreateLessonSchema>;
