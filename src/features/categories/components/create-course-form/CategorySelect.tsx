"use client";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
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
        defaultValue={categories[0]?.id}
        className="outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
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
