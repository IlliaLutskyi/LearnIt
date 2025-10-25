import prisma from "@/lib/db";

export async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
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
          order: true,
          sections: {
            select: {
              id: true,
              slug: true,
              title: true,
              order: true,
              sectionRates: {
                select: {
                  rate: true,
                },
              },
            },
          },
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
  return course;
}
