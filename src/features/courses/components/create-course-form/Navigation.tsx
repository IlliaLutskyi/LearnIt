"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleConfirmationForm } from "@/lib/slices/confirmation-form-slice";
import { setNextStep } from "@/lib/slices/create-course-slice";

type Props = {
  currentStep: number;
};
const Navigation = ({ currentStep }: Props) => {
  const steps = useAppSelector((store) => store.CreateCourse.steps);
  const isLoading = useAppSelector((store) => store.ConfirmationForm.isLoading);
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-4 justify-between items-center">
      {currentStep !== 1 && (
        <button
          type="button"
          onClick={() => dispatch(setNextStep({ nextStep: currentStep - 1 }))}
          className="self-start mr-auto mt-4 bg-purple-500 text-white text-sm px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
        >
          Back
        </button>
      )}

      <button
        type="submit"
        onClick={() =>
          currentStep === steps.length && dispatch(toggleConfirmationForm(true))
        }
        className="self-end ml-auto mt-4 bg-purple-500 text-white text-sm px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
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
