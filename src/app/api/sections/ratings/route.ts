import createRating from "@/services/create-rating";

export async function POST(req: Request) {
  return await createRating(req);
}
