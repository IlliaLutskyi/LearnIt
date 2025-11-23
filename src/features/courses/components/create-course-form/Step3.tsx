import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addSkills, setNextStep } from "@/lib/slices/create-course-slice";
import { Skill as TSkill, Step } from "@/types/create-course";
import Navigation from "./Navigation";
import Skill from "@/features/skills/components/create-course-form/Skill";
import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/features/animations/fade-in";
import {
  CreateOrUpdateSkills,
  CreateOrUpdateSkillsSchema,
} from "@/features/skills/schemas/create-or-update-skills-schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
type Props = {
  step: Step;
};
const Step3 = ({ step }: Props) => {
  const { skills: initialSkills } = useAppSelector(
    (state) => state.CreateCourse
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateOrUpdateSkillsSchema),
    defaultValues: { skills: initialSkills },
  });

  const {
    fields: skills,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "skills",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  function onSubmit(data: CreateOrUpdateSkills) {
    dispatch(addSkills(data.skills as TSkill[]));
    localStorage.setItem("skills", JSON.stringify(skills));
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
            className="self-end mt-4 bg-purple-500 text-white text-sm px-4 py-2 hover:scale-95 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
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
          {skills.length === 0 && (
            <p className="text-center text-sm">No skills</p>
          )}

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
