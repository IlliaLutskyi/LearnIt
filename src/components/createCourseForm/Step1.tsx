"use client";
import {
  setTitle,
  setDescription,
  setSteps,
} from "@/lib/slices/CreateCourseSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import InputField from "../common/InputField";
import CategorySelect from "./CategorySelect";
const Step1 = () => {
  const { title, description } = useAppSelector((state) => state.CreateCourse);
  const dispatch = useAppDispatch();
  function handleNext() {
    dispatch(setSteps({ step1: false, step2: true }));
  }
  return (
    <div className="flex flex-col gap-2 p-4 ">
      <h1 className="text-lg font-bold self-center">General information</h1>
      <section className="grid grid-cols-2 gap-2 ">
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
      <InputField
        label="description"
        type="text"
        value={description}
        maxLength={1200}
        onChange={(e) => dispatch(setDescription(e.target.value))}
        multiline={true}
        inputClassName="shadow-inner text-sm w-full h-[15rem]  resize-none  p-2  shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
      />
      <button
        className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700  duration-500"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
