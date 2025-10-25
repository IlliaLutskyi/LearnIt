import updateCourseDetails from "@/features/courses/services/api/update-course-details";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
export async function PATCH(req: Request, { params }: Params) {
  return await updateCourseDetails(req, { params });
}
