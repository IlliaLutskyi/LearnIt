import z from "zod";

export const GenerateQuizSchema = z.object({
  answersQuantity: z.coerce
    .number()
    .min(1, "At least one answer is required")
    .max(5, "Too many answers"),
  quizzesQuantity: z.coerce
    .number()
    .min(1, "At least one quiz is required")
    .max(5, "Too many quizzes"),
  contents: z
    .array(z.object({ value: z.string() }))
    .min(1, "Select at least one context"),
});
export type GenerateQuiz = z.infer<typeof GenerateQuizSchema>;
