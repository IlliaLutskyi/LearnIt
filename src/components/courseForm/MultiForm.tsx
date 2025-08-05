"use client";
import { useAppSelector } from "@/lib/hooks";
import Step1 from "./Step1";
import Step2 from "./Step2";

const MultiForm = () => {
  const steps = useAppSelector((state) => state.CreateCourse.steps);
  return (
    <div className="grid max-sm:grid-cols-[1fr_4fr] grid-cols-[1fr_8fr]  gap-4 w-3/4 mx-auto mt-[2rem] bg-white rounded-md shadow-2xl">
      <section className="flex flex-col justify-center items-center gap-4 p-2 bg-black text-black rounded-bl-md rounded-tl-md ">
        <span
          className={`self-center px-3 py-1 text-sm  rounded-full   ${
            steps.step1 ? "bg-purple-500 text-white" : "bg-white"
          }`}
        >
          1
        </span>
        <span
          className={`self-center px-3 py-1 text-sm rounded-full  ${
            steps.step2 ? "bg-purple-500 text-white" : "bg-white"
          }`}
        >
          2
        </span>
      </section>
      <section className="text-black">
        {steps.step1 && <Step1 />}
        {steps.step2 && <Step2 />}
      </section>
    </div>
  );
};

export default MultiForm;
