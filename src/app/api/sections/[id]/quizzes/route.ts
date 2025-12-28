import { createQuiz } from "@/features/quizzes/services/server/create-quiz";

type Context = { params: Promise<{ id: string }> };
export async function POST(req: Request, { params }: Context) {
  return await createQuiz(req, params);
}
