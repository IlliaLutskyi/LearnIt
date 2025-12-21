import prisma from "@/lib/db";

export async function deleteCourse(params: Promise<{ id: string }>) {
  const { id } = await params;
  try {
    if (!id)
      return Response.json(
        { message: "Course ID is missing" },
        { status: 400 }
      );

    await prisma.course.delete({ where: { id: Number(id) } });

    return Response.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);

    return Response.json(
      { message: "Unable to delete course", err: err },
      { status: 500 }
    );
  }
}
