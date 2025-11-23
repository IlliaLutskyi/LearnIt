import Link from "next/link";
import React from "react";
import Rating from "../../features/ratings/components/Rating";
import { DbCourse } from "@/types";

type Props = {
  course: DbCourse;
};
const Header = ({ course }: Props) => {
  return (
    <div className="flex max-sm:flex-col gap-3 px-8 py-4 min-h-[300px] bg-purple-100">
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-sm text-gray-800">{course.description}</p>
          <Rating rating={4.5} />
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <span className="text-xs text-purple-800">
            Created by: {course?.user?.name}
          </span>
          <span className="text-xs text-purple-800">
            Created at:{" "}
            {course.createdAt &&
              new Date(course.createdAt).toLocaleDateString()}
          </span>
          <span className="text-xs text-purple-800">
            Last updated:{" "}
            {course.updatedAt &&
              new Date(course.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </section>
      <section className="min-w-[200px] mt-auto ml-auto">
        <Link
          href={`/course/${course.slug}/${course?.sectionGroups?.[0].slug}/${course?.sectionGroups?.[0]?.sections?.[0].slug}`}
        >
          <button
            className="w-full p-2 bg-purple-500 text-white rounded-xs hover:bg-purple- 
          hover:scale-95 focus:scale-95 duration-500"
          >
            Get started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Header;
