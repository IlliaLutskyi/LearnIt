"use client";
import {
  setTitle,
  setDescription,
  setNextStep,
} from "@/lib/slices/create-course-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import InputField from "../common/InputField";
import CategorySelect from "./CategorySelect";
import { Step } from "@/types/create-course";
import { useEffect, useState } from "react";
type Props = {
  step: Step;
};
const Step1 = ({ step }: Props) => {
  const dispatch = useAppDispatch();
  const { title, description } = useAppSelector((state) => state.CreateCourse);
  const [status, setStatus] = useState({
    titleError: "",
    descriptionError: "",
  });
  useEffect(() => {
    setStatus({
      titleError: !title ? "Title is required" : "",
      descriptionError: !description ? "Description is required" : "",
    });
  }, [title, description]);
  function handleNext() {
    dispatch(setNextStep({ currentStep: step.step }));
  }
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <h1 className="text-lg font-bold self-center">{step.title}</h1>
      <section className="grow flex flex-col gap-2">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
          <InputField
            label="Course title"
            type="text"
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            errorMessage={status.titleError}
            inputClassName="shadow-inner text-sm w-full p-2 shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
          />
          <CategorySelect />
        </div>
        <div>
          <InputField
            label="description"
            type="text"
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            errorMessage={status.descriptionError}
            multiline={true}
            inputClassName="shadow-inner outline-none text-sm w-full h-[15rem]  resize-none  p-2  shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </section>
      <section className="flex justify-end items-center">
        <button
          className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700  duration-500"
          onClick={handleNext}
        >
          Next
        </button>
      </section>
    </div>
  );
};

export default Step1;
