import z from "zod";

export const GenerateLessonSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  title: z.string().min(1, "Title is required"),
  contentType: z.enum(["Video", "Text", "Quiz", "Markdown", "Table"]),
});
export type GenerateLesson = z.infer<typeof GenerateLessonSchema>;
