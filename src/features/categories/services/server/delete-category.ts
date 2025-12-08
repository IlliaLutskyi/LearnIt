import prisma from "@/lib/db";

export async function DeleteCategory(categopryId?: string) {
  try {
    if (!categopryId)
      return Response.json(
        { message: "Category ID is missing" },
        { status: 400 }
      );

    await prisma.category.delete({ where: { id: Number(categopryId) } });

    return Response.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unable to delete category" },
      { status: 500 }
    );
  }
}
