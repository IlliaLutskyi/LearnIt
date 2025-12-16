import CategoryBar from "@/features/categories/components/CategoryBar";
import Loader from "@/components/common/Loader";
import CourseGrid from "@/features/courses/components/CourseGrid";
import { getCategories } from "@/features/categories/services/get-categories";
import { Suspense } from "react";

const Courses = async () => {
  const categories = await getCategories();
  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col gap-4 m-4">
        <h1 className="text-2xl font-bold text-center">Courses</h1>
        <CategoryBar categories={categories} />

        <CourseGrid />
      </div>
    </Suspense>
  );
};
export default Courses;
