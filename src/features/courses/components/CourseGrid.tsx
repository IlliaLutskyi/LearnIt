import { parentVariants } from "@/features/animations/delay-children-appearing";
import { DbCourse } from "@/types";
import React from "react";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";
type Props = {
  courses: DbCourse[];
};
const CourseGrid = ({ courses }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </motion.div>
  );
};

export default CourseGrid;
