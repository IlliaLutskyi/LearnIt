import { updateLesson } from "@/features/lessons/services/server/update-lesson";

export async function PATCH(req: Request) {
  return await updateLesson(req);
}
