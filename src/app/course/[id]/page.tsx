import SectionList from "@/components/course/SectionList";
import prisma from "@/lib/db";
import React from "react";
import Content from "@/components/course/Content";
import Actions from "@/components/course/Actions";
type Props = {
  params: Promise<{ id: string }>;
};
const Course = async ({ params }: Props) => {
  const { id } = await params;
  if (!Number.isInteger(Number(id)))
    return <h1 className="text-center font-bold">The "{id}" id is invalid</h1>;
  const course = await prisma.course.findUnique({
    where: { id: Number(id) },
    include: {
      sections: {
        include: {
          lessons: {
            include: {
              quiz: {
                include: { answers: true },
              },
            },
          },
        },
      },
    },
  });
  if (!course)
    return <h1 className="text-center font-bold">The course does not exist</h1>;
  return (
    <div className="grid max-sm:grid-cols-[1fr_2fr] grid-cols-[1fr_3fr] gap-2 h-[calc(100vh-3.5rem)]">
      <SectionList sections={course.sections} />
      <div
        className="flex flex-col gap-2 my-2 mx-8 overflow-y-auto"
        id="scrollbar"
      >
        <Content />
        <Actions sections={course.sections} />
      </div>
    </div>
  );
};

export default Course;
