"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { FaSort } from "react-icons/fa";
import { type SectionGroup } from "@/types/sectionGroup";
import Sections from "./Sections";
import SectionGroupMenu from "./SectionGroupMenu";
import { memo, use, useEffect, useState } from "react";
type Props = {
  sectionGroup: SectionGroup;
};
const SectionGroup = ({ sectionGroup }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sectionGroup.order });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <Collapsible className="shadow-md rounded-md p-4">
        <div className="flex justify-between">
          <CollapsibleTrigger>
            <h1 className="font-bold">{sectionGroup.title}</h1>
          </CollapsibleTrigger>
          <section className="flex gap-2">
            <SectionGroupMenu sectionGroup={sectionGroup} />
            <button {...attributes} {...listeners}>
              <FaSort />
            </button>
          </section>
        </div>
        <CollapsibleContent>
          {sectionGroup.sections.length > 0 ? (
            <Sections
              key={sectionGroup.order}
              sections={sectionGroup.sections}
            />
          ) : (
            <p className="text-sm text-center">No sections</p>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default memo(SectionGroup);
