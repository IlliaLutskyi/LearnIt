"use client";
import { memo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DbCategory } from "@/types";

type Props = {
  categories: DbCategory[];
};
const CategoryBar = ({ categories }: Props) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter")
    ? searchParams.get("filter")
    : "all";

  return (
    <div className="flex flex-wrap gap-2">
      <Link href={`?filter=all`}>
        <button
          className={`${
            filter === "all"
              ? "bg-amber-100 text-orange-400"
              : "bg-purple-100 text-purple5600"
          } text-xs font-semibold px-3 py-1 hover:scale-95 duration-500 rounded-sm`}
        >
          All
        </button>
      </Link>
      {categories.map((category) => {
        const isActive = filter == category.name.trim();

        return (
          <Link href={`?filter=${category.name}`} key={category.id}>
            <button
              className={`${
                isActive
                  ? "bg-amber-100 text-orange-400"
                  : "bg-purple-100 text-purple-500"
              } text-xs font-semibold px-3 py-1 hover:scale-95 duration-500 rounded-sm`}
            >
              {category.name.slice(0, 1).toUpperCase() + category.name.slice(1)}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default memo(CategoryBar);
