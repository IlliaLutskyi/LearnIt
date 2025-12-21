import z from "zod";
import { CreateCategorySchema } from "./create-category-schema";
import { ImageSchema } from "@/features/lessons/schemas/image-schema";

export const UpdateCategorySchema = CreateCategorySchema.extend({
  image: ImageSchema.optional(),
});

export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
