import { updateQuiz } from "@/features/quizzes/services/server/update-quiz";
type Context = {
  params: Promise<{
    id: string;
  }>;
};
export async function PATCH(req: Request, { params }: Context) {
  return await updateQuiz(req, params);
}
