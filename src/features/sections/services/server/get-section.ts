import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getSection(course_slug: string, section_slug: string) {
  const session = await getServerSession(authOptions);

  const section = await prisma.section.findFirst({
    where: {
      slug: section_slug,
      sectionGroup: {
        course: {
          slug: course_slug,
        },
      },
    },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: { quiz: { include: { answers: true } } },
      },
      sectionRates: {
        where: {
          userId: session?.user.id,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  if (!section) return { section: null, nextSection: null, prevSection: null };

  let nextSection = await prisma.section.findFirst({
    where: {
      sectionGroupId: section.sectionGroupId,
      order: section.order + 1,
    },
    select: {
      slug: true,
      title: true,
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
          order: 1,
          sectionGroup: {
            courseId: currentSectionGroup.courseId,
            order: currentSectionGroup.order + 1,
          },
        },
        select: {
          slug: true,
          title: true,
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
      title: true,
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
          order: currentSectionGroup._count.sections,
          sectionGroup: {
            courseId: currentSectionGroup.courseId,
            order: currentSectionGroup.order - 1,
          },
        },
        select: {
          slug: true,
          title: true,
          sectionGroup: {
            select: {
              slug: true,
            },
          },
        },
      });
    }
  }

  return { section, nextSection, prevSection };
}
