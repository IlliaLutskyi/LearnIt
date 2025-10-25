import createCourse from "@/features/courses/services/api/create-course";
import getCourses from "@/features/courses/services/api/get-courses";

export async function GET(req: Request) {
  return await getCourses(req);
}

export async function POST(req: Request) {
  return await createCourse(req);
}
