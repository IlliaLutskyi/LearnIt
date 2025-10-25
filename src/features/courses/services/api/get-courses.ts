import prisma from "@/lib/db";

export default async function getCourses(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  const filter = url.searchParams.get("filter");

  try {
    if (!page || !limit) {
      return Response.json(
        { message: "Page and limit are missing or invalid" },
        { status: 400 }
      );
    }

    const courses = await prisma.course.findMany({
      where: {
        category: {
          name: filter ? (filter === "all" ? undefined : filter) : undefined,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    return Response.json(courses, { status: 200 });
  } catch (err) {
    return Response.json(
      {
        message: "Something went wrong",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
