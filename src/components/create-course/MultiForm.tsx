"use client";
import { useAppSelector } from "@/lib/hooks";
import { lazy, Suspense } from "react";
import Loader from "../common/Loader";

const Step1 = lazy(() => import("./Step1"));
const Step2 = lazy(() => import("./Step2"));
const Step3 = lazy(() => import("./Step3"));
const Step4 = lazy(() => import("./Step4"));

const MultiForm = () => {
  const steps = useAppSelector((store) => store.CreateCourse.steps);
  return (
    <div className="grid sm:grid-cols-[1fr_7fr] max-sm:grid-rows-[1fr_10fr] gap-4 max-sm:w-[95%] min-h-[500px] w-5/6 mx-auto mt-[2rem] bg-white rounded-md shadow-2xl caret-purple-500">
      <section className="flex sm:flex-col justify-center items-center gap-4 px-4 bg-purple-950 text-black rounded-bl-md rounded-tl-md ">
        {steps.map((step) => (
          <div className="flex items-center gap-4" key={step.step}>
            <span
              className={`self-center px-3 py-1 text-sm  rounded-full ${
                step.active ? "bg-purple-500 text-white" : "bg-white"
              } duration-400`}
            >
              {step.step}
            </span>
            <p
              className={`text-xs ${
                step.active ? "text-purple-500" : "text-white"
              } duration-400`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </section>
      <section className="text-black">
        {steps.map((step) => (
          <Suspense fallback={<Loader />} key={step.step}>
            {step.step === 1 && step.active && <Step1 step={step} />}
            {step.step === 2 && step.active && <Step2 step={step} />}
            {step.step === 3 && step.active && <Step3 step={step} />}
            {step.step === 4 && step.active && <Step4 step={step} />}
          </Suspense>
        ))}
      </section>
    </div>
  );
};

export default MultiForm;
