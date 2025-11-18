import z from "zod";

export const CreateQuizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  question: z.string().min(1, "Question is required"),
  answers: z.array(
    z.object({
      content: z.string().min(1, "Answer is required"),
      isCorrect: z.boolean(),
    })
  ),
  explanation: z.string().min(1, "Explanation is required"),
});
export type CreateQuiz = z.infer<typeof CreateQuizSchema>;
