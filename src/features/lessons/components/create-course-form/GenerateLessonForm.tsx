import { formEmergenceVariants } from "@/features/animations/form-emergence";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BlurBackground, Input, Loader } from "@/components/common";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type GenerateLesson,
  GenerateLessonSchema,
} from "../../schemas/generate-lesson-schema";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { ContentType } from "@/types/create-course";
import { isAxiosError } from "axios";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave?: (data: {
    content: string;
    title: string;
    contentType: ContentType;
  }) => void;
};
const GenerateLessonForm = ({ isOpen, setIsOpen, onSave }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(GenerateLessonSchema),
  });
  const contentType = watch("contentType");
  const mutation = useMutation({
    mutationFn: async (data: GenerateLesson) => {
      const res = await api.post("/ai/lesson", data);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (onSave) onSave({ content: data.lesson, ...variables });
      setIsOpen(false);
    },
    onError: (error) => {
      if (isAxiosError(error)) toast.error(error.response?.data.message);
    },
  });
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

  async function onSubmit(data: GenerateLesson) {
    await mutation.mutateAsync(data);
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

            <div className="flex items-center gap-4">
              <label className="text-xs" htmlFor="lessonType">
                Content type:
              </label>
              <select
                id="lessonType"
                className="outline-0 text-xs shadow-sm p-2 rounded-sm"
                {...register("contentType")}
              >
                <option value="Text">Text</option>
                <option value="Quiz">Quiz</option>
                {/* <option value="Video">Video</option>
                <option value="Table">Excel Table</option>
                <option value="Markdown">Markdown</option> */}
              </select>
            </div>

            <section className="grow flex flex-col gap-2">
              {contentType === "Text" && (
                <div className="flex flex-col gap-2">
                  <Input
                    label="Title"
                    register={register}
                    field="title"
                    error={errors.title?.message}
                    className="w-full outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
                  />
                </div>
              )}
              {contentType === "Quiz" && (
                <div className="grow flex flex-col gap-2"></div>
              )}
              <Input
                label="Prompt"
                register={register}
                field="prompt"
                error={errors.prompt?.message}
                className="w-full outline-0 min-h-[200px] text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm"
                multiline
              />
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

export default GenerateLessonForm;
