"use client";
import { useAppDispatch } from "@/lib/hooks";
import { setCurrentSection } from "@/lib/slices/CourseViewSlice";

type Props = {
  nextSection: { id: number; sectionGroupId: number } | null;
  prevSection: { id: number; sectionGroupId: number } | null;
};
const Actions = ({ nextSection, prevSection }: Props) => {
  const dispatch = useAppDispatch();
  function handleGoBack() {
    if (!prevSection) return;
    dispatch(
      setCurrentSection({
        id: prevSection.id,
        sectionGroupId: prevSection.sectionGroupId,
      })
    );
  }
  function handleGoNext() {
    if (!nextSection) return;
    dispatch(
      setCurrentSection({
        id: nextSection.id,
        sectionGroupId: nextSection.sectionGroupId,
      })
    );
  }
  return (
    <div className="grow flex justify-between gap-4 items-end mx-4">
      <button
        onClick={handleGoBack}
        className={`text-sm text-purple-400 ${
          !prevSection
            ? "cursor-not-allowed"
            : "hover:text-purple-600 hover:underline"
        } duration-400 p-2`}
      >
        Go Back
      </button>

      <button
        onClick={handleGoNext}
        className={`text-sm text-purple-400 ${
          !nextSection
            ? "cursor-not-allowed"
            : "hover:text-purple-600 hover:underline"
        } duration-200 p-2`}
      >
        Go Next
      </button>
    </div>
  );
};

export default Actions;
