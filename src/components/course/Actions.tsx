"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentSection } from "@/lib/slices/CourseViewSlice";
import { DBSection } from "@/types/dbSection";
import { current } from "@reduxjs/toolkit";

type Props = {
  sections: DBSection[];
};
const Actions = ({ sections }: Props) => {
  const { currentSection } = useAppSelector((store) => store.CourseView);
  const dispatch = useAppDispatch();
  function handleGoBack() {
    const preSection = sections.find(
      (section) => section.order === currentSection!.order - 1
    );
    if (preSection) {
      dispatch(setCurrentSection(preSection));
    }
  }
  function handleNextLesson() {
    const nextSection = sections.find(
      (section) => section.order === currentSection!.order + 1
    );
    if (nextSection) {
      dispatch(setCurrentSection(nextSection));
    }
  }
  return (
    <div className="grow flex justify-center gap-4 items-end">
      {currentSection?.order !== 1 && (
        <button
          className="text-sm bg-purple-500 text-white p-2 rounded-sm hover:scale-95 duration-500"
          onClick={handleGoBack}
        >
          Go back to previous lesson
        </button>
      )}

      {currentSection?.order !== sections.length && (
        <button
          className="text-sm bg-purple-500 text-white p-2 rounded-sm hover:scale-95 duration-500"
          onClick={handleNextLesson}
        >
          Go to next lesson
        </button>
      )}
    </div>
  );
};

export default Actions;
