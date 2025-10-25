import createRating from "@/features/ratings/services/api/create-rating";

export async function POST(req: Request) {
  return await createRating(req);
}
