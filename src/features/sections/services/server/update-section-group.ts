import prisma from "@/lib/db";
import {
  SectionGroupProperties,
  SectionGroupPropertiesSchema,
} from "../../schemas/section-group-properties";
import { createSlug } from "@/features/courses/utils/create-slug";

export async function updateSectionGroup(
  req: Request,
  params: Promise<{ id: string }>
) {
  const data: SectionGroupProperties = await req.json();
  const { id } = await params;
  try {
    const { success: isValidData, error } =
      SectionGroupPropertiesSchema.safeParse(data);

    if (!isValidData)
      return Response.json({ message: error.message }, { status: 400 });

    const sectionGroup = await prisma.sectionGroup.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        slug: createSlug(data.title),
        showSectionsOnly: data.showSectionsOnly,
      },
    });

    return Response.json(
      { slug: sectionGroup.slug, message: "SectionGroup properties updated" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err instanceof Error ? err.message : err);

    return Response.json(
      { message: "Unable to update section group", err: err },
      { status: 500 }
    );
  }
}
