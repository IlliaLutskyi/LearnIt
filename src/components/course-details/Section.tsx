import { DbSection } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { memo } from "react";
import { FaSort } from "react-icons/fa";
type Props = {
  section: DbSection;
};
const Section = ({ section }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex justify-between ring-1 ring-ring rounded-sm p-4"
      ref={setNodeRef}
      style={style}
    >
      <p className="font-bold">{section.title}</p>

      <section>
        <button type="button" {...attributes} {...listeners}>
          <FaSort />
        </button>
      </section>
    </div>
  );
};

export default memo(Section);
