"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setNextStep } from "@/lib/slices/create-course-slice";
import { Dispatch } from "react";

type Props = {
  currentStep: number;
  setIsPreviewOpen?: Dispatch<React.SetStateAction<boolean>>;
};
const Navigation = ({ currentStep, setIsPreviewOpen }: Props) => {
  const steps = useAppSelector((store) => store.CreateCourse.steps);
  const isLoading = useAppSelector((store) => store.ConfirmationForm.isLoading);
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-4 justify-between items-center">
      {currentStep !== 1 && (
        <button
          type="button"
          onClick={() => dispatch(setNextStep({ nextStep: currentStep - 1 }))}
          className="self-start mr-auto mt-4 bg-accent text-accent-foreground text-sm px-4 py-2 hover:scale-95 rounded-sm duration-400"
        >
          Back
        </button>
      )}

      <button
        type="submit"
        onClick={() => {
          if (currentStep === steps.length && setIsPreviewOpen)
            setIsPreviewOpen(true);
        }}
        className="self-end ml-auto mt-4 bg-accent text-accent-foreground text-sm px-4 py-2 hover:scale-95 rounded-sm duration-400"
      >
        {currentStep === steps.length
          ? isLoading
            ? "Loading"
            : "Create"
          : "Next"}
      </button>
    </div>
  );
};

export default Navigation;
