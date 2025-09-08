import Rating from "@/components/courseDetails/Rating";
import prisma from "@/lib/db";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const CourseDetails = async ({ params }: Props) => {
  const { id } = await params;
  if (!Number.isInteger(Number(id)))
    return <h1 className="text-center font-bold">The "{id}" id is invalid</h1>;
  const course = await prisma.course.findUnique({
    where: { id: Number(id) },
    select: {
      title: true,
      description: true,
      updatedAt: true,
      sectionGroups: {
        select: {
          title: true,
          order: true,
          sections: {
            select: {
              title: true,
              order: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!course)
    return <h1 className="text-center font-bold">Course not found</h1>;
  return (
    <div>
      <div className="flex gap-3 px-8 py-4 min-h-[300px] bg-purple-200 text-black">
        <section className="w-4/3 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-sm text-gray-800">{course.description}</p>
            <Rating />
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <span className="text-xs text-purple-800">
              Created by: {course.user.name}
            </span>
            <span className="text-xs text-purple-800">
              Created at: {new Date(course.updatedAt).toLocaleDateString()}
            </span>
            <span className="text-xs text-purple-800">
              Last updated: {new Date(course.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </section>
        <section className="w-1/3 mt-auto">
          <Link href={`/course/${id}`}>
            <button
              className="w-full p-2 bg-purple-700 text-white rounded-xs hover:bg-purple- 
          hover:scale-95 focus:scale-95 duration-500"
            >
              See Course
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default CourseDetails;
