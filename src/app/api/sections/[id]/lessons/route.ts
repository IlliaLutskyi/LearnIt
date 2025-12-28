import { createLesson } from "@/features/lessons/services/server/create-lesson";

type Context = { params: Promise<{ id: string }> };
export async function POST(req: Request, { params }: Context) {
  return await createLesson(req, params);
}
