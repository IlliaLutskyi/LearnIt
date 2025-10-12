import createCourse from "@/services/create-course";
import getCourses from "@/services/get-courses";
import updateCourseDetails from "@/services/update-course-details";

export async function GET(req: Request) {
  return await getCourses(req);
}

export async function POST(req: Request) {
  return await createCourse(req);
}
