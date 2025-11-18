"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "sonner";
import Answers from "./Answers";
import { Lesson } from "@/types/create-course";
import { BlurBackground, Input } from "@/components/common";
import { DbLesson } from "@/types";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateQuiz, CreateQuizSchema } from "../../schemas/create-quiz";
import { formEmergenceVariants } from "@/features/animations/form-emergence";
import { motion, AnimatePresence } from "framer-motion";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lesson?: Lesson | DbLesson;
  onSave?: (data: CreateQuiz) => void;
};
const CreateQuizForm = ({ isOpen, setIsOpen, lesson, onSave }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    control,
    register,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(CreateQuizSchema),
  });

  const {
    fields: answers,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "answers",
  });

  useEffect(() => {
    if (lesson && lesson.quiz) {
      setValue("title", lesson.title);
      setValue("question", lesson.quiz.question);
      setValue("answers", lesson.quiz.answers);
      setValue(
        "explanation",
        lesson.quiz.explanation ? lesson.quiz.explanation : ""
      );
    }
  }, [isOpen, lesson]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.id === "create-quiz-anchor") return;
      if (
        formRef.current &&
        !formRef.current.contains(target.closest("form"))
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function onSubmit(data: CreateQuiz) {
    if (onSave) onSave(data);

    reset();

    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <BlurBackground />
          <motion.form
            ref={formRef}
            variants={formEmergenceVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-6 w-9/10 bg-white rounded-sm"
          >
            <h1 className="text-lg font-bold self-center">Create Quiz</h1>

            <section className="flex flex-col gap-2">
              <Input
                label="Title"
                {...register("title")}
                error={errors.title?.message}
                className="w-full text-sm outline-none focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
              />

              <section className="grid grid-cols-2 gap-4">
                <Input
                  label="Question"
                  {...register("question")}
                  multiline
                  error={errors.question?.message}
                  className="w-full text-sm outline-none focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm h-[6rem] resize-none"
                />
                <Input
                  label="Explanation (optional)"
                  {...register("explanation")}
                  error={errors.explanation?.message}
                  multiline
                  className="w-full text-sm outline-none focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm h-[6rem] resize-none"
                />
              </section>
            </section>

            <section className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => append({ content: "Answer", isCorrect: false })}
                className="bg-purple-500 self-end text-white text-sm p-2 rounded-sm hover:bg-purple-700 hover:scale-95 focus:scale-95 duration-500"
              >
                Add answer
              </button>

              <div className="overflow-y-auto h-[12rem]" id="scrollbar">
                <Answers
                  answers={answers}
                  remove={remove}
                  register={register}
                  errors={errors}
                />
              </div>
            </section>

            <button
              type="submit"
              className="bg-purple-500 self-end text-white text-sm p-2 rounded-sm hover:bg-purple-700   hover:scale-95 focus:scale-95 duration-500 mt-2"
            >
              Save
            </button>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateQuizForm;
