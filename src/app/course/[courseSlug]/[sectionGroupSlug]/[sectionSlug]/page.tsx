import Content from "@/components/course-content/Content";
import Sidebar from "@/components/course-content/SideBar";
import { getSectionGroups } from "@/features/sections/services/server/get-section-groups";
import { getSection } from "@/features/sections/services/server/get-section";
import { Suspense } from "react";
import { Loader } from "@/components/common";

type Props = {
  params: Promise<{
    courseSlug: string;
    sectionGroupSlug: string;
    sectionSlug: string;
  }>;
};

const Course = async ({ params }: Props) => {
  const { courseSlug, sectionSlug } = await params;

  if (!courseSlug || !sectionSlug)
    return <h1 className="text-center font-bold">Course not found</h1>;

  const sectionGroups = await getSectionGroups(courseSlug);

  const { section, prevSection, nextSection } = await getSection(
    courseSlug,
    sectionSlug
  );

  if (!sectionGroups)
    return <h1 className="text-center font-bold">Course not found</h1>;

  if (!section)
    return (
      <h1 className="text-center font-bold">Section {sectionSlug} not found</h1>
    );

  return (
    <div className="block sm:grid grid-cols-[1fr_5fr] h-full">
      <Sidebar sectionGroups={sectionGroups} />
      <Content
        section={section}
        nextSection={nextSection}
        prevSection={prevSection}
      />
    </div>
  );
};

export default Course;
