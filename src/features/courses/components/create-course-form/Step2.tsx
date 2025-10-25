import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { addPrerequisite } from "@/lib/slices/create-course-slice";
import Prerequisite from "@/features/prerequisites/components/create-course-form/Prerequisite";
import { Step } from "@/types/create-course";
import Navigation from "./Navigation";

type Props = {
  step: Step;
};
const Step2 = ({ step }: Props) => {
  const { prerequisites } = useAppSelector((state) => state.CreateCourse);
  function handleAddPreriquisite() {
    dispatch(addPrerequisite());
  }
  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem("prerequisites", JSON.stringify(prerequisites));
  }
  return (
    <form className="h-full flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      <h1 className="font-bold text-lg self-center">{step.title}</h1>

      <div className="grow flex flex-col gap-2">
        <section className="flex justify-end">
          <button
            type="button"
            className="self-end mt-4 bg-purple-500 text-white text-sm px-4 py-2 hover:scale-95 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
            onClick={handleAddPreriquisite}
          >
            Add prerequisit
          </button>
        </section>

        <section
          className="flex flex-col gap-4 overflow-y-auto h-[20rem] p-3"
          id="scrollbar"
        >
          {prerequisites.length === 0 && (
            <p className="text-center text-sm">No prerequisites</p>
          )}

          {prerequisites.map((prerequisite) => (
            <Prerequisite prerequisite={prerequisite} key={prerequisite.id} />
          ))}
        </section>
      </div>

      <Navigation currentStep={step.step} />
    </form>
  );
};

export default Step2;
