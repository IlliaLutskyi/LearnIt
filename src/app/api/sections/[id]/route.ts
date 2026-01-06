import { deleteSection } from "@/features/sections/services/server/delete-section";
import { updateSection } from "@/features/sections/services/server/update-section";

type Context = { params: Promise<{ id: string }> };
export async function PATCH(req: Request, { params }: Context) {
  return await updateSection(req, params);
}

export async function DELETE(_: Request, { params }: Context) {
  return await deleteSection(params);
}
