import { motion, AnimatePresence } from "framer-motion";
import { formEmergenceVariants } from "@/features/animations/form-emergence";
import { useFieldArray, useForm } from "react-hook-form";
import { BlurBackground, Input, Loader } from "@/components/common";
import { useEffect, useRef } from "react";
import { GenerateQuiz, GenerateQuizSchema } from "../../schemas/generate-quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lesson } from "@/types/create-course";
import LessonContext from "./LessonContext";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lessons: Lesson[];
  onSave?: (data: GenerateQuiz & { quizzes: string }) => void;
};
const GenerateQuizForm = ({ isOpen, setIsOpen, onSave, lessons }: Props) => {
  const mutation = useMutation({
    mutationFn: async (data: GenerateQuiz) => {
      const res = await api.post("/ai/quizzes", data);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (onSave) onSave({ quizzes: data.quizzes, ...variables });
    },
    onError: (error) => {
      if (isAxiosError(error)) toast.error(error.response?.data.message);
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(GenerateQuizSchema) });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents",
  });
  const quizzesQuantity = watch("quizzesQuantity");
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.id === "generate-lesson-anchor") return;
      if (formRef.current && !formRef.current.contains(target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function onSubmit(data: GenerateQuiz) {
    await mutation.mutateAsync(data);

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
            onSubmit={handleSubmit(onSubmit)}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-1/2 bg-white rounded-sm"
          >
            <h1 className="text-lg font-bold text-center">AI Generator</h1>

            <section className="grow flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Input
                  label="Quantity of answers"
                  register={register}
                  field="answersQuantity"
                  error={errors.answersQuantity?.message}
                  type="number"
                  className="outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
                />
                <Input
                  label="Quantity of quizes"
                  register={register}
                  error={errors.quizzesQuantity?.message}
                  field="quizzesQuantity"
                  type="number"
                  className="outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs">
                  Choose context on which{" "}
                  {Number(quizzesQuantity) > 1 ? "quizes" : "quiz"} will be
                  based on
                </label>
                <div
                  className="flex flex-col gap-2 overflow-y-auto h-[200px]"
                  id="scrollbar"
                >
                  {lessons.length == 0 && (
                    <p className="text-xs text-center m-auto">
                      No context created yet
                    </p>
                  )}
                  {lessons.map((lesson) => {
                    if (lesson.contentType === "Text") {
                      return (
                        <LessonContext
                          key={lesson.order}
                          lesson={lesson}
                          fields={fields}
                          append={append as any}
                          remove={remove}
                        />
                      );
                    }
                    return null;
                  })}
                  {errors.contents?.message && (
                    <p className="text-xs text-red-500">
                      {errors.contents.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="self-end bg-purple-500 p-2 rounded-md text-sm text-white hover:scale-95 duration-500 focus:scale-95 flex items-center gap-2"
            >
              {isSubmitting ? <Loader /> : "Generate"}
            </button>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
};

export default GenerateQuizForm;
