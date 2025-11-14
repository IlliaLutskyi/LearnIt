import createCourse from "@/features/courses/services/server/create-course";
import getCourses from "@/features/courses/services/server/get-courses";

export async function GET(req: Request) {
  return await getCourses(req);
}

export async function POST(req: Request) {
  return await createCourse(req);
}
