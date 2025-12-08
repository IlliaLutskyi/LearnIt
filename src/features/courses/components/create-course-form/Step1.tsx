"use client";
import {
  setTitle,
  setDescription,
  setCategory,
  setNextStep,
} from "@/lib/slices/create-course-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Step } from "@/types/create-course";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "./Navigation";
import {
  CreateGeneralInfo,
  CreateGeneralInfoSchema,
} from "../../schemas/create-general-info-schema";
import { Input } from "@/components/common";
import CategorySelect from "@/features/categories/components/create-course-form/CategorySelect";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/features/animations/fade-in";
import { isJsonValid } from "@/utils/isJsonValid";

type Props = {
  step: Step;
};
const Step1 = ({ step }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: zodResolver(CreateGeneralInfoSchema) });

  const dispatch = useAppDispatch();
  const { title, description, category } = useAppSelector(
    (state) => state.CreateCourse
  );

  useEffect(() => {
    const generalInfo = localStorage.getItem("generalInfo");
    if (generalInfo && isJsonValid(generalInfo)) {
      const { title, description, category } = JSON.parse(generalInfo);
      setValue("title", title);
      setValue("description", description);
      dispatch(setCategory(category));
    }
  }, []);

  function onSubmit(data: CreateGeneralInfo) {
    dispatch(setTitle(data.title));
    dispatch(setDescription(data.description));
    dispatch(setCategory(data.category.id));

    localStorage.setItem(
      "generalInfo",
      JSON.stringify({
        title: data.title,
        description: data.description,
        category: category,
      })
    );
    dispatch(setNextStep({ nextStep: step.step + 1 }));
  }
  return (
    <motion.form
      className="flex flex-col gap-4 p-4 h-full"
      onSubmit={handleSubmit(onSubmit)}
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-lg font-bold self-center">{step.title}</h1>

      <section className="grow flex flex-col gap-2">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
          <Input
            label="course title"
            type="text"
            field="title"
            defaultValue={title}
            register={register}
            error={errors.title?.message}
            className="input-field"
          />
          <CategorySelect register={register} />
        </div>
        <div>
          <Input
            label="description"
            type="text"
            field="description"
            register={register}
            error={errors.description?.message}
            multiline={true}
            defaultValue={description}
            className="input-field h-[15rem] max-h-[20rem]"
          />
        </div>
      </section>

      <Navigation currentStep={step.step} />
    </motion.form>
  );
};

export default Step1;
