import z from "zod";
import { State } from "../../../../prisma/generated/prisma";

export const SectionGroupPropertiesSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  showSectionsOnly: z.boolean(),
  state: z.enum(State),
});
export type SectionGroupProperties = z.infer<
  typeof SectionGroupPropertiesSchema
>;
