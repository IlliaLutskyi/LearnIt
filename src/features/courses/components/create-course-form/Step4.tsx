"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddSectionButton from "@/features/sections/components/create-course-form/AddSectionButton";
import SectionGroups from "@/features/sections/components/create-course-form/SectionGroups";
import { lazy, Suspense, useEffect } from "react";
import SaveContentButton from "@/features/sections/components/create-course-form/SaveContentButton";
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
        <SaveContentButton />
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
