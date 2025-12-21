import { DeleteCategory } from "@/features/categories/services/server/delete-category";
import { UpdateCategory } from "@/features/categories/services/server/update-category";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
export async function PATCH(req: Request, { params }: Params) {
  return await UpdateCategory(req, params);
}

export async function DELETE(_: Request, { params }: Params) {
  return await DeleteCategory(params);
}
