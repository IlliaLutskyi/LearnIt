import createCourse from "@/features/courses/services/server/create-course";
import getCourses from "@/features/courses/services/server/get-courses";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  return await getCourses(req);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  return await createCourse(req, session?.user?.id);
}
