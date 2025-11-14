"use client";
import CategoryBar from "@/features/categories/components/CategoryBar";
import CourseCard from "@/features/courses/components/CourseCard";
import api from "@/lib/axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loader from "@/components/common/Loader";
import { useSearchParams } from "next/navigation";
import { DbCourse } from "@/types";
import { getCategories } from "@/features/categories/services/get-categories";
import { motion } from "framer-motion";
import { parentVariants } from "@/features/animations/delay-children-appearing";
import CourseGrid from "@/features/courses/components/CourseGrid";
const PAGE_SIZE = 10;
const Courses = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const searchParams = useSearchParams();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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
  }, [inView, isFetchingNextPage, hasNextPage]);

  if (isError) return <h1 className="text-center">Something went wrong</h1>;
  if (!data || !categories) return <Loader />;

  return (
    <div className="flex flex-col gap-4 m-8">
      <h1 className="text-xl font-bold text-center">Course Catalog</h1>

      <CategoryBar categories={categories} />

      <CourseGrid courses={data.pages.flatMap((page) => page)} />

      {(isFetchingNextPage || isLoading) && <Loader />}

      <div ref={ref} />
    </div>
  );
};
export default Courses;
