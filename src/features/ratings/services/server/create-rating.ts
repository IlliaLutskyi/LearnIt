import prisma from "@/lib/db";

export default async function createRate(
  req: Request,
  params: Promise<{ id: string }>,
  userId: number | undefined
) {
  try {
    const data: { rate: number } = await req.json();
    const { id } = await params;

    if (!id)
      return Response.json({ message: "Missing section ID" }, { status: 400 });
    if (!data.rate)
      return Response.json({ message: "Missing rating" }, { status: 400 });
    if (!userId)
      return Response.json(
        { message: "You need to log in first" },
        { status: 400 }
      );

    const rate = await prisma.sectionRating.findFirst({
      where: {
        userId: userId,
        sectionId: Number(id),
      },
    });

    if (!rate) {
      await prisma.sectionRating.create({
        data: {
          userId: userId,
          sectionId: Number(id),
          rate: data.rate,
        },
      });
    } else {
      await prisma.sectionRating.update({
        where: {
          userId_sectionId: {
            userId: userId,
            sectionId: Number(id),
          },
        },
        data: {
          rate: data.rate,
        },
      });
    }

    return Response.json(
      { message: "Thank you for your feedback" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Something went wrong", err: err },
      { status: 500 }
    );
  }
}
