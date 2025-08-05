import Course from "@/components/courses/Course";
import prisma from "@/lib/db";

const Courses = async () => {
  const courses = await prisma.course.findMany({
    include: { category: true, user: true, sections: false },
  });
  return (
    <div className="flex flex-col gap-4 mx-[3rem] my-[2rem]">
      <h1 className="text-2xl font-bold text-center">All Courses</h1>
      <section className="grid max-sm:grid-cols-1  max-md:grid-cols-2 grid-cols-3 gap-6">
        {courses.map((course) => (
          <Course course={course} key={course.id} />
        ))}
      </section>
    </div>
  );
};

export default Courses;
