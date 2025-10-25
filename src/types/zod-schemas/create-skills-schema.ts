import z from "zod";

export const CreateSkillsSchema = z.object({
  skills: z.array(
    z.object({
      id: z.number(),
      content: z
        .string()
        .min(1, "Skill is required")
        .max(100, "Skill is too long"),
    })
  ),
});
