"use client";
import type { Section } from "@/types/create-course";
import React from "react";
type Props = {
  section: Section;
  currentSection: Section | undefined;
  setCurrentSection: React.Dispatch<React.SetStateAction<Section | undefined>>;
};
const Section = ({ section, currentSection, setCurrentSection }: Props) => {
  return (
    <div
      className={`${
        section.slug === currentSection?.slug
          ? "border-l-2 border-secondary-accent"
          : "border-l-2 hover:border-secondary-accent border-slate-200"
      } pl-4`}
      key={section.order}
    >
      <button
        onClick={() => {
          setCurrentSection(section);
        }}
        className={`text-sm text-start ${
          currentSection?.slug === section.slug
            ? "text-secondary-accent"
            : "hover:text-secondary-accent"
        } duration-400`}
      >
        {section.title}
      </button>
    </div>
  );
};

export default Section;
