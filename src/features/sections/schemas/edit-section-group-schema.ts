import z from "zod";
import { State } from "../../../../prisma/generated/prisma";

export const EditSectionGroupsSchema = z.object({
  sectionGroups: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      slug: z.string(),
      showSectionsOnly: z.boolean().optional(),
      state: z.enum(State),
      order: z.number(),
      sections: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          slug: z.string(),
          order: z.number(),
        })
      ),
    })
  ),
});

export type EditSectionGroups = z.infer<typeof EditSectionGroupsSchema>;
