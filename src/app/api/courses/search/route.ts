import { searchCourse } from "@/features/courses/services/server/search-course";

export async function GET(req: Request) {
  return await searchCourse(req);
}
