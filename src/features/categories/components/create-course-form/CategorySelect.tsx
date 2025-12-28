"use client";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { getCategories } from "../../queries/get-categories";
import { UseFormRegister } from "react-hook-form";
import { CreateGeneralInfo } from "@/features/courses/schemas/create-general-info-schema";

type Props = {
  register: UseFormRegister<CreateGeneralInfo>;
  error?: string;
};
const CategorySelect = ({ register, error }: Props) => {
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

      <select id="categories" {...register("category")} className="input-field">
        {categories?.map((category) => {
          return (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>

      <p className="text-xs text-error">{error}</p>
    </div>
  );
};

export default memo(CategorySelect);
