import z from "zod";

export const AiResponseSchema = z.object({
  content: z
    .string()
    .describe(
      "The lesson content, if the content type is text the content will be a tiptap based html with StarterKit and Link extensions enabled, if the content type is video the content will be a valid youtube url of the video"
    ),

  contentType: z
    .enum(["Text", "Video", "Table", "HighlightedCode"])
    .describe("The content type of the lesson"),

  videoSource: z
    .enum(["Youtube"])
    .optional()
    .describe("The video source if the content type is video"),
});

export type AiResponse = z.infer<typeof AiResponseSchema>;
