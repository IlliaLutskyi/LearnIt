import { ContentTypeSchema } from "@/types/create-course/content-type";
import z from "zod";

export const CreateCourseSchema = z.object({
  poster: z.string().min(1, "Poster is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required").max(10000),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  prerequisites: z
    .array(z.object({ content: z.string() }))
    .min(1, "At least one prerequisite is required"),
  sectionGroups: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        slug: z.string().min(1, "Slug is required"),
        showSectionsOnly: z.boolean().optional(),
        order: z.coerce.number(),
        sections: z
          .array(
            z.object({
              title: z.string().min(1, "Title is required"),
              order: z.coerce.number(),
              slug: z.string().min(1, "Slug is required"),
              lessons: z
                .array(
                  z.object({
                    title: z.string().min(1, "Title is required"),
                    content: z.string().optional(),
                    videoSource: z.string().optional(),
                    contentType: ContentTypeSchema,
                    codeStyle: z.string().optional(),
                    order: z.coerce.number(),
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
                  })
                )
                .min(1, "At least one lesson is required"),
            })
          )
          .min(1, "At least one section is required"),
      })
    )
    .min(1, "At least one section group is required"),
});

export type CreateCourse = z.infer<typeof CreateCourseSchema>;
