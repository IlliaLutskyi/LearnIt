import AboutSections from "@/features/sections/components/AboutSections";
import Header from "@/components/course-details/Header";
import Prerequisites from "@/features/prerequisites/components/Prerequisites";
import Skills from "@/features/skills/components/Skills";
import { lazy, Suspense } from "react";
import { getCourse } from "@/features/courses/services/get-course";

const EditForm = lazy(() => import("@/components/course-details/EditForm"));
const EditButton = lazy(() => import("@/components/course-details/EditButton"));

type Props = {
  params: Promise<{
    courseSlug: string;
  }>;
};
const CourseDetails = async ({ params }: Props) => {
  const { courseSlug } = await params;
  if (!courseSlug)
    return <h1 className="text-center font-bold m-4">Course not found</h1>;

  const course = await getCourse(courseSlug);
  if (!course)
    return <h1 className="text-center font-bold m-4">Course not found</h1>;

  return (
    <div className="flex flex-col gap-2">
      <Header
        course={{
          title: course.title,
          slug: course.slug,
          sectionGroups: course.sectionGroups,
          description: course.description,
          updatedAt: course.updatedAt,
          user: course.user,
          id: course.id,
          createdAt: course.createdAt,
        }}
      />
      <section className="flex flex-col gap-4 px-8 py-2">
        {course.skills.length > 0 && <Skills skills={course.skills} />}
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">Prerequisites:</h2>
          {course.prerequisites.length > 0 && (
            <Prerequisites preriquisites={course.prerequisites} />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">Course content</h2>
          <AboutSections sectionGroups={course.sectionGroups} />
        </div>
        <Suspense>
          <section className="flex justify-end">
            <EditButton author={course.user} />
            <EditForm course={course} />
          </section>
        </Suspense>
      </section>
    </div>
  );
};

export default CourseDetails;
