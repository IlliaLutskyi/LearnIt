import z from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(30, "Name is too long"),
  image: z
    .instanceof(File)
    .refine(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp",
      "File must be in a JPEG, PNG or WebP format"
    ),
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
