import { generateQuizzes } from "@/features/quizzes/services/server/generate-quizzes";

export async function POST(req: Request) {
  return await generateQuizzes(req);
}
