"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddSectionButton from "./buttons/AddSectionButton";
import SectionGroups from "./SectionGroups";
import { toggleConfirmationForm } from "@/lib/slices/confirmation-form-slice";
import { lazy, Suspense, useEffect } from "react";
import SaveCourseButton from "./buttons/SaveContentButton";
import { loadContent } from "@/lib/slices/create-course-slice";
import { Step } from "@/types/create-course";
import Navigation from "./Navigation";

const ConfirmationForm = lazy(() => import("./ConfirmationForm"));
type Props = {
  step: Step;
};
const Step4 = ({ step }: Props) => {
  const { sectionGroups } = useAppSelector((state) => state.CreateCourse);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadContent());
  }, []);
  return (
    <div className="flex flex-col gap-2 p-4 h-full">
      <h1 className="text-lg font-bold self-center">{step.title}</h1>
      <section className="flex gap-4 items-center justify-between">
        <SaveCourseButton />
        <AddSectionButton />
      </section>

      {sectionGroups.length === 0 && (
        <p className="text-center text-sm">No section group</p>
      )}

      <section className="grow">
        <SectionGroups />
      </section>

      <Navigation currentStep={step.step} />

      <Suspense>
        <ConfirmationForm />
      </Suspense>
    </div>
  );
};

export default Step4;
