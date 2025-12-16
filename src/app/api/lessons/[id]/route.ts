import { updateLesson } from "@/features/lessons/services/server/update-lesson";
type Context = {
  params: Promise<{
    id: string;
  }>;
};
export async function PATCH(req: Request, { params }: Context) {
  return await updateLesson(req, params);
}
