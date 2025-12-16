import createRate from "@/features/ratings/services/server/create-rating";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
type Context = {
  params: Promise<{ id: string }>;
};
export async function POST(req: Request, { params }: Context) {
  const session = await getServerSession(authOptions);
  return await createRate(req, params, session?.user.id);
}
