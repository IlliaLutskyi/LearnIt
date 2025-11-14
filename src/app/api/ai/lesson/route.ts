import { generateLesson } from "@/features/lessons/services/generate-lesson";

export async function POST(req: Request) {
  return await generateLesson(req);
}
