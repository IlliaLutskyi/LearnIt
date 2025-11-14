"use client";
import { useAppSelector } from "@/lib/hooks";
import { setCategory } from "@/lib/slices/create-course-slice";
import { useQuery } from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../services/get-categories";
import { UseFormRegister } from "react-hook-form";
import { CreateGeneralInfoSchema } from "@/features/courses/schemas/create-general-info-schema";
import z from "zod";
type GeneralInfo = z.infer<typeof CreateGeneralInfoSchema>;
type Props = {
  register: UseFormRegister<GeneralInfo>;
};
const CategorySelect = ({ register }: Props) => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (!categories) return null;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="categories" className="text-xs">
        Category
      </label>
      <select
        id="categories"
        {...register("category.id")}
        defaultValue={categories[0].id}
        className="outline-0 shadow-md text-sm w-full p-2 rounded-sm"
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
