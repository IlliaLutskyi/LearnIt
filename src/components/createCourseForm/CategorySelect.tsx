"use client";
import api from "@/lib/axios";
import { useAppSelector } from "@/lib/hooks";
import { setCategory } from "@/lib/slices/CreateCourseSlice";
import { Category } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { useDispatch } from "react-redux";

const CategorySelect = () => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api("/categories");
      return res.data?.categories;
    },
  });
  const { category } = useAppSelector((state) => state.CreateCourse);
  console.log(category);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-1 ">
      <label htmlFor="categories" className="text-sm">
        Category
      </label>
      <select
        id="categories"
        onChange={(e) => dispatch(setCategory(e.target.value))}
        value={category}
        className="outline-0 shadow-md text-sm w-full p-2 rounded-md"
      >
        {categories?.map((category) => {
          return (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default memo(CategorySelect);
