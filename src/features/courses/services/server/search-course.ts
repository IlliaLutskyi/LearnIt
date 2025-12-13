import prisma from "@/lib/db";

export async function searchCourse(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const keyword = searchParams.get("keyword");
    const limit = searchParams.get("limit");

    if (!keyword)
      return Response.json({ message: "Missing keyword" }, { status: 400 });

    const courses = await prisma.course.findMany({
      where: {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      take: limit ? Number(limit) : 10,
    });

    if (courses.length === 0)
      return Response.json(
        { message: `No course found for ${keyword}` },
        { status: 404 }
      );

    return Response.json(
      { courses, message: "Course found successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { message: "Something went wrong while searching course" },
      { status: 500 }
    );
  }
}
