"use client";
import React from "react";
import { $Enums } from "../../../prisma/generated/prisma";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentLesson } from "@/lib/slices/CourseViewSlice";
import { DBLesson } from "@/types/dbLesson";
type Props = {
  lesson: DBLesson;
};
const LessonLink = ({ lesson }: Props) => {
  const dispatch = useAppDispatch();
  const { currentLesson } = useAppSelector((store) => store.CourseView);
  return (
    <div>
      <Link
        href={`#lesson-${lesson.id}`}
        className={`text-sm duration-500 ${
          currentLesson && currentLesson.id === lesson.id
            ? "text-purple-400 underline"
            : "hover:underline "
        }`}
        onClick={() => {
          dispatch(setCurrentLesson(lesson));
        }}
      >
        {lesson.title}
      </Link>
    </div>
  );
};

export default LessonLink;
