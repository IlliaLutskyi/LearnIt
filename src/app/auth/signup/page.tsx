"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
const User = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password cannot exceed 100 characters"),
});
type User = z.infer<typeof User>;
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(User) });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: User) {
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", data, {
        withCredentials: true,
      });
      toast.success(res.data.message, { duration: 5000 });
      router.push("/auth/login");
    } catch (err) {
      if (isAxiosError(err))
        toast.error(err.response?.data.message, { duration: 5000 });
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 sm:w-1/2 w-3/4 p-4 shadow-2xl mx-auto mt-[3rem] rounded-md"
    >
      <h1 className="text-xl font-bold text-center">Signup</h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          type="text"
          {...register("name")}
          id="name"
          className="text-sm w-full p-2 shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
        />
        <p className="text-red-500 text-xs">{errors.name?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          type="text"
          {...register("email")}
          id="email"
          className="text-sm w-full p-2 shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
        />
        <p className="text-red-500 text-xs">{errors.email?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          type="text"
          {...register("password")}
          id="password"
          className="text-sm w-full p-2 shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
        />
        <p className="text-red-500 text-xs">{errors.password?.message}</p>
      </div>
      <div className="relative border-t-[1px] border-gray-950">
        <h1 className="absolute top-[-5%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-2">
          or
        </h1>
        <p className="text-sm text-center mt-8 flex gap-2 justify-center">
          Already have an account?
          <Link href="/auth/login" className="text-purple-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="self-end bg-purple-500 hover:scale-95 duration-500 text-white p-2 rounded-sm"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Signup;
