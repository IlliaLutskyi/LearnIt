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
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(CreateCategorySchema),
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
      const res = await api.patch(`/categories/${category?.id}`, data);
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
    if (category) {
      setValue("name", category.name);
    }
  }, [category]);

  async function onSubmit(data: CreateCategory) {
    if (!isDirty) return;

    const formData = new FormData();

    formData.append("name", data.name.toLowerCase());
    formData.append("image", data.image);

    if (category) {
      await editMutation.mutateAsync(formData);
    } else {
      await addMutation.mutateAsync(formData);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onOpenChange={() => {
            dispatch(toggleAddOrEditCategoryForm());
            dispatch(setCategory(undefined));
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

              <section className="flex flex-col gap-4">
                <Input
                  label="Category Name"
                  {...register("name")}
                  error={errors.name?.message}
                  className="input-field"
                />
                <DropZone
                  onLoad={(file) => setValue("image", file)}
                  error={errors.image?.message}
                  label="Poster Image"
                />
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
