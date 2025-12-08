import prisma from "@/lib/db";

export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}
