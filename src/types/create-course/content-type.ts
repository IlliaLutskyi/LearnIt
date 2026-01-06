import z from "zod";
import { ContentType as PrismaContentType } from "../../../prisma/generated/prisma";

export const ContentTypeSchema = z.enum(PrismaContentType);

export type ContentType = z.infer<typeof ContentTypeSchema>;
