import prisma from "@/lib/db";

export async function deleteLesson(params: Promise<{ id: string }>) {
  const { id } = await params;
  try {
    if (!id)
      return Response.json(
        { message: "Lesson ID is missing" },
        { status: 400 }
      );

    await prisma.lesson.delete({ where: { id: Number(id) } });

    return Response.json(
      { message: "Lesson deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);

    return Response.json(
      { message: "Unable to delete lesson", err: err },
      { status: 500 }
    );
  }
}
