import { updateSection } from "@/features/sections/services/server/update-section";

type Context = { params: Promise<{ id: string }> };
export async function PATCH(req: Request, { params }: Context) {
  return await updateSection(req, params);
}
