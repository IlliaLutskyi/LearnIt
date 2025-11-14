import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addSkill, setNextStep } from "@/lib/slices/create-course-slice";
import { Step } from "@/types/create-course";
import Navigation from "./Navigation";
import Skill from "@/features/skills/components/create-course-form/Skill";
import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/features/animations/fade-in";
type Props = {
  step: Step;
};
const Step3 = ({ step }: Props) => {
  const { skills } = useAppSelector((state) => state.CreateCourse);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem("skills", JSON.stringify(skills));
    dispatch(setNextStep({ nextStep: step.step + 1 }));
  }
  function handleAddSkill() {
    dispatch(addSkill());
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
      onSubmit={handleSubmit}
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

          {skills.map((skill) => (
            <Skill key={skill.id} skill={skill} />
          ))}
        </section>
      </div>

      <Navigation currentStep={step.step} />
    </motion.form>
  );
};

export default Step3;
