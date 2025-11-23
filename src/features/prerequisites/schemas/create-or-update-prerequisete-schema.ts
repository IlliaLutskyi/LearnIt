import z from "zod";

export const CreateOrUpdatePrerequisitesSchema = z.object({
  prerequisites: z
    .array(
      z.object({
        id: z.coerce.number().optional(),
        content: z.string().min(1, "Prerequisite is required"),
      })
    )
    .min(1, "At least one prerequisite is required"),
});
export type CreateOrUpdatePrerequisites = z.infer<
  typeof CreateOrUpdatePrerequisitesSchema
>;
