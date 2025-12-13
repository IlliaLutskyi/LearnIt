import z from "zod";
import { CreateCategorySchema } from "./create-category-schema";

export const UpdateCategorySchema = CreateCategorySchema.partial();
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
