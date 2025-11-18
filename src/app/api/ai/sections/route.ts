import { generateSection } from "@/features/sections/services/server/generate-section";

export async function POST(req: Request) {
  return await generateSection(req);
}
