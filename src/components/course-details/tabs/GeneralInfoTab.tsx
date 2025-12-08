"use client";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { DbCourse } from "@/types";
import Input from "@/components/common/Input";
import { useAppDispatch } from "@/lib/hooks";
import { toggleEditCourseDetailForm } from "@/lib/slices/edit-course-detail-form-slice";
import { useForm } from "react-hook-form";
import {
  CreateGeneralInfo,
  CreateGeneralInfoSchema,
} from "@/features/courses/schemas/create-general-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CategorySelect from "@/features/categories/components/create-course-form/CategorySelect";
import { DialogTitle } from "@/components/ui/dialog";

type Props = {
  course: DbCourse;
};
const GeneralInfoTab = ({ course }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateGeneralInfoSchema),
    defaultValues: {
      description: course.description,
      title: course.title,
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: CreateGeneralInfo) => {
      const res = await api.patch(`/courses/${course.id}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      router.push(`/course/${data.slug}`);
      return toast.success("General info updated successfully");
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  function onSubmit(data: CreateGeneralInfo) {
    updateMutation.mutate(data);
    dispatch(toggleEditCourseDetailForm());
  }
  return (
    <form
      className="flex flex-col gap-2 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle className="font-bold text-center text-lg">
        General information
      </DialogTitle>

      <section className="grow flex flex-col gap-2">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
          <Input
            label="Course title"
            type="text"
            register={register}
            field="title"
            error={errors.title?.message}
            className="input-field"
          />
          <CategorySelect register={register} />
        </div>
        <div>
          <Input
            label="description"
            type="text"
            register={register}
            field="description"
            multiline={true}
            error={errors.description?.message}
            className="input-field h-[15rem] resize-none"
          />
        </div>
      </section>

      <button
        type="submit"
        className="self-end bg-accent text-accent-foreground p-2 text-sm hover:scale-95 focus:scale-95 rounded-sm duration-400"
      >
        Save
      </button>
    </form>
  );
};

export default GeneralInfoTab;
