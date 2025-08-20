"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentSectionId } from "@/lib/slices/CourseViewSlice";
import { DbSection } from "@/types/dbSection";
import { useEffect } from "react";

type Props = {
  section: DbSection;
};
const Section = ({ section }: Props) => {
  const dispatch = useAppDispatch();
  const { currentSectionId } = useAppSelector((store) => store.CourseView);
  useEffect(() => {
    if (section.order === 1) dispatch(setCurrentSectionId(section.id));
  }, [section]);
  return (
    <div onClick={() => dispatch(setCurrentSectionId(section.id))}>
      <h1
        className={`${
          currentSectionId === section.id
            ? "text-purple-400"
            : "text-white hover:text-purple-400"
        } duration-400`}
      >
        {section.title}
      </h1>
    </div>
  );
};

export default Section;
