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
      const res = await api.post(
        "/auth/signup",
        {
          name: data.name.trimStart().trimEnd(),
          email: data.email.trimStart().trimEnd(),
          password: data.password.trimStart().trimEnd(),
        },
        {
          withCredentials: true,
        }
      );
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
      className="flex flex-col gap-4 sm:w-1/2 w-3/4 p-4 shadow-inner mx-auto mt-20 rounded-sm min-h-[400px] bg-card text-card-foreground"
    >
      <h1 className="text-xl font-bold text-center">Signup</h1>

      <section className="grow flex flex-col gap-2">
        <Input
          label="Name"
          register={register}
          field="name"
          error={errors.name?.message}
          className="input-field"
        />
        <Input
          label="Email"
          register={register}
          field="email"
          error={errors.email?.message}
          className="input-field"
        />
        <Input
          type="password"
          label="Password"
          register={register}
          field="password"
          error={errors.password?.message}
          className="input-field"
        />
      </section>

      <section className="relative border-t-[1px] border-ring">
        <p className="text-sm text-center mt-8 flex gap-2 justify-center">
          Already have an account?
          <Link
            href="/auth/login"
            className="text-secondary-accent hover:underline"
          >
            Login
          </Link>
        </p>
      </section>

      <button
        type="submit"
        disabled={loading}
        className="self-end bg-accent text-accent-foreground text-sm hover:scale-95 p-2 rounded-sm duration-400"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Signup;
