import z from "zod";

export const CreateOrUpdateSkillsSchema = z.object({
  skills: z
    .array(
      z.object({
        id: z.coerce.number().optional(),
        content: z
          .string()
          .min(1, "Skill is required")
          .max(100, "Skill is too long"),
      })
    )
    .min(1, "At least one skill is required"),
});

export type CreateOrUpdateSkills = z.infer<typeof CreateOrUpdateSkillsSchema>;
