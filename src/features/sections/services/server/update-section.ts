import prisma from "@/lib/db";
import {
  EditSection,
  EditSectionSchema,
} from "../../schemas/edit-section-schema";
import { createSlug } from "@/features/courses/utils/create-slug";

export default async function updateSection(
  req: Request,
  params: Promise<{ id: string }>
) {
  const data: EditSection = await req.json();
  const { id } = await params;

  try {
    const { success: isValidData } = EditSectionSchema.safeParse(data);

    if (!isValidData)
      return Response.json({ message: "Invalid data" }, { status: 400 });

    if (!id)
      return Response.json({ message: "Missing section ID" }, { status: 400 });

    const section = await prisma.section.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
        slug: createSlug(data.title),
        lessons: {
          updateMany: data.lessons.map((lesson) => {
            return {
              where: {
                id: lesson.id,
              },
              data: {
                order: lesson.order,
              },
            };
          }),
        },
      },
    });

    return Response.json(
      {
        sectionSlug: section.slug,
        message: "Section updated successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Could not update section", err: err },
      { status: 500 }
    );
  }
}
