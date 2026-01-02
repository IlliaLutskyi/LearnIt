import { ContentTypeSchema } from "@/types/create-course/content-type";
import z from "zod";

export const AiResponseSchema = z.object({
  content: z
    .string()
    .describe(
      "The lesson content, if the content type is text the content will be a tiptap based html with StarterKit and Link extensions enabled"
    ),

  contentType: ContentTypeSchema.extract([
    "Text",
    "HighlightedCode",
    "Table",
  ]).describe("The content type of the lesson"),
});

export type AiResponse = z.infer<typeof AiResponseSchema>;
