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
      className="grid max-sm:grid-cols-1  max-md:grid-cols-2 grid-cols-3 gap-3"
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
