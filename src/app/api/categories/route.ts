import createCategory from "@/services/create-category";
import getCategories from "@/services/get-categories";

export async function GET() {
  return await getCategories();
}
export async function POST(req: Request) {
  return await createCategory(req);
}
