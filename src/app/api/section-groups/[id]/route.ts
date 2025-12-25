import { deleteSectionGroup } from "@/features/sections/services/server/delete-section-group";
import { updateSectionGroup } from "@/features/sections/services/server/update-section-group";
type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_: Request, { params }: Context) {
  return await deleteSectionGroup(params);
}

export async function PATCH(req: Request, { params }: Context) {
  return await updateSectionGroup(req, params);
}
