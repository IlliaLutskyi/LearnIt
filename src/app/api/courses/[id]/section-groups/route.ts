import { updateSectionGroups } from "@/features/sections/services/server/update-section-groups";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: Context) {
  return updateSectionGroups(req, params);
}
