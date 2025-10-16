import AboutSections from "@/components/course-details/AboutSections";
import Header from "@/components/course-details/Header";
import Requirements from "@/components/course-details/Requirements";
import Skills from "@/components/course-details/Skills";
import prisma from "@/lib/db";
import { lazy, Suspense } from "react";
const EditForm = lazy(() => import("@/components/course-details/EditForm"));
const EditFormButton = lazy(
  () => import("@/components/course-details/EditFormButton")
);

type Props = {
  params: Promise<{
    courseSlug: string;
  }>;
};
const CourseDetails = async ({ params }: Props) => {
  const { courseSlug } = await params;
  if (!courseSlug)
    return <h1 className="text-center font-bold m-4">Course not found</h1>;
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      description: true,
      updatedAt: true,
      prerequisites: true,
      createdAt: true,
      skills: true,
      sectionGroups: {
        select: {
          id: true,
          title: true,
          slug: true,
          order: true,
          sections: {
            select: {
              id: true,
              slug: true,
              title: true,
              order: true,
              sectionRates: {
                select: {
                  rate: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          name: true,
          id: true,
          role: true,
        },
      },
    },
  });

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
            <Requirements preriquisites={course.prerequisites} />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">Course content</h2>
          <AboutSections sectionGroups={course.sectionGroups} />
        </div>
        <Suspense>
          <section className="flex justify-end">
            <EditFormButton author={course.user} />
            <EditForm course={course} />
          </section>
        </Suspense>
      </section>
    </div>
  );
};

export default CourseDetails;
