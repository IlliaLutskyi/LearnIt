import prisma from "@/lib/db";

type Props = {
  params: Promise<{ id: string }>;
};
export async function GET(_: Request, { params }: Props) {
  const { id } = await params;
  try {
    if (!id)
      return Response.json({ message: "Id is missing" }, { status: 400 });
    const section = await prisma.section.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        lessons: {
          include: { quiz: { include: { answers: true } } },
        },
      },
    });
    if (!section)
      return Response.json({ message: "Section not found" }, { status: 404 });
    return Response.json({ section }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Unable to load section" },
      { status: 500 }
    );
  }
}
