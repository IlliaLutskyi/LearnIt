import createRate from "@/features/ratings/services/server/create-rating";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
type Context = {
  params: Promise<{ id: string }>;
};
export async function POST(req: Request, { params }: Context) {
  const session = await getServerSession(authOptions);

  if (!session)
    return Response.json(
      { message: "In order to perform this action you need to be logged in" },
      { status: 401 }
    );

  return await createRate(req, params, session?.user.id);
}
