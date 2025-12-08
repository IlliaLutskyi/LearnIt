import z from "zod";

export const ContentTypeSchema = z.enum([
  "Video",
  "Text",
  "Quiz",
  "Table",
  "Markdown",
  "Image",
  "HighlightedCode",
]);

export type ContentType = z.infer<typeof ContentTypeSchema>;
