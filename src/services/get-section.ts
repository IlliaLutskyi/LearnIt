import prisma from "@/lib/db";

export default async function getSection(
  section_slug: string,
  course_slug: string
) {
  try {
    if (!section_slug || !course_slug)
      return Response.json({ message: "Slug is missing" }, { status: 400 });
    const section = await prisma.section.findFirst({
      where: {
        sectionGroup: {
          course: {
            slug: course_slug,
          },
        },
        slug: section_slug,
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
        sectionGroupId: section.sectionGroupId,
        order: section.order + 1,
      },
      select: {
        slug: true,
        sectionGroup: {
          select: {
            slug: true,
          },
        },
      },
    });
    // if there is no next section, find the next section group
    if (!nextSection) {
      const currentSectionGroup = await prisma.sectionGroup.findUnique({
        where: {
          id: section.sectionGroupId,
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
            slug: true,
            sectionGroup: {
              select: {
                slug: true,
              },
            },
          },
        });
      }
    }

    let prevSection = await prisma.section.findFirst({
      where: {
        sectionGroupId: section.sectionGroupId,
        order: section.order - 1,
      },
      select: {
        slug: true,
        sectionGroup: {
          select: {
            slug: true,
          },
        },
      },
    });

    // if there is no previous section, find the previous section group
    if (!prevSection) {
      const currentSectionGroup = await prisma.sectionGroup.findUnique({
        where: {
          id: section.sectionGroupId,
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
            slug: true,
            sectionGroup: {
              select: {
                slug: true,
              },
            },
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
