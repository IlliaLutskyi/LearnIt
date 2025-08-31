import prisma from "@/lib/db";

type Props = {
  params: Promise<{
    sectionId: string;
    sectionGroupId: string;
    sectionGroupOrder: string;
  }>;
};
export async function GET(_: Request, { params }: Props) {
  const { sectionId, sectionGroupId } = await params;
  try {
    if (!sectionId)
      return Response.json({ message: "Id is missing" }, { status: 400 });

    const section = await prisma.section.findUnique({
      where: {
        id: Number(sectionId),
      },
      include: {
        lessons: {
          include: { quiz: { include: { answers: true } } },
        },
      },
    });

    if (!section)
      return Response.json({ message: "Section not found" }, { status: 404 });

    let nextSection = await prisma.section.findFirst({
      where: {
        sectionGroupId: Number(sectionGroupId),
        order: section.order + 1,
      },
      select: {
        id: true,
        sectionGroupId: true,
      },
    });
    // if there is no next section, find the next section group
    if (!nextSection) {
      const currentSectionGroup = await prisma.sectionGroup.findUnique({
        where: {
          id: Number(sectionGroupId),
        },
        select: {
          order: true,
          courseId: true,
        },
      });
      if (currentSectionGroup) {
        nextSection = await prisma.section.findFirst({
          where: {
            sectionGroup: {
              courseId: currentSectionGroup.courseId,
              order: currentSectionGroup.order + 1,
            },
            order: 1,
          },
          select: {
            id: true,
            sectionGroupId: true,
          },
        });
      }
    }

    let prevSection = await prisma.section.findFirst({
      where: {
        sectionGroupId: Number(sectionGroupId),
        order: section.order - 1,
      },
      select: {
        id: true,
        sectionGroupId: true,
      },
    });
    // if there is no previous section, find the previous section group
    if (!prevSection) {
      const currentSectionGroup = await prisma.sectionGroup.findUnique({
        where: {
          id: Number(sectionGroupId),
        },
        select: {
          order: true,
          courseId: true,
          _count: {
            select: {
              sections: true,
            },
          },
        },
      });
      if (currentSectionGroup) {
        prevSection = await prisma.section.findFirst({
          where: {
            sectionGroup: {
              courseId: currentSectionGroup.courseId,
              order: currentSectionGroup.order - 1,
            },
            order: currentSectionGroup._count.sections,
          },
          select: {
            id: true,
            sectionGroupId: true,
          },
        });
      }
    }

    return Response.json(
      { section, nextSection, prevSection },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unable to load section" },
      { status: 500 }
    );
  }
}
