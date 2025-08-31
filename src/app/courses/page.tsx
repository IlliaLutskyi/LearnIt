"use client";
import CategoryBar from "@/components/courses/CategoryBar";
import CourseCard from "@/components/courses/CourseCard";
import api from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Prisma } from "../../../prisma/generated/prisma";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loader from "@/components/common/Loader";
type Course = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: Prisma.UserCreateInput;
  category: Prisma.CategoryCreateInput;
};

const PAGE_SIZE = 10;
const Courses = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { data, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<Course[]>({
      queryKey: ["courses"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await api.get(
          `/courses?page=${pageParam}&limit=${PAGE_SIZE}`
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
  }, [inView, isFetchingNextPage, hasNextPage]);

  if (isError) return <h1 className="text-center">Something went wrong</h1>;

  return (
    <div className="flex flex-col gap-4 mx-[3rem] my-[2rem]">
      <h1 className="text-2xl font-bold text-center">All Courses</h1>
      {/* <CategoryBar categories={categories} /> */}
      <section className="grid max-sm:grid-cols-1  max-md:grid-cols-2 grid-cols-3 gap-6">
        {data?.pages.map((page) =>
          page.map((course) => <CourseCard key={course.id} course={course} />)
        )}
      </section>
      {isFetchingNextPage && <Loader />}
      <div ref={ref} />
    </div>
  );
};
export default Courses;
