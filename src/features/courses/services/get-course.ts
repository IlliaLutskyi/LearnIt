import prisma from "@/lib/db";

export async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      poster: true,
      slug: true,
      category: true,
      description: true,
      updatedAt: true,
      prerequisites: true,
      createdAt: true,
      skills: true,
      sectionGroups: {
        select: {
          id: true,
          title: true,
          slug: true,
          showSectionsOnly: true,
          state: true,
          order: true,
          sections: {
            select: {
              id: true,
              title: true,
              slug: true,
              order: true,
              sectionRates: {
                select: {
                  rate: true,
                },
              },
            },
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
      user: {
        select: {
          name: true,
          id: true,
          role: true,
        },
      },
    },
  });

  const courseRate = await prisma.sectionRating.aggregate({
    where: {
      section: {
        sectionGroup: {
          course: {
            slug,
          },
        },
      },
    },
    _avg: {
      rate: true,
    },
  });

  return { course, courseRate: courseRate._avg.rate };
}
