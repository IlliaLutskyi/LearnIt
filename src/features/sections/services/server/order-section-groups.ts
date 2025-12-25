import prisma from "@/lib/db";
import { EditSectionGroups } from "../../schemas/edit-section-group-schema";
export async function orderSectionGroups(req: Request) {
  const data: EditSectionGroups = await req.json();

  try {
    if (data.sectionGroups.length === 0)
      return Response.json(
        { message: "Section groups are missing" },
        { status: 400 }
      );

    const queries = data.sectionGroups.map((sectionGroup, index) => {
      return prisma.sectionGroup.update({
        where: {
          id: sectionGroup.id,
        },
        data: {
          order: index + 1,

          sections: {
            updateMany: sectionGroup.sections.map((section, index) => {
              return {
                where: {
                  id: section.id,
                },
                data: {
                  order: index + 1,
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
