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
import DropZone from "@/features/lessons/components/create-course-form/lessonTypeOptions/DropZone";
import { useEffect } from "react";
import { Loader } from "@/components/common";

type Props = {
  course: DbCourse;
};
const GeneralInfoTab = ({ course }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    resolver: zodResolver(CreateGeneralInfoSchema),
    defaultValues: {
      title: course.title,
      description: course.description,
      category: course.category.id,
      poster: course.poster,
    },
  });

  const poster = watch("poster");

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<CreateGeneralInfo>) => {
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

  function showPreview(inputRef: React.RefObject<HTMLInputElement | null>) {
    return (
      <button
        type="button"
        className="flex flex-col gap-1 h-full"
        onClick={() => inputRef?.current?.click()}
      >
        <p className="text-xs text-left">Poster</p>
        <img
          src={poster}
          className="w-full h-full object-cover rounded-sm"
          alt="Poster image"
        />
      </button>
    );
  }
  async function onSubmit(data: CreateGeneralInfo) {
    if (!isDirty) return;

    const generalInfo: Partial<CreateGeneralInfo> = {};

    for (const [info, dirty] of Object.entries(dirtyFields)) {
      if (dirty) {
        generalInfo[info as keyof CreateGeneralInfo] =
          data[info as keyof CreateGeneralInfo];
      }
    }

    await updateMutation.mutateAsync(generalInfo);
    dispatch(toggleEditCourseDetailForm());
  }

  return (
    <form
      className="flex flex-col gap-2 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold text-center text-lg">General information</h1>
      <section className="grid grid-cols-[1fr_4fr] gap-2">
        <div>
          <DropZone
            previewComponent={showPreview}
            onLoad={async (file) => {
              const buffer = Buffer.from(await file.arrayBuffer());
              const base64 = `data:${file.type};base64,${buffer.toString(
                "base64"
              )}`;

              setValue("poster", base64, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          />
        </div>

        <div className="grow flex flex-col gap-2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            <Input
              label="Course title"
              {...register("title")}
              error={errors.title?.message}
              className="input-field"
            />

            <CategorySelect
              register={register}
              error={errors.category?.message}
            />
          </div>

          <div>
            <Input
              label="description"
              {...register("description")}
              multiline={true}
              error={errors.description?.message}
              className="input-field h-[15rem] resize-none"
            />
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={updateMutation.isPending}
        className="self-end bg-accent text-accent-foreground p-2 text-sm hover:scale-95 focus:scale-95 rounded-sm duration-400"
      >
        {updateMutation.isPending ? <Loader /> : "Save"}
      </button>
    </form>
  );
};

export default GeneralInfoTab;
