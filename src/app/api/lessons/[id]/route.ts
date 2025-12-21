import { deleteLesson } from "@/features/lessons/services/server/delete-lesson";
import { updateLesson } from "@/features/lessons/services/server/update-lesson";
type Context = {
  params: Promise<{
    id: string;
  }>;
};
export async function PATCH(req: Request, { params }: Context) {
  return await updateLesson(req, params);
}
export async function DELETE(_: Request, { params }: Context) {
  return await deleteLesson(params);
}
