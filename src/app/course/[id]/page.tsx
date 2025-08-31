import Content from "@/components/course/Content";
import Sidebar from "@/components/course/Sidebar";
import prisma from "@/lib/db";

type Props = {
  params: Promise<{ id: string }>;
};
const Course = async ({ params }: Props) => {
  const { id } = await params;
  if (!Number.isInteger(Number(id)) || Number(id) < 0)
    return <h1 className="text-center font-bold">The "{id}" id is invalid</h1>;
  const course = await prisma.course.findUnique({
    where: { id: Number(id) },
    select: {
      sectionGroups: {
        select: {
          title: true,
          order: true,
          id: true,
          sections: {
            select: {
              sectionGroupId: true,
              title: true,
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
