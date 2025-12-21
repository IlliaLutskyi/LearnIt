import Content from "@/components/course-content/Content";
import Sidebar from "@/components/course-content/SideBar";
import { getSectionGroups } from "@/features/sections/services/server/get-section-groups";
import { getSection } from "@/features/sections/services/server/get-section";
import { Suspense } from "react";
import { Loader } from "@/components/common";
import { DbNextOrPrevSection, DbSection, DbSectionGroup } from "@/types";

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

  const queries = [
    getSectionGroups(courseSlug),
    getSection(courseSlug, sectionSlug),
  ];

  const data = await Promise.all(queries);

  if (!data[0])
    return <h1 className="text-center font-bold">Course not found</h1>;

  if (!data[1])
    return (
      <h1 className="text-center font-bold">Section {sectionSlug} not found</h1>
    );

  const sectionGroups = data[0] as DbSectionGroup[];

  const { nextSection, prevSection, section } = data[1] as {
    nextSection: DbNextOrPrevSection | null;
    prevSection: DbNextOrPrevSection | null;
    section: DbSection;
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="block sm:grid grid-cols-[1fr_5fr] h-full">
        <Sidebar sectionGroups={sectionGroups} />
        <Content
          section={section}
          nextSection={nextSection}
          prevSection={prevSection}
        />
      </div>
    </Suspense>
  );
};

export default Course;
