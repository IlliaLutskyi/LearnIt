"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import SectionMenu from "./SectionMenu";
import { FaSort } from "react-icons/fa";
import Lessons from "./Lessons";
import type { Section } from "@/types/section";
import { memo } from "react";
type Props = {
  section: Section;
};
const Section = ({ section }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.order });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <Collapsible className="shadow-md rounded-md p-4">
        <div className="flex justify-between">
          <CollapsibleTrigger>
            <h1 className="font-bold">{section.title}</h1>
          </CollapsibleTrigger>
          <section className="flex gap-2">
            <SectionMenu section={section} />
            <button {...attributes} {...listeners}>
              <FaSort />
            </button>
          </section>
        </div>
        <CollapsibleContent>
          {section.lessons.length > 0 ? (
            <Lessons lessons={section.lessons} />
          ) : (
            <p className="text-sm text-center">No Lessons</p>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default memo(Section);
