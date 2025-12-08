"use client";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { getCategories } from "../../queries/get-categories";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { CreateGeneralInfo } from "@/features/courses/schemas/create-general-info-schema";

type Props = {
  register: UseFormRegister<CreateGeneralInfo>;
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
        className="input-field"
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
