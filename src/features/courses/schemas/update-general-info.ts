import z from "zod";

export const UpdateGeneralInfoSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.object({
    id: z.number(),
  }),
});

export type UpdateGeneralInfo = z.infer<typeof UpdateGeneralInfoSchema>;
