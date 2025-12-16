"use client";
import api from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { DbCourse } from "@/types";
import { motion } from "framer-motion";
import { parentVariants } from "@/features/animations/delay-children-appearing";
import CourseCard from "./CourseCard";
import { Loader } from "@/components/common";
import { useSearchParams } from "next/navigation";

const PAGE_SIZE = 10;

const CourseGrid = () => {
  const searchParams = useSearchParams();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const {
    data,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery<DbCourse[]>({
    queryKey: ["courses", searchParams.get("filter")],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(
        `/courses?page=${pageParam}&limit=${PAGE_SIZE}&filter=${
          searchParams.get("filter") ? searchParams.get("filter") : "all"
        }`
      );
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) fetchNextPage();
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (isError) return <h1 className="text-center">Something went wrong</h1>;
  if (isLoading) return <Loader />;

  return (
    <main className="flex flex-col gap-4">
      <motion.main
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        {data?.pages.flatMap((courses) => {
          return courses.map((course) => {
            return <CourseCard key={course.id} course={course} />;
          });
        })}
      </motion.main>

      <div ref={ref} />
    </main>
  );
};

export default CourseGrid;
