"use client";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useState, memo } from "react";
import Rating from "@/features/ratings/components/Rating";
import { DbSectionGroup } from "@/types";
import { motion } from "framer-motion";
import { fadeInOutWithShiftVariants } from "@/features/animations/fade-in-out-with-shift";

type Props = {
  sectionGroup: DbSectionGroup;
};
const SectionInfo = ({ sectionGroup }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className="flex flex-col ml-4"
      variants={fadeInOutWithShiftVariants}
      initial="hidden"
      whileInView={"visible"}
    >
      <button
        className="flex gap-2 bg-accent duration-300 p-2 text-accent-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>
          {isOpen ? (
            <MdOutlineKeyboardArrowUp size={20} />
          ) : (
            <MdOutlineKeyboardArrowDown size={20} />
          )}
        </p>

        <p className="font-bold text-sm">{sectionGroup.title}</p>
      </button>

      {isOpen && sectionGroup?.sections && (
        <section className="flex flex-col gap-3 p-2">
          {sectionGroup.sections.map((section) => {
            if (!section.sectionRates) return null;
            const rating =
              section.sectionRates.reduce((a, b) => a + b.rate, 0) /
              section.sectionRates.length;

            return (
              <motion.div
                variants={fadeInOutWithShiftVariants}
                initial="hidden"
                whileInView={"visible"}
                key={section.id}
                className="flex justify-between items-center"
              >
                <p className="text-xs font-bold">
                  <span className="m-1">{section.order}.</span>
                  {section.title}
                </p>

                <Rating rating={rating} starSize={10} />
              </motion.div>
            );
          })}
        </section>
      )}
    </motion.div>
  );
};

export default memo(SectionInfo);
