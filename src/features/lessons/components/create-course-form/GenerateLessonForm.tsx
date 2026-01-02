import { AnimatePresence } from "framer-motion";
import { Input, Loader } from "@/components/common";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type GenerateLesson,
  GenerateLessonSchema,
} from "../../schemas/generate-lesson-schema";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AiResponse } from "../../schemas/ai-response-schema";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave?: (data: GenerateLesson & { lesson: AiResponse }) => Promise<void>;
};
const GenerateLessonForm = ({ isOpen, setIsOpen, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(GenerateLessonSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: GenerateLesson) => {
      const res = await api.post("/ai/lessons", data);
      return res.data;
    },
    onSuccess: async (data, variables) => {
      await onSave?.({ lesson: data.lesson, ...variables });
      setIsOpen(false);
    },
    onError: (error) => {
      if (isAxiosError(error)) toast.error(error.response?.data.message);
    },
  });

  async function onSubmit(data: GenerateLesson) {
    await mutation.mutateAsync(data);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent asChild className="w-1/2 p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <DialogTitle className="text-center text-lg font-bold">
                AI Generator
              </DialogTitle>

              <section className="flex flex-col gap-1">
                <label className="text-xs" htmlFor="lessonType">
                  Content type:
                </label>
                <select
                  id="lessonType"
                  className="input-field"
                  defaultValue="Text"
                  {...register("contentType")}
                >
                  <option value="Text">Text</option>
                  <option value="Table">Table</option>
                  <option value="HighlightedCode">Highlighted Code</option>
                </select>
              </section>

              <section className="grow flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Input
                    label="Title"
                    register={register}
                    field="title"
                    error={errors.title?.message}
                    className="input-field"
                  />
                </div>

                <Input
                  label="Prompt"
                  register={register}
                  field="prompt"
                  error={errors.prompt?.message}
                  className="input-field h-[10rem] max-h-[15rem]"
                  multiline
                />
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className="self-end flex items-center gap-2 bg-accent p-2 rounded-md text-sm text-accent-foreground hover:scale-95 duration-400"
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

export default GenerateLessonForm;
