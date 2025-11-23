import z from "zod";

export const GeneratedLessonSchema = {
  contentType: z.enum(["Video", "Text", "Quiz", "Markdown", "Table"]),
};
