import { AnimatePresence } from "framer-motion";
import { useFieldArray, useForm } from "react-hook-form";
import { Input, Loader } from "@/components/common";
import { GenerateQuiz, GenerateQuizSchema } from "../../schemas/generate-quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lesson } from "@/types/create-course";
import LessonContext from "./LessonContext";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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

  async function onSubmit(data: GenerateQuiz) {
    await mutation.mutateAsync(data);

    reset();

    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent asChild className="w-1/2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <DialogTitle className="text-center text-lg font-bold">
                AI Generator
              </DialogTitle>

              <section className="grow flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Input
                    label="Quantity of answers"
                    register={register}
                    field="answersQuantity"
                    error={errors.answersQuantity?.message}
                    type="number"
                    className="input-field"
                  />
                  <Input
                    label="Quantity of quizes"
                    register={register}
                    error={errors.quizzesQuantity?.message}
                    field="quizzesQuantity"
                    type="number"
                    className="input-field"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs">
                    Choose context on which{" "}
                    {Number(quizzesQuantity) > 1 ? "quizes" : "quiz"} will be
                    based on
                  </label>
                  <div
                    className="flex flex-col gap-2 overflow-y-auto max-h-[200px]"
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
                      <p className="text-xs text-error">
                        {errors.contents.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className="self-end flex items-center gap-2 bg-accent p-2 rounded-md text-sm text-accent-foreground hover:scale-95 duration-500 focus:scale-95"
              >
                {isSubmitting ? <Loader /> : "Generate"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default GenerateQuizForm;
