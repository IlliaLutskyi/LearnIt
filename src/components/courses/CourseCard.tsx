import React from "react";
import { Prisma } from "../../../prisma/generated/prisma";

import Link from "next/link";

type Props = {
  course: {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    user: Prisma.UserCreateInput;
    category: Prisma.CategoryCreateInput;
  };
};
const CourseCard = ({ course }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 duration-500 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="self-start bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
          {course.category.name}
        </span>
        <img src={course.category.image} className="w-4 h-4 rounded-full"></img>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
        {course.title}
      </h2>

      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

      <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
        <span>{new Date(course.createdAt).toLocaleDateString()}</span>
        <Link href={`/course/${course.id}`}>
          <span className="text-purple-600 font-medium hover:underline">
            View Details →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
