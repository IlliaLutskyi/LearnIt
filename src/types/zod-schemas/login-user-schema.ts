import z from "zod";

export const LoginUserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password cannot exceed 100 characters"),
});
