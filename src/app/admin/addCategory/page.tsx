"use client";
import InputField from "@/components/common/InputField";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const CategoryData = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  image: z
    .instanceof(File)
    .refine((image) => image.type.startsWith("image/"), "Image is required"),
});
export type CategoryData = z.infer<typeof CategoryData>;
const AddCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CategoryData),
  });
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: CategoryData) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image);
      const res = await api.post("/categories/category", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      toast.success(res.data.message, { duration: 5000 });
    } catch (err) {
      if (isAxiosError(err))
        return toast.error(err.response?.data.message, { duration: 5000 });
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      method="post"
      className="flex flex-col h-full justify-center gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs">
          Name
        </label>
        <input
          type="text"
          {...register("name")}
          id="name"
          className="text-sm w-full p-2 bg-white shadow-md  rounded-md outline-none focus:ring-1 focus:ring-purple-500"
        />
        <p className="text-xs text-red-500">{errors.name?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="image" className="text-xs">
          Image
        </label>
        <input
          type="file"
          id="image"
          onChange={(e) => {
            if (e.target.files) {
              setValue("image", e.target.files[0]);
            }
          }}
          className="text-sm w-1/3 p-2 bg-white shadow-md  rounded-md outline-none focus:ring-1 focus:ring-purple-500"
        />
        <p className="text-xs text-red-500">{errors.image?.message}</p>
      </div>
      <button
        type="submit"
        className="self-end mt-4 hover:scale-95 bg-purple-500  text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-blue-600 duration-500"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddCategory;
