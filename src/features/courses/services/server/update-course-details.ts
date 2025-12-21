import prisma from "@/lib/db";
import { CreateGeneralInfo } from "../../schemas/create-general-info-schema";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
export default async function updateCourseDetails(
  req: Request,
  { params }: Params
) {
  const { id } = await params;
  const data: Partial<CreateGeneralInfo> = await req.json();

  try {
    const course = await prisma.course.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.poster && { poster: data.poster }),
        ...(data.category && {
          category: {
            connect: {
              id: Number(data.category),
            },
          },
        }),
      },
    });

    if (!course) {
      return Response.json(
        { message: "Could not find course" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Course updated successfully", slug: course.slug },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message: "Could not edit course, please try again",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
