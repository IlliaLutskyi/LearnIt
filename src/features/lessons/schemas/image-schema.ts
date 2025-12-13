import z from "zod";

export const ImageSchema = z
  .instanceof(File)
  .refine(
    (image) => ["image/jpeg", "image/png", "image/webp"].includes(image.type),
    "File must be in a JPEG, PNG or WebP format"
  )
  .refine(
    (image) => image.size <= 5 * 1024 * 1024,
    "File size must be less than 5MB"
  );
