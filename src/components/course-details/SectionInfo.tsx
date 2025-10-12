"use client";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useState, memo } from "react";
import Rating from "./Rating";
import { DbSectionGroup } from "@/types";
type Props = {
  sectionGroup: DbSectionGroup;
};
const SectionInfo = ({ sectionGroup }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col border-[1px] border-slate-300 ml-4">
      <button
        className="flex gap-4 bg-slate-200 p-2 hover:bg-slate-200/40 duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>
          {isOpen ? (
            <MdOutlineKeyboardArrowUp className="text-black" size={20} />
          ) : (
            <MdOutlineKeyboardArrowDown className="text-black" size={20} />
          )}
        </p>

        <p className="font-bold text-sm">{sectionGroup.title}</p>
      </button>

      {isOpen && sectionGroup?.sections && (
        <section className="flex flex-col gap-2 bg-slate-200 px-8 pb-2">
          {sectionGroup.sections.map((section) => {
            if (!section.sectionRates || section.sectionRates.length < 1)
              return null;

            const rating =
              section.sectionRates.reduce((a, b) => a + b.rate, 0) /
              section.sectionRates.length;

            return (
              <div
                key={section.id}
                className="flex justify-between items-center"
              >
                <p className="text-xs">
                  <span className="m-1"> {section.order}.</span>
                  {section.title}
                </p>

                <Rating rating={rating} starSize={10} />
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default memo(SectionInfo);
