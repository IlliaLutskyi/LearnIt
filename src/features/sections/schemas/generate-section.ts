import z from "zod";

export const GenerateSectionSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  prompt: z.string().min(1, "Prompt is required"),
});

export type GenerateSection = z.infer<typeof GenerateSectionSchema>;
