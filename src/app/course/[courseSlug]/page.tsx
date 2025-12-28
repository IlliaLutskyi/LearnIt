import AboutSections from "@/features/sections/components/AboutSections";
import Header from "@/components/course-details/Header";
import Prerequisites from "@/features/prerequisites/components/Prerequisites";
import Skills from "@/features/skills/components/Skills";
import { lazy, Suspense } from "react";
import { getCourse } from "@/features/courses/services/get-course";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { isAdmin, isAuthor } from "@/features/users/permissions";
import { Loader } from "@/components/common";

const EditCourseDetailsForm = lazy(
  () => import("@/components/course-details/EditCourseDetailsForm")
);
const EditEditCourseDetailsButton = lazy(
  () => import("@/components/course-details/EditEditCourseDetailsButton")
);

type Props = {
  params: Promise<{
    courseSlug: string;
  }>;
};
const CourseDetails = async ({ params }: Props) => {
  const { courseSlug } = await params;
  const session = await getServerSession(authOptions);

  if (!courseSlug)
    return <h1 className="text-center font-bold m-4">Course not found</h1>;

  const { course, courseRate } = await getCourse(courseSlug);
  if (!course)
    return <h1 className="text-center font-bold m-4">Course not found</h1>;

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col gap-2">
        <Header course={course} courseRate={courseRate} />
        <section className="flex flex-col gap-4 px-8 py-2">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-lg">Prerequisites:</h2>

            <Prerequisites preriquisites={course.prerequisites} />
          </div>

          <div className="flex flex-col gap-4 p-5 border-[1px] border-accent rounded-sm">
            <h2 className="font-bold text-lg">What you&apos;ll learn</h2>

            <Skills skills={course.skills} />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-lg">Course content</h2>

            <AboutSections sectionGroups={course.sectionGroups} />
          </div>

          {(isAdmin(session?.user) ||
            isAuthor(course.user.id, session?.user)) && (
            <Suspense>
              <section className="flex justify-end">
                <EditEditCourseDetailsButton />
                <EditCourseDetailsForm course={course} />
              </section>
            </Suspense>
          )}
        </section>
      </div>
    </Suspense>
  );
};

export default CourseDetails;
