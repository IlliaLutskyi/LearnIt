"use client";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { DbCourse } from "@/types";
import { useAppDispatch } from "@/lib/hooks";
import { toggleEditCourseDetailForm } from "@/lib/slices/edit-course-detail-form-slice";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateOrUpdatePrerequisites,
  CreateOrUpdatePrerequisitesSchema,
} from "@/features/prerequisites/schemas/create-or-update-prerequisete-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Prerequisite from "@/features/prerequisites/components/create-course-form/Prerequisite";
import { DialogTitle } from "@/components/ui/dialog";
type Props = {
  course: DbCourse;
};
const PrerequisitesTab = ({ course }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateOrUpdatePrerequisitesSchema),
    defaultValues: {
      prerequisites: course.prerequisites,
    },
  });

  const {
    fields: prerequisites,
    append,
    remove,
  } = useFieldArray({ control, name: "prerequisites" });

  const updateMutation = useMutation({
    mutationFn: async (data: CreateOrUpdatePrerequisites) => {
      const res = await api.patch(
        "/prerequisites",
        data.prerequisites.map((p) => ({ ...p, courseId: course.id }))
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Prerequisites updated successfully");
      router.refresh();
      dispatch(toggleEditCourseDetailForm());
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  async function onSubmit(data: CreateOrUpdatePrerequisites) {
    await updateMutation.mutateAsync(data);
  }

  return (
    <form
      className="flex flex-col gap-2 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle className="font-bold text-center text-lg">
        Prerequisites
      </DialogTitle>

      <button
        type="button"
        className="self-end bg-accent text-accent-foreground px-4 py-2 text-sm hover:scale-95 focus:scale-95 rounded-sm duration-400"
        onClick={async () => append({ content: "" })}
      >
        Add Prerequisite
      </button>

      <div
        className="grow flex flex-col gap-2 overflow-y-auto h-[20rem] py-4"
        id="styledScrollbar"
      >
        {prerequisites.length === 0 && (
          <p className="text-center text-xs">No prerequisites</p>
        )}
        {prerequisites.map((prerequisite, index) => (
          <Prerequisite
            register={register}
            key={prerequisite.id}
            index={index}
            remove={remove}
            error={errors.prerequisites?.[index]?.content?.message}
          />
        ))}
      </div>

      <button
        type="submit"
        className="self-end bg-accent text-accent-foreground p-2 text-sm hover:scale-95 focus:scale-95 rounded-sm duration-400"
      >
        Save
      </button>
    </form>
  );
};

export default PrerequisitesTab;
