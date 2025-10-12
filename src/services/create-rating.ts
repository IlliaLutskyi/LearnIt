import prisma from "@/lib/db";

type Data = { userId: number; sectionId: number; rating: number };

export default async function createRating(req: Request) {
  try {
    const data: Data = await req.json();

    if (!data.userId || !data.sectionId)
      return Response.json(
        { message: "Something went wrong" },
        { status: 400 }
      );

    const rating = await prisma.sectionRating.findFirst({
      where: {
        userId: data.userId,
        sectionId: data.sectionId,
      },
    });

    if (!rating) {
      await prisma.sectionRating.create({
        data: {
          userId: data.userId,
          sectionId: data.sectionId,
          rate: data.rating,
        },
      });
    } else {
      await prisma.sectionRating.update({
        where: {
          userId_sectionId: {
            userId: data.userId,
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
