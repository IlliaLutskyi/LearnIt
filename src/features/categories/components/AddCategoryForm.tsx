"use client";

import { Input, Loader } from "@/components/common";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  CreateCategory,
  CreateCategorySchema,
} from "../schemas/create-category-schema";
import DropZone from "@/features/lessons/components/create-course-form/lessonTypeOptions/DropZone";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import {
  setCategory,
  toggleAddOrEditCategoryForm,
} from "@/lib/slices/add-or-edit-category-form-slice";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  UpdateCategory,
  UpdateCategorySchema,
} from "../schemas/update-category-schema";

const AddOrEditCategoryForm = () => {
  const dispatch = useAppDispatch();

  const { isOpen, category } = useAppSelector(
    (store) => store.AddOrEditCategoryForm
  );

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    reset,
  } = useForm({
    resolver: zodResolver(
      category ? UpdateCategorySchema : CreateCategorySchema
    ),
  });

  const addMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("/categories", data);

      return res.data;
    },
    onSuccess: (data) => {
      reset();

      toast.success(data.message);

      router.refresh();
      dispatch(toggleAddOrEditCategoryForm(false));
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  const editMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.patch(`/categories/${category?.id || ""}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      reset();

      toast.success(data.message);

      router.refresh();

      dispatch(setCategory(undefined));
      dispatch(toggleAddOrEditCategoryForm(false));
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  useEffect(() => {
    if (!category) return;

    setValue("name", category.name || "");
    setValue("description", category.description || "");
  }, [category, setValue]);

  async function onSubmit(data: CreateCategory | UpdateCategory) {
    if (!isDirty) return;

    if (category) {
      const formData = new FormData();

      for (const [key, value] of Object.entries(dirtyFields)) {
        if (value)
          formData.append(key, data[key as keyof CreateCategory] || "");
      }

      await editMutation.mutateAsync(formData);
    } else {
      const formData = new FormData();

      formData.append("name", data.name.toLowerCase());
      formData.append("image", data.image!);
      formData.append("description", data.description);

      await addMutation.mutateAsync(formData);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onOpenChange={() => {
            dispatch(setCategory(undefined));
            reset();
            dispatch(toggleAddOrEditCategoryForm());
          }}
        >
          <DialogContent className="w-1/2 p-4">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <DialogTitle className="text-center text-lg font-bold">
                {category ? "Edit Category" : "Add Category"}
              </DialogTitle>

              <section className="grow grid grid-cols-[1fr_3fr] items-center gap-4">
                <DropZone
                  onLoad={(file) => setValue("image", file)}
                  error={errors.image?.message}
                  label="Icon Image"
                />

                <div className="flex flex-col gap-2">
                  <Input
                    label="Category Name"
                    {...register("name")}
                    error={errors.name?.message}
                    className="input-field"
                  />

                  <Input
                    label="Description"
                    multiline={true}
                    {...register("description")}
                    className="input-field h-[15rem] resize-none"
                    error={errors.description?.message}
                  />
                </div>
              </section>

              <button
                className="self-end bg-accent text-accent-foreground text-sm hover:scale-95 p-2 rounded-sm duration-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader /> : "Save"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AddOrEditCategoryForm;
