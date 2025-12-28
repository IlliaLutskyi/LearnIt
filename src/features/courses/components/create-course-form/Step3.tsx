import { useAppDispatch } from "@/lib/hooks";
import { addSkills, setNextStep } from "@/lib/slices/create-course-slice";
import { Skill as TSkill, Step } from "@/types/create-course";
import Navigation from "./Navigation";
import Skill from "@/features/skills/components/create-course-form/Skill";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/features/animations/fade-in";
import {
  CreateSkills,
  CreateSkillsSchema,
} from "@/features/skills/schemas/create-skills-schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isJsonValid } from "@/utils/isJsonValid";
type Props = {
  step: Step;
};
const Step3 = ({ step }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateSkillsSchema),
  });

  const {
    fields: skills,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedSkills = localStorage.getItem("skills");

    if (savedSkills && isJsonValid(savedSkills))
      setValue("skills", JSON.parse(savedSkills));
  }, []);

  function onSubmit(data: CreateSkills) {
    dispatch(addSkills(data.skills as TSkill[]));

    localStorage.setItem("skills", JSON.stringify(data.skills));

    dispatch(setNextStep({ nextStep: step.step + 1 }));
  }
  function handleAddSkill() {
    append({ content: "Skill" });
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        behavior: "smooth",
        top: scrollRef.current.scrollHeight,
      });
    }
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
            onClick={handleAddSkill}
          >
            Add skill
          </button>
        </section>

        <section
          ref={scrollRef}
          className="flex flex-col gap-4 overflow-y-auto h-[20rem] p-3"
          id="scrollbar"
        >
          {skills.length === 0 &&
            (errors.skills?.message ? (
              <p className="text-center text-sm text-error">
                {errors.skills.message}
              </p>
            ) : (
              <p className="text-center text-sm">No skills</p>
            ))}

          {skills.map((skill, index) => (
            <Skill
              key={skill.id}
              index={index}
              register={register}
              remove={remove}
              error={errors.skills?.[index]?.content?.message}
            />
          ))}
        </section>
      </div>

      <Navigation currentStep={step.step} />
    </motion.form>
  );
};

export default Step3;
