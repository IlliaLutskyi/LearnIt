"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentSection } from "@/lib/slices/CourseViewSlice";
import { DbSection } from "@/types/dbSection";
import { useEffect } from "react";

type Props = {
  section: DbSection;
};
const Section = ({ section }: Props) => {
  const dispatch = useAppDispatch();
  const { currentSection } = useAppSelector((store) => store.CourseView);
  useEffect(() => {
    if (section.order === 1)
      dispatch(
        setCurrentSection({
          id: section.id,
          sectionGroupId: section.sectionGroupId,
        })
      );
  }, [section]);
  return (
    <div
      onClick={() =>
        dispatch(
          setCurrentSection({
            id: section.id,
            sectionGroupId: section.sectionGroupId,
          })
        )
      }
    >
      <h1
        className={`text-sm ${
          currentSection.id === section.id
            ? "text-orange-300"
            : "text-white hover:text-orange-300"
        } duration-400`}
      >
        {section.title}
      </h1>
    </div>
  );
};

export default Section;
