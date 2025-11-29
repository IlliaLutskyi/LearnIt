"use client";
import { useAppDispatch } from "@/lib/hooks";
import {
  editSection,
  renameSectionGroup,
} from "@/lib/slices/create-course-slice";
import { Section, SectionGroup } from "@/types/create-course";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/common";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
const DataSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
});
type Data = z.infer<typeof DataSchema>;
type Props = {
  isOpen: boolean;
  section?: Section;
  sectionGroup?: SectionGroup;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const RenameForm = ({ isOpen, section, sectionGroup, setIsOpen }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DataSchema),
  });
  const dispatch = useAppDispatch();

  function onSubmit(data: Data) {
    if (section) {
      dispatch(
        editSection({
          sectionGroupOrder: section.sectionGroupOrder,
          title: data.title,
          sectionOrder: section.order,
        })
      );
    } else if (sectionGroup) {
      dispatch(
        renameSectionGroup({
          title: data.title,
          sectionGroupOrder: sectionGroup.order,
        })
      );
    }
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-1/2 p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <DialogTitle className="text-center text-lg font-bold">
                Rename Section
              </DialogTitle>

              <Input
                label="title"
                register={register}
                field="title"
                autoFocus={true}
                defaultValue={section ? section.title : sectionGroup?.title}
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
