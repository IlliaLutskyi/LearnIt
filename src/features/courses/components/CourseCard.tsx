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
      className="flex flex-col gap-4 bg-card text-card-foreground rounded-xl shadow-md hover:shadow-lg hover:scale-105 duration-500 p-5"
      variants={childVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        <span className="self-start border-[1px] border-secondary-accent text-secondary-accent text-xs font-semibold px-3 py-1 rounded-sm">
          {course?.category?.name}
        </span>
        <img
          src={course?.category?.image || ""}
          alt={`${course?.category?.name} icon`}
          className="w-4 h-4 rounded-full"
        />
      </div>

      <h2 className="text-xl font-bold text-foreground line-clamp-1">
        {course.title}
      </h2>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {course.description}
      </p>

      <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
        <span>
          {course.createdAt && new Date(course.createdAt).toLocaleDateString()}
        </span>

        <Link href={`/course/${course.slug}`}>
          <button className="bg-background text-foreground ring-1 ring-accent py-2 px-4 rounded-sm hover:scale-95 hover:bg-accent hover:text-accent-foreground duration-500">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
