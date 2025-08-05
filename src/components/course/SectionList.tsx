"use client";
import { DBSection } from "@/types/dbSection";
import Section from "./Section";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setCurrentSection } from "@/lib/slices/CourseViewSlice";

type Props = {
  sections: DBSection[];
};
const SectionList = ({ sections }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (sections.length === 0) return;
    dispatch(setCurrentSection(sections[0]));
  }, []);
  return (
    <div
      className="flex flex-col items-center gap-4 bg-black p-4 text-white overflow-y-auto"
      id="scrollbar"
    >
      {sections.map((section) => {
        return <Section section={section} key={section.id} />;
      })}
    </div>
  );
};

export default SectionList;
