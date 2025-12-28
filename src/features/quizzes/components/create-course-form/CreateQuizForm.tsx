"use client";
import { useEffect } from "react";
import Answers from "./Answers";
import { Lesson } from "@/types/create-course";
import { Input } from "@/components/common";
import { DbLesson } from "@/types";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateQuiz, CreateQuizSchema } from "../../schemas/create-quiz";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lesson?: Lesson | DbLesson;
  onSave?: (data: CreateQuiz) => void;
};
const CreateQuizForm = ({ isOpen, setIsOpen, lesson, onSave }: Props) => {
  const {
    control,
    register,
    formState: { errors, isDirty },
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
  }, [setValue, isOpen, lesson]);

  function onSubmit(data: CreateQuiz) {
    if (!isDirty) return;

    if (onSave) onSave(data);

    reset();

    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent asChild className="w-11/12 p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <DialogTitle className="text-center text-lg font-bold">
                Create Quiz
              </DialogTitle>

              <section className="flex flex-col gap-4">
                <Input
                  label="Title"
                  {...register("title")}
                  error={errors.title?.message}
                  className="input-field"
                />

                <section className="grid grid-cols-2 gap-4">
                  <Input
                    label="Question"
                    {...register("question")}
                    multiline
                    error={errors.question?.message}
                    className="input-field h-[6rem] resize-none"
                  />
                  <Input
                    label="Explanation (optional)"
                    {...register("explanation")}
                    error={errors.explanation?.message}
                    multiline
                    className="input-field h-[6rem] resize-none"
                  />
                </section>
              </section>

              <section className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() =>
                    append({ content: "Answer", isCorrect: false })
                  }
                  className="bg-accent self-end text-accent-foreground text-sm p-2 rounded-sm hover:scale-95 focus:scale-95 duration-400"
                >
                  Add answer
                </button>

                <div className="overflow-y-auto max-h-[200px]" id="scrollbar">
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
                className="self-end bg-accent text-accent-foreground text-sm p-2 mt-2 rounded-sm hover:scale-95 duration-400"
              >
                Save
              </button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default CreateQuizForm;
