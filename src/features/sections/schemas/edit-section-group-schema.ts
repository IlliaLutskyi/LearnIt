import z from "zod";
import { State } from "../../../../prisma/generated/prisma";

export const EditSectionGroupsSchema = z.object({
  sectionGroups: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string(),
      slug: z.string().optional(),
      showSectionsOnly: z.boolean().optional(),
      state: z.enum(State),
      order: z.number(),
      action: z.enum(["delete", "update", "create"]).optional(),
      sections: z.array(
        z.object({
          id: z.string().optional(),
          title: z.string(),
          slug: z.string().optional(),
          order: z.number(),
          action: z.enum(["delete", "create", "update"]).optional(),
        })
      ),
    })
  ),
});

export type EditSectionGroups = z.infer<typeof EditSectionGroupsSchema>;
