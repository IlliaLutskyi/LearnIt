"use client";
import api from "@/lib/axios";
import { Category } from "@/types/create-course/category";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, memo } from "react";
import { GeneralInfo } from "./tabs/GeneralInfoTab";

type Props = {
  generalInfo: GeneralInfo | undefined;
  setGenralInfo: React.Dispatch<React.SetStateAction<GeneralInfo | undefined>>;
};
const CategorySelect = ({ generalInfo, setGenralInfo }: Props) => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data?.categories;
    },
  });
  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    if (!generalInfo) return;
    setGenralInfo({ ...generalInfo, category: { id: Number(e.target.value) } });
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="categories" className="text-xs">
        Category
      </label>
      <select
        id="categories"
        onChange={(e) => handleCategoryChange(e)}
        value={generalInfo?.category.id}
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
