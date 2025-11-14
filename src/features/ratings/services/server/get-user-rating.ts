import prisma from "@/lib/db";

export default async function getUserRating(
  userId: number | undefined,
  sectionId: string
) {
  try {
    if (!sectionId || !userId)
      return Response.json(
        { message: "Something went wrong" },
        { status: 400 }
      );

    const rating = await prisma.sectionRating.findFirst({
      where: {
        userId: Number(userId),
        sectionId: Number(sectionId),
      },
    });
    return Response.json({ rating: rating?.rate }, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
