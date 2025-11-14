import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import getUserRating from "@/features/ratings/services/server/get-user-rating";
import { getServerSession } from "next-auth";

type Params = {
  params: Promise<{ sectionId: string; userId: string }>;
};
export async function GET(req: Request, { params }: Params) {
  const { sectionId } = await params;
  const session = await getServerSession(authOptions);

  return await getUserRating(session?.user.id, sectionId);
}
