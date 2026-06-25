"use client";
import { FormSection } from "@/types/create-course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/common";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  SectionProperties,
  sectionPropertiesSchema,
} from "../../schemas/section-properties-schema";

type Props = {
  isOpen: boolean;
  section?: FormSection;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave?: (data: SectionProperties) => Promise<void>;
};
const RenameForm = ({ isOpen, section, setIsOpen, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(sectionPropertiesSchema),
    defaultValues: {
      title: section?.title || "",
    },
  });

  async function onSubmit(data: SectionProperties) {
    if (!isDirty) return;

    await onSave?.(data);

    reset();
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-1/2 p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <DialogTitle className="text-center text-lg font-bold">
                {section ? "Rename Section" : "Create Section"}
              </DialogTitle>

              <Input
                label="title"
                register={register}
                field="title"
                autoFocus={true}
                error={errors.title?.message}
                className="input-field"
              />

              <button className="self-end bg-accent p-2 rounded-md text-sm text-accent-foreground hover:scale-95 duration-400">
                Save
              </button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default RenameForm;
