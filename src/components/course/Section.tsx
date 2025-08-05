"use client";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import LessonLink from "./LessonLink";
import { useAppDispatch } from "@/lib/hooks";
import { setCurrentSection } from "@/lib/slices/CourseViewSlice";
import { DBSection } from "@/types/dbSection";

type Props = {
  section: DBSection;
};
const Section = ({ section }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <Collapsible
      key={section.id}
      className="w-full"
      open={isOpen}
      onClick={() => {
        dispatch(setCurrentSection(section));
      }}
      onOpenChange={() => setIsOpen(!isOpen)}
    >
      <section>
        <CollapsibleTrigger className="w-full flex items-center justify-between">
          <h1 className="text-lg hover:underline">{section.title}</h1>
          {isOpen ? <FaArrowUp /> : <FaArrowDown />}
        </CollapsibleTrigger>
      </section>
      <CollapsibleContent className="flex flex-col gap-1 border-l-[1px] border-gray-200 pl-6 ml-3">
        {section.lessons.map((lesson) => {
          return <LessonLink lesson={lesson} key={lesson.id} />;
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Section;
