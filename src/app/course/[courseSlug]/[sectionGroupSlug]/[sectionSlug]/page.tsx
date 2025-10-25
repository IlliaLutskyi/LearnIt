import Content from "@/components/course-content/Content";
import Sidebar from "@/components/course-content/Sidebar";
import prisma from "@/lib/db";

type Props = {
  params: Promise<{
    courseSlug: string;
    sectionGroupSlug: string;
    sectionSlug: string;
  }>;
};
const Course = async ({ params }: Props) => {
  const { courseSlug } = await params;
  if (!courseSlug)
    return <h1 className="text-center font-bold">Course not found</h1>;
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    select: {
      sectionGroups: {
        select: {
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
              lessons: false,
            },
          },
        },
      },
    },
  });
  if (!course)
    return <h1 className="text-center font-bold">Course not found</h1>;
  return (
    <div className="h-full grid grid-cols-[1fr_5fr] max-sm:block">
      <Sidebar sectionGroups={course.sectionGroups} />
      <Content />
    </div>
  );
};

export default Course;
