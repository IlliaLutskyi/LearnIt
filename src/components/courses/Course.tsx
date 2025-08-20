import type { Course } from "@/types/course";
import React from "react";
import { Prisma } from "../../../prisma/generated/prisma";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
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
const Course = ({ course }: Props) => {
  return (
    <Link
      href={`/course/${course.id}`}
      className="flex flex-col gap-4 bg-slate-100 p-4 rounded-md hover:translate-y-[-1rem] hover:shadow-lg duration-700"
    >
      <div className="self-center">
        <Avatar>
          <AvatarImage
            src={course.category.image}
            className="w-10 h-10 rounded-full"
          />
          <AvatarFallback className="bg-purple-400 p-3">
            {course.title.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="grow text-center p-2 border-t-[1px] border-gray-200">
        <h1 className="font-bold text-center text-lg text-pretty break-words">
          {course.title}
        </h1>
        <p className="text-sm  text-pretty break-words">
          {course.description.slice(
            0,
            course.description.length > 100 ? 100 : course.description.length
          )}
          ...
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-right text-xs text-purple-400">
          Category: {course.category.name}
        </p>
        <p className="text-right text-xs text-purple-400">
          Made by: {course.user.name}
        </p>
      </div>
    </Link>
  );
};

export default Course;
