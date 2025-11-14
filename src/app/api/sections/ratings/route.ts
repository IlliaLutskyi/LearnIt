import createRating from "@/features/ratings/services/server/create-rating";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  return await createRating(req, session?.user.id);
}
