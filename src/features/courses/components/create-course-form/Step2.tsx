import { useAppDispatch } from "@/lib/hooks";
import {
  addPrerequisites,
  setNextStep,
} from "@/lib/slices/create-course-slice";
import Prerequisite from "@/features/prerequisites/components/create-course-form/Prerequisite";
import type {
  Prerequisite as TPrerequisite,
  Step,
} from "@/types/create-course";
import Navigation from "./Navigation";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/features/animations/fade-in";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePrerequisites,
  CreatePrerequisitesSchema,
} from "@/features/prerequisites/schemas/create-prerequisite-schema";
import { useEffect, useRef } from "react";
import { isJsonValid } from "@/utils/isJsonValid";

type Props = {
  step: Step;
};
const Step2 = ({ step }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreatePrerequisitesSchema),
  });

  const {
    fields: prerequisites,
    append,
    remove,
  } = useFieldArray({ control, name: "prerequisites" });

  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedPrerequisites = localStorage.getItem("prerequisites");

    if (savedPrerequisites && isJsonValid(savedPrerequisites))
      setValue("prerequisites", JSON.parse(savedPrerequisites));
  }, [setValue]);

  function handleAddPreriquisite() {
    append({ content: "Prerequisite" });

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        behavior: "smooth",
        top: scrollRef.current.scrollHeight,
      });
    }
  }
  function onSubmit(data: CreatePrerequisites) {
    dispatch(addPrerequisites(data.prerequisites as TPrerequisite[]));
    localStorage.setItem("prerequisites", JSON.stringify(data.prerequisites));
    dispatch(setNextStep({ nextStep: step.step + 1 }));
  }

  return (
    <motion.form
      className="h-full flex flex-col gap-4 p-4"
      onSubmit={handleSubmit(onSubmit)}
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="font-bold text-lg self-center">{step.title}</h1>
      <div className="grow flex flex-col gap-2">
        <section className="flex justify-end">
          <button
            type="button"
            className="self-end mt-4 bg-accent text-accent-foreground text-sm px-4 py-2 hover:scale-95 rounded-sm duration-400"
            onClick={handleAddPreriquisite}
          >
            Add prerequisit
          </button>
        </section>

        <section
          ref={scrollRef}
          className="flex flex-col gap-4 overflow-y-auto h-[20rem] p-3"
          id="scrollbar"
        >
          {prerequisites.length === 0 &&
            (errors.prerequisites?.message ? (
              <p className="text-center text-sm text-error">
                {errors.prerequisites.message}
              </p>
            ) : (
              <p className="text-center text-sm">No prerequisites</p>
            ))}

          {prerequisites.map((prerequisite, index) => (
            <Prerequisite
              index={index}
              register={register}
              remove={remove}
              error={errors.prerequisites?.[index]?.content?.message}
              key={prerequisite.id}
            />
          ))}
        </section>
      </div>

      <Navigation currentStep={step.step} />
    </motion.form>
  );
};

export default Step2;
