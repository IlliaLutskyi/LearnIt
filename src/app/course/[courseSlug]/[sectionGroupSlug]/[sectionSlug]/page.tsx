import Content from "@/components/course-content/Content";
import Sidebar from "@/components/course-content/SideBar";
import { getSectionGroups } from "@/features/sections/services/server/get-section-groups";

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

  const sectionGroups = await getSectionGroups(courseSlug);
  if (!sectionGroups)
    return <h1 className="text-center font-bold">Course not found</h1>;

  return (
    <div className="block sm:grid grid-cols-[1fr_5fr] h-full">
      <Sidebar sectionGroups={sectionGroups} />
      <Content />
    </div>
  );
};

export default Course;
