import prisma from "@/lib/db";

type Data = { sectionId: number; rating: number };

export default async function createRating(
  req: Request,
  userId: number | undefined
) {
  try {
    const data: Data = await req.json();

    if (!data.sectionId || !data.rating || !userId)
      return Response.json(
        { message: "Something went wrong" },
        { status: 400 }
      );

    const rating = await prisma.sectionRating.findFirst({
      where: {
        userId: userId,
        sectionId: data.sectionId,
      },
    });

    if (!rating) {
      await prisma.sectionRating.create({
        data: {
          userId: userId,
          sectionId: data.sectionId,
          rate: data.rating,
        },
      });
    } else {
      await prisma.sectionRating.update({
        where: {
          userId_sectionId: {
            userId: userId,
            sectionId: data.sectionId,
          },
        },
        data: {
          rate: data.rating,
        },
      });
    }

    return Response.json(
      { message: "Thank you for your feedback" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
