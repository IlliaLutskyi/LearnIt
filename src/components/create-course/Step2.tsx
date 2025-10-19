import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import {
  addPrerequisite,
  setNextStep,
  setPreviousStep,
} from "@/lib/slices/create-course-slice";
import Prerequisit from "./Prerequisit";
import { Step } from "@/types/create-course";

type Props = {
  step: Step;
};
const Step2 = ({ step }: Props) => {
  const { prerequisites } = useAppSelector((state) => state.CreateCourse);
  function handleAction(next: boolean) {
    if (next) {
      dispatch(setNextStep({ currentStep: step.step }));
    } else {
      dispatch(setPreviousStep({ currentStep: step.step }));
    }
    localStorage.setItem("prerequisites", JSON.stringify(prerequisites));
  }
  function handleAddPreriquisite() {
    dispatch(addPrerequisite());
  }
  const dispatch = useAppDispatch();
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <h1 className="font-bold text-lg self-center">{step.title}</h1>

      <div className="grow flex flex-col gap-2">
        <section className="flex justify-end">
          <button
            className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
            onClick={handleAddPreriquisite}
          >
            Add prerequisit
          </button>
        </section>

        <section
          className="flex flex-col gap-4 overflow-y-auto h-[18rem] p-3"
          id="scrollbar"
        >
          {prerequisites.length === 0 && (
            <p className="text-center text-sm">No prerequisites</p>
          )}

          {prerequisites.map((prerequisite) => (
            <Prerequisit prerequisite={prerequisite} key={prerequisite.id} />
          ))}
        </section>
      </div>

      <div className="flex gap-4 justify-between items-center">
        <button
          className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
          onClick={() => handleAction(false)}
        >
          Back
        </button>
        <button
          onClick={() => handleAction(true)}
          className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
