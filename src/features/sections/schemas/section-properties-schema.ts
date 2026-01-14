import z from "zod";

export const sectionPropertiesSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
});

export type SectionProperties = z.infer<typeof sectionPropertiesSchema>;
