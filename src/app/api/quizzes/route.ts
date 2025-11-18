import { updateQuiz } from "@/features/quizzes/services/server/update-quiz";

export async function PATCH(req: Request) {
  return await updateQuiz(req);
}
