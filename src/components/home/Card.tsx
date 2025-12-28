"use client";
import { DbCategory } from "@/types";
import { useState } from "react";

type Props = {
  category: DbCategory;
};
const Card = ({ category }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      key={category.id}
      className="flex flex-col gap-2 bg-card text-card-foreground hover:shadow-lg hover:shadow-accent p-2 rounded-sm duration-400"
    >
      <h3 className="text-lg">
        {category.name &&
          category.name[0].toUpperCase() + category.name.slice(1)}
      </h3>

      <div className="grow flex flex-col">
        <p
          className={`text-muted-foreground text-sm ${
            isExpanded ? "line-clamp-none" : "line-clamp-2"
          }`}
        >
          {category.description}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-end mt-auto text-secondary-accent text-xs font-semibold px-3 py-1 hover:scale-95 duration-400 rounded-sm"
        >
          {isExpanded ? "Less" : "+ Show more"}
        </button>
      </div>
    </div>
  );
};

export default Card;
