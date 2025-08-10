"use client";
import { useAppSelector } from "@/lib/hooks";
import { lazy, Suspense } from "react";
import Loader from "../common/Loader";

const Step1 = lazy(() => import("./Step1"));
const Step2 = lazy(() => import("./Step2"));

const MultiForm = () => {
  const steps = useAppSelector((state) => state.CreateCourse.steps);
  return (
    <div className="grid max-sm:grid-cols-[1fr_4fr] grid-cols-[1fr_8fr]  gap-4 max-sm:w-[95%] min-h-[400px] w-3/4 mx-auto mt-[2rem] bg-white rounded-md shadow-2xl">
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
        {steps.step1 && (
          <Suspense fallback={<Loader />}>
            <Step1 />
          </Suspense>
        )}
        {steps.step2 && (
          <Suspense fallback={<Loader />}>
            <Step2 />
          </Suspense>
        )}
      </section>
    </div>
  );
};

export default MultiForm;
