import { deleteCourse } from "@/features/courses/services/server/delete-course";
import updateCourseDetails from "@/features/courses/services/server/update-course-details";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
export async function PATCH(req: Request, { params }: Params) {
  return await updateCourseDetails(req, { params });
}

export async function DELETE(_: Request, { params }: Params) {
  return await deleteCourse(params);
}
