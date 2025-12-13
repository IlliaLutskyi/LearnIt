import z from "zod";

export const SectionGroupPropertiesSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  showSectionsOnly: z.boolean(),
});
export type SectionGroupProperties = z.infer<
  typeof SectionGroupPropertiesSchema
>;
