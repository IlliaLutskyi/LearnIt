import prisma from "@/lib/db";

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany();

    return Response.json({ categories }, { status: 200 });
  } catch (err) {
    return Response.json(
      {
        message: "Unable to load categories",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
