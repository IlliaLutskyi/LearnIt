import { DeleteCategory } from "@/features/categories/services/server/delete-category";
import { UpdateCategory } from "@/features/categories/services/server/update-category";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  return await UpdateCategory(req, id);
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  return await DeleteCategory(id);
}
