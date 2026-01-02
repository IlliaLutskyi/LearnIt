import prisma from "@/lib/db";

export async function DeleteCategory(params: Promise<{ id: string }>) {
  const { id } = await params;
  try {
    if (!id)
      return Response.json(
        { message: "Category ID is missing" },
        { status: 400 }
      );

    await prisma.category.delete({ where: { id } });

    return Response.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unable to delete category", err: err },
      { status: 500 }
    );
  }
}
