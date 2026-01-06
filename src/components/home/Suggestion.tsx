import { DbCourse } from "@/types";
import Link from "next/link";

type Props = {
  course: DbCourse;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Suggestion = ({ course, setIsOpen }: Props) => {
  return (
    <Link href={`/course/${course.slug}`} onClick={() => setIsOpen(false)}>
      <div className="grid grid-cols-[1fr_4fr] items-center gap-2 hover:bg-primary/10 p-2 rounded-sm duration-400">
        <img
          src={course.poster}
          alt={course.title}
          className="rounded-sm object-cover"
          width={150}
          height={200}
        />
        <section className="flex flex-col gap-2">
          <p className="font-bold text-xl">{course.title}</p>
          <p className="text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </section>
      </div>
    </Link>
  );
};

export default Suggestion;
