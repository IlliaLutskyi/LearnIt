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
import Input from "@/components/common/Input";
import { CreateUserSchema } from "@/features/users/schemas/create-user-schema";

type User = z.infer<typeof CreateUserSchema>;
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(CreateUserSchema) });
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
      className="flex flex-col gap-4 sm:w-1/2 w-3/4 p-4 shadow-inner mx-auto mt-[5rem] rounded-sm min-h-[400px] bg-slate-100"
    >
      <h1 className="text-xl font-bold text-center">Signup</h1>

      <section className="grow flex flex-col gap-2">
        <Input
          label="Name"
          register={register}
          field="name"
          error={errors.name?.message}
          className="text-sm w-full p-2 shadow-inner rounded-sm outline-none focus:ring-1 focus:ring-purple-500 bg-white"
        />
        <Input
          label="Email"
          register={register}
          field="email"
          error={errors.email?.message}
          className="text-sm w-full p-2 shadow-inner rounded-sm outline-none focus:ring-1 focus:ring-purple-500 bg-white"
        />
        <Input
          label="Password"
          register={register}
          field="password"
          error={errors.password?.message}
          className="text-sm w-full p-2 shadow-inner rounded-sm outline-none focus:ring-1 focus:ring-purple-500 bg-white"
        />
      </section>

      <section className="relative border-t-[1px] border-purple-300">
        <p className="text-sm text-center mt-8 flex gap-2 justify-center">
          Already have an account?
          <Link href="/auth/login" className="text-purple-500 hover:underline">
            Login
          </Link>
        </p>
      </section>

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
