"use client";
import {
  setTitle,
  setDescription,
  setCategory,
  setNextStep,
  setPoster,
} from "@/lib/slices/create-course-slice";
import { useAppDispatch } from "@/lib/hooks";
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
import DropZone from "@/features/lessons/components/create-course-form/lessonTypeOptions/DropZone";

type Props = {
  step: Step;
};
const Step1 = ({ step }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({ resolver: zodResolver(CreateGeneralInfoSchema) });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const generalInfo = localStorage.getItem("generalInfo");

    if (generalInfo && isJsonValid(generalInfo)) {
      const { title, description, category, poster } = JSON.parse(generalInfo);

      setValue("poster", poster);
      setValue("title", title);
      setValue("description", description);
      setValue("category", category);
    }
  }, [setValue]);

  const posterValue = watch("poster");
  function showPreview(inputRef: React.RefObject<HTMLInputElement | null>) {
    return (
      <button
        type="button"
        className="flex flex-col gap-1 h-full"
        onClick={() => inputRef?.current?.click()}
      >
        <p className="text-xs text-left">Poster</p>
        <img
          src={posterValue}
          className="w-full h-full object-cover rounded-sm"
          alt="Poster image"
        />
      </button>
    );
  }
  async function onSubmit(data: CreateGeneralInfo) {
    dispatch(setTitle(data.title));
    dispatch(setPoster(data.poster));
    dispatch(setDescription(data.description));
    dispatch(setCategory(data.category));

    localStorage.setItem(
      "generalInfo",
      JSON.stringify({
        poster: data.poster,
        title: data.title,
        description: data.description,
        category: data.category,
      }),
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

      <section className="grow grid grid-cols-[1fr_3fr] items-center gap-2">
        <DropZone
          message="Poster"
          onLoad={async (file) => {
            const base64 = Buffer.from(await file.arrayBuffer()).toString(
              "base64",
            );

            const image = `data:${file.type};base64,${base64}`;

            setValue("poster", image);
          }}
          error={errors.poster?.message}
          previewComponent={posterValue ? showPreview : undefined}
        />

        <div className="flex flex-col gap-2 h-full">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            <Input
              label="course title"
              type="text"
              field="title"
              register={register}
              error={errors.title?.message}
              className="input-field"
            />
            <CategorySelect
              register={register}
              error={errors.category?.message}
            />
          </div>

          <Input
            label="description"
            type="text"
            field="description"
            register={register}
            error={errors.description?.message}
            multiline={true}
            className="input-field h-[17rem] resize-none"
          />
        </div>
      </section>

      <Navigation currentStep={step.step} />
    </motion.form>
  );
};

export default Step1;
