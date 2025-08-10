"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddSectionButton from "./Buttons/AddSectionButton";
import { setSteps } from "@/lib/slices/CreateCourseSlice";
import SectionGroups from "./SectionGroups";
import { toggleConfirmationForm } from "@/lib/slices/ConfirmationFormSlice";
import { lazy, Suspense } from "react";
import Loader from "../common/Loader";
import SaveOrClearCourseButton from "./Buttons/SaveOrClearCourseButton";
const ConfirmationForm = lazy(() => import("./ConfirmationForm"));

const Step2 = () => {
  const { sectionGroups } = useAppSelector((state) => state.CreateCourse);
  const isLoading = useAppSelector((state) => state.ConfirmationForm.isLoading);
  const dispatch = useAppDispatch();

  function handleAction(next: boolean) {
    if (next) {
    } else {
      dispatch(setSteps({ step1: true, step2: false }));
    }
  }
  function handleConfirmationForm() {
    dispatch(toggleConfirmationForm(true));
  }
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-lg font-bold self-center">Content creation</h1>
      <section className="flex gap-4 items-center justify-between">
        <SaveOrClearCourseButton />
        <AddSectionButton />
      </section>

      {sectionGroups.length === 0 && (
        <h1 className="text-center text-sm">No section group</h1>
      )}

      <SectionGroups />

      <div className="flex gap-4 justify-between items-center">
        <button
          className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
          onClick={() => handleAction(false)}
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
      </div>

      <Suspense>
        <ConfirmationForm />
      </Suspense>
    </div>
  );
};

export default Step2;
