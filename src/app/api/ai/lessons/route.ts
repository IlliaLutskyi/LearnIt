import { generateLesson } from "@/features/lessons/services/server/generate-lesson";

export async function POST(req: Request) {
  return await generateLesson(req);
}
