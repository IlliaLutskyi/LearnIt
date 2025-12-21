import { ContentTypeSchema } from "@/types/create-course/content-type";
import z from "zod";

export const EditSectionSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  lessons: z
    .array(
      z.object({
        id: z.number(),
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content is required").nullable(),
        contentType: ContentTypeSchema,
        videoSource: z.enum(["Youtube"]).nullable(),
        codeStyle: z.string().optional(),
        quiz: z
          .object({
            id: z.number(),
            question: z.string().min(1, "Question is required"),
            answers: z.array(
              z.object({
                id: z.number(),
                content: z.string().min(1, "Answer is required"),
                isCorrect: z.boolean(),
              })
            ),
            explanation: z.string().nullable(),
          })
          .nullable(),
        order: z.number(),
      })
    )
    .min(1, "At least one lesson is required"),
});
export type EditSection = z.infer<typeof EditSectionSchema>;
