import { ContentTypeSchema } from "@/types/create-course/content-type";
import z from "zod";

export const EditSectionSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  lessons: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string().min(1, "Title is required"),
        content: z.string().optional(),
        contentType: ContentTypeSchema,
        videoSource: z.enum(["Youtube"]).optional(),
        codeStyle: z.string().optional(),
        action: z.enum(["delete", "update", "create"]).optional(),
        quiz: z
          .object({
            question: z.string().min(1, "Question is required"),
            answers: z.array(
              z.object({
                content: z.string().min(1, "Answer is required"),
                isCorrect: z.boolean(),
              })
            ),
            explanation: z.string().optional(),
          })
          .optional(),
        order: z.number(),
      })
    )
    .min(1, "At least one lesson is required"),
});
export type EditSection = z.infer<typeof EditSectionSchema>;
