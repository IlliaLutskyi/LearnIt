import getUserRating from "@/services/get-user-rating";

type Params = {
  params: Promise<{ sectionId: string; userId: string }>;
};
export async function GET(req: Request, { params }: Params) {
  const { sectionId, userId } = await params;
  return await getUserRating(userId, sectionId);
}
