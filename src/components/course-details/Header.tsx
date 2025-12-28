import Link from "next/link";
import React from "react";
import Rating from "../../features/ratings/components/Rating";
import { DbCourse } from "@/types";

type Props = {
  course: DbCourse;
  courseRate: number | null;
};
const Header = ({ course, courseRate }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr] gap-3 px-8 py-4 min-h-[300px]">
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-primary">{course.title}</h1>
          <p className="text-sm text-muted-foreground">{course.description}</p>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {courseRate && <Rating rating={courseRate} />}

          <span className="text-xs text-accent">
            Created by: {course?.user?.name}
          </span>

          <span className="text-xs text-accent">
            Created at:{" "}
            {course.createdAt &&
              new Date(course.createdAt).toLocaleDateString()}
          </span>

          <span className="text-xs text-accent">
            Last updated:{" "}
            {course.updatedAt &&
              new Date(course.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-4 h-full">
        <img
          src={course.poster}
          alt={course.title}
          className="w-full mx-auto object-cover rounded-sm"
          width={300}
          height={350}
        />

        <Link
          href={`/course/${course.slug}/${course?.sectionGroups?.[0].slug}/${course?.sectionGroups?.[0]?.sections?.[0].slug}`}
        >
          <button className="self-end w-full p-2 bg-accent text-accent-foreground rounded-xs hover:scale-95 focus:scale-95 duration-400">
            Get started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Header;
