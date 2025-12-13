import { ImageSchema } from "@/features/lessons/schemas/image-schema";
import z from "zod";

export const CreateGeneralInfoSchema = z.object({
  poster: z.string().min(1, "Poster is required"),
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(10000, "Description is too long"),
  category: z.object({ id: z.string() }),
});

export type CreateGeneralInfo = z.infer<typeof CreateGeneralInfoSchema>;
