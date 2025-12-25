"use client";
import { SectionGroup } from "@/types/create-course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/common";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  SectionGroupProperties,
  SectionGroupPropertiesSchema,
} from "../../schemas/section-group-properties";
import { DbSectionGroup } from "@/types";

type Props = {
  isOpen: boolean;
  sectionGroup: SectionGroup | DbSectionGroup;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave?: (data: SectionGroupProperties) => void;
};
const PropertiesForm = ({ isOpen, sectionGroup, setIsOpen, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SectionGroupPropertiesSchema),
    defaultValues: {
      title: sectionGroup.title,
      showSectionsOnly: sectionGroup.showSectionsOnly
        ? sectionGroup.showSectionsOnly
        : false,
    },
  });

  function onSubmit(data: SectionGroupProperties) {
    onSave?.(data);

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
                Properties
              </DialogTitle>

              <Input
                label="title"
                register={register}
                field="title"
                autoFocus={true}
                error={errors.title?.message}
                className="input-field"
              />

              <section className="flex flex-col gap-2">
                <h2 className="text-xs">Display options:</h2>
                <label
                  htmlFor="showSectionsOnly"
                  className="has-checked:bg-accent/40 has-checked:text-accent-foreground flex justify-between p-2 ring-1 ring-accent rounded-sm"
                >
                  <span className="text-xs">Show sections only</span>

                  <input
                    type="checkbox"
                    id="showSectionsOnly"
                    className="checked:accent-accent accent-foreground"
                    {...register("showSectionsOnly")}
                  />
                </label>
              </section>

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

export default PropertiesForm;
