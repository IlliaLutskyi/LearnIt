import prisma from "@/lib/db";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return Response.json({ categories }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Unable to load categories" },
      { status: 500 }
    );
  }
}
