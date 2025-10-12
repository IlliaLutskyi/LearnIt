import prisma from "@/lib/db";
type Data = {
  title: string;
  description: string;
  category: { id: number };
};
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
  const data: Data = await req.json();
  try {
    const course = await prisma.course.update({
      where: {
        id: Number(id),
      },
      data: {
        category: {
          connect: {
            id: data.category.id,
          },
        },
        description: data.description,
        title: data.title,
        slug: data.title.replace(/\s+/g, "-").toLowerCase(),
      },
    });

    if (!course) {
      return Response.json(
        { message: "Could not find course" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Course updated successfully" },
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
