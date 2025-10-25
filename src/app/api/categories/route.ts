import createCategory from "@/features/categories/services/api/create-category";
import getCategories from "@/features/categories/services/api/get-categories";

export async function GET() {
  return await getCategories();
}
export async function POST(req: Request) {
  return await createCategory(req);
}
