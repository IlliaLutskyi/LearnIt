"use client";
import { memo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DbCategory } from "@/types";
import { motion } from "framer-motion";
import {
  childVariants,
  parentVariants,
} from "@/features/animations/delay-children-appearing";

type Props = {
  categories: DbCategory[];
};
const CategoryBar = ({ categories }: Props) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter")
    ? searchParams.get("filter")
    : "all";

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
      <Link href={`?filter=all`}>
        <motion.button
          className={`${
            filter === "all"
              ? "bg-secondary-accent text-secondary-accent-foreground"
              : "bg-card text-card-foreground shadow-sm"
          } text-xs font-semibold px-3 py-1 hover:scale-95 duration-500 rounded-sm`}
          variants={childVariants}
        >
          All
        </motion.button>
      </Link>

      {categories.map((category) => {
        const isActive = filter == category?.name?.trim();

        return (
          <Link href={`?filter=${category.name}`} key={category.id}>
            <motion.button
              className={`${
                isActive
                  ? "bg-secondary-accent text-secondary-accent-foreground"
                  : "bg-card text-card-foreground shadow-sm"
              } text-xs font-semibold px-3 py-1 hover:scale-95 duration-500 rounded-sm`}
              variants={childVariants}
            >
              {category.name &&
                category.name.slice(0, 1).toUpperCase() +
                  category.name.slice(1)}
            </motion.button>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default memo(CategoryBar);
