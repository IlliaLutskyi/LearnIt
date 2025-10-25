import z from "zod";

export const CreateGeneralInfoSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(10000, "Description is too long"),
});
