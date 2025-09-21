"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddSectionButton from "./buttons/AddSectionButton";

import SectionGroups from "./SectionGroups";
import { toggleConfirmationForm } from "@/lib/slices/ConfirmationFormSlice";
import { lazy, Suspense } from "react";
import SaveOrClearCourseButton from "./buttons/SaveOrClearCourseButton";
import { setNextStep, setPreviousStep } from "@/lib/slices/CreateCourseSlice";
const ConfirmationForm = lazy(() => import("./ConfirmationForm"));
type Props = {
  step: { step: number; title: string; active: boolean };
};
const Step4 = ({ step }: Props) => {
  const { sectionGroups } = useAppSelector((state) => state.CreateCourse);
  const isLoading = useAppSelector((state) => state.ConfirmationForm.isLoading);
  const dispatch = useAppDispatch();
  function handlePreviousStep() {
    dispatch(setPreviousStep({ currentStep: step.step }));
  }
  function handleConfirmationForm() {
    dispatch(toggleConfirmationForm(true));
  }
  return (
    <div className="flex flex-col gap-2 p-4 h-full">
      <h1 className="text-lg font-bold self-center">{step.title}</h1>
      <section className="flex gap-4 items-center justify-between">
        <SaveOrClearCourseButton />
        <AddSectionButton />
      </section>

      {sectionGroups.length === 0 && (
        <p className="text-center text-sm">No section group</p>
      )}

      <section className="grow">
        <SectionGroups />
      </section>

      <section className="flex gap-4 justify-between items-center">
        <button
          className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
          onClick={handlePreviousStep}
        >
          Back
        </button>
        <button
          onClick={handleConfirmationForm}
          disabled={isLoading}
          className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </section>

      <Suspense>
        <ConfirmationForm />
      </Suspense>
    </div>
  );
};

export default Step4;
