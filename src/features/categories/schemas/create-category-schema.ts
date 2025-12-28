import { ImageSchema } from "@/features/lessons/schemas/image-schema";
import z from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(30, "Name is too long"),
  description: z.string().min(1, "Description is required").max(1000),
  image: ImageSchema,
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
