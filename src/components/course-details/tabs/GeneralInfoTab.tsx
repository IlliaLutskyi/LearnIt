"use client";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import CategorySelect from "../../../features/categories/components/CategorySelect";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { DbCourse } from "@/types";
import Input from "@/components/common/Input";
import { useAppDispatch } from "@/lib/hooks";
import { toggleEditCourseDetailForm } from "@/lib/slices/edit-course-detail-form-slice";
export type GeneralInfo = {
  title: string;
  description: string;
  category: { id: number } | undefined;
};

type Props = {
  course: DbCourse;
};
const GeneralInfoTab = ({ course }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo | undefined>();
  const updateMutation = useMutation<{ message: string; slug: string }>({
    mutationFn: async () => {
      if (!generalInfo) return;
      const res = await api.patch(`/courses/${course.id}`, generalInfo);
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

  useEffect(() => {
    if (!course) return;
    setGeneralInfo({
      title: course.title,
      description: course.description,
      category: course.category,
    });
  }, [course]);

  function handleTitleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    if (!generalInfo) return;
    setGeneralInfo({ ...generalInfo, title: e.target.value });
  }
  function handleDescriptionChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    if (!generalInfo) return;
    setGeneralInfo({ ...generalInfo, description: e.target.value });
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMutation.mutate();
    dispatch(toggleEditCourseDetailForm());
  }
  return (
    <form
      className="flex flex-col gap-2 h-full"
      method="PATCH"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold text-center text-lg">General information</h2>
      {generalInfo && (
        <section className="grow flex flex-col gap-2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            <Input
              label="Course title"
              type="text"
              value={generalInfo.title}
              onChange={handleTitleChange}
              className="text-sm w-full p-2 shadow-md rounded-sm outline-none focus:ring-1 focus:ring-purple-500"
            />
            <CategorySelect
              generalInfo={generalInfo}
              setGenralInfo={setGeneralInfo}
            />
          </div>
          <div>
            <Input
              label="description"
              type="text"
              value={generalInfo.description}
              multiline={true}
              onChange={handleDescriptionChange}
              className="text-sm w-full h-[15rem] resize-none p-2 shadow-md rounded-sm outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </section>
      )}

      <button
        type="submit"
        className="self-end bg-purple-500 text-white p-2 text-sm hover:scale-95 focus:scale-95 rounded-sm hover:bg-purple-600 duration-300"
      >
        Save
      </button>
    </form>
  );
};

export default GeneralInfoTab;
