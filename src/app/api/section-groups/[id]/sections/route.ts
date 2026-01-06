import { createSection } from "@/features/sections/services/server/create-section";

type Context = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Context) {
  return await createSection(req, params);
}
