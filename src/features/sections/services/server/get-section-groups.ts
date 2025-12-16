import prisma from "@/lib/db";

export async function getSectionGroups(course_slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug: course_slug },
    select: {
      sectionGroups: {
        select: {
          showSectionsOnly: true,
          title: true,
          order: true,
          slug: true,
          id: true,
          sections: {
            select: {
              sectionGroupId: true,
              title: true,
              slug: true,
              order: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return course?.sectionGroups;
}
