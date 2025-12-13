import { DbCourse } from "@/types";
import Link from "next/link";

type Props = {
  courses: DbCourse[];
};
const Suggestions = ({ courses }: Props) => {
  return (
    <div className="absolute -bottom-14 left-0 w-full flex flex-col gap-2 p-4 bg-card text-card-foreground ring-1 ring-input rounded-sm">
      {courses.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
    </div>
  );
};
const Course = ({ course }: { course: DbCourse }) => {
  return (
    <div>
      <Link href={`/course/${course.slug}`}>{course.title}</Link>
    </div>
  );
};
export default Suggestions;
