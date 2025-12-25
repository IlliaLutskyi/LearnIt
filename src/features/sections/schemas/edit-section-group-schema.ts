import z from "zod";

export const EditSectionGroupsSchema = z.object({
  sectionGroups: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      slug: z.string(),
      showSectionsOnly: z.boolean().optional(),
      order: z.number(),
      sections: z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          slug: z.string(),
          order: z.number(),
        })
      ),
    })
  ),
});

export type EditSectionGroups = z.infer<typeof EditSectionGroupsSchema>;
