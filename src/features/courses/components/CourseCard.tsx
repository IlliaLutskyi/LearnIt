import React from "react";
import Link from "next/link";
import { DbCourse } from "@/types";
import { motion } from "framer-motion";
import { childVariants } from "@/features/animations/delay-children-appearing";
type Props = {
  course: DbCourse;
};
const CourseCard = ({ course }: Props) => {
  return (
    <motion.div
      className="flex flex-col gap-3 bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-105 duration-500 p-5"
      variants={childVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        <span className="self-start bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-sm">
          {course?.category?.name}
        </span>
        <img
          src={course?.category?.image || ""}
          alt={`${course?.category?.name} icon`}
          className="w-4 h-4 rounded-full"
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
        {course.title}
      </h2>

      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

      <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
        <span>
          {course.createdAt && new Date(course.createdAt).toLocaleDateString()}
        </span>
        <Link href={`/course/${course.slug}`}>
          <span className="text-purple-600 font-medium hover:text-purple-800">
            View Details →
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
