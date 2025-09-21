"use client";
import {
  setTitle,
  setDescription,
  setNextStep,
} from "@/lib/slices/CreateCourseSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import InputField from "../common/InputField";
import CategorySelect from "./CategorySelect";
type Props = {
  step: { step: number; title: string; active: boolean };
};
const Step1 = ({ step }: Props) => {
  const { title, description } = useAppSelector((state) => state.CreateCourse);
  const dispatch = useAppDispatch();
  function handleNext() {
    dispatch(setNextStep({ currentStep: step.step }));
  }
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <h1 className="text-lg font-bold self-center">{step.title}</h1>
      <div className="grow">
        <section className="grid sm:grid-cols-2 grid-cols-1 gap-2 ">
          <InputField
            label="Course title"
            type="text"
            value={title}
            maxLength={50}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            inputClassName="shadow-inner text-sm w-full p-2 shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
          />
          <CategorySelect />
        </section>
        <section>
          <InputField
            label="description"
            type="text"
            value={description}
            maxLength={1200}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            multiline={true}
            inputClassName="shadow-inner outline-none text-sm w-full h-[15rem]  resize-none  p-2  shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
          />
        </section>
      </div>
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
