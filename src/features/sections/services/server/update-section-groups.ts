import prisma from "@/lib/db";
import { EditSectionGroups } from "../../schemas/edit-section-group-schema";
import { createSlug } from "@/features/courses/utils/create-slug";

export async function updateSectionGroups(
  req: Request,
  params: Promise<{ id: string }>
) {
  const data: EditSectionGroups = await req.json();
  const { id } = await params;
  try {
    if (data.sectionGroups.length === 0)
      return Response.json(
        { message: "Section groups are missing" },
        { status: 400 }
      );

    const queries = data.sectionGroups.map((sectionGroup, sqi) => {
      const sectionToCreate = sectionGroup.sections.filter(
        (section) => section.action === "create"
      );
      const sectionToDelete = sectionGroup.sections.filter(
        (section) => section.action === "delete"
      );
      const sectionToUpdate = sectionGroup.sections.filter(
        (section) => section.action === "update"
      );

      if (sectionGroup.action === "create") {
        return prisma.sectionGroup.create({
          data: {
            title: sectionGroup.title,
            slug: createSlug(sectionGroup.title),
            order: sqi + 1,
            showSectionsOnly: sectionGroup.showSectionsOnly,
            state: sectionGroup.state,
            sections: {
              createMany: {
                data: sectionGroup.sections.map((section, si) => {
                  return {
                    title: section.title,
                    slug: createSlug(section.title),
                    order: si + 1,
                  };
                }),
              },
            },
            courseId: id,
          },
        });
      }

      if (sectionGroup.action === "delete") {
        return prisma.sectionGroup.delete({
          where: {
            id: sectionGroup.id,
          },
        });
      }

      if (sectionGroup.action === "update") {
        return prisma.sectionGroup.update({
          where: {
            id: sectionGroup.id,
          },
          data: {
            title: sectionGroup.title,
            slug: createSlug(sectionGroup.title),
            order: sqi + 1,
            showSectionsOnly: sectionGroup.showSectionsOnly,
            state: sectionGroup.state,
            sections: {
              createMany: {
                data: sectionToCreate.map((section) => {
                  return {
                    title: section.title,
                    slug: createSlug(section.title),
                    order: section.order,
                  };
                }),
              },

              deleteMany: sectionToDelete.map((section) => {
                return {
                  id: section.id,
                };
              }),

              updateMany: sectionToUpdate.map((section) => {
                return {
                  where: {
                    id: section.id,
                  },
                  data: {
                    title: section.title,
                    slug: createSlug(section.title),
                  },
                };
              }),
            },
          },
        });
      }

      return prisma.sectionGroup.update({
        where: {
          id: sectionGroup.id,
        },

        data: {
          sections: {
            createMany: {
              data: sectionToCreate.map((section) => {
                return {
                  title: section.title,
                  slug: createSlug(section.title),
                  order: section.order,
                };
              }),
            },

            deleteMany: sectionToDelete.map((section) => {
              return {
                id: section.id,
              };
            }),

            updateMany: sectionToUpdate.map((section) => {
              return {
                where: {
                  id: section.id,
                },
                data: {
                  title: section.title,
                  slug: createSlug(section.title),
                },
              };
            }),
          },
        },
      });
    });

    await Promise.all(queries);

    return Response.json(
      { message: "Section groups updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err instanceof Error ? err.message : err);

    return Response.json(
      { message: "Unable to update section groups", err: err },
      { status: 500 }
    );
  }
}
