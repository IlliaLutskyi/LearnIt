import prisma from "@/lib/db";
import SectionGroup from "./SectionGroup";

type Props = {
  id: string;
};
const SideBar = async ({ id }: Props) => {
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
  if (!course) return null;
  return (
    <div
      className=" p-4 bg-black h-[calc(100vh-3.5rem)] overflow-y-auto"
      id="scrollbar"
    >
      <div className="flex flex-col gap-2 justify-center">
        {course?.sectionGroups.map((sectionGroup) => {
          return (
            <SectionGroup key={sectionGroup.id} sectionGroup={sectionGroup} />
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
