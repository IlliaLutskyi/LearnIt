"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import { LoginUserSchema } from "@/features/users/schemas/login-user-schema";

type User = z.infer<typeof LoginUserSchema>;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginUserSchema) });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onSubmit(data: User) {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        redirect: false,
        password: data.password,
      });
      if (result?.error) return toast.error(result.error, { duration: 5000 });
      toast.success("Login successful", { duration: 5000 });
      router.refresh();
    } catch (err) {
      toast.error("Login failed, please try again", { duration: 5000 });
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
      <h1 className="text-xl font-bold text-center">Login</h1>
      <section className="grow flex flex-col gap-2">
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
          type="password"
          error={errors.password?.message}
          className="text-sm w-full p-2 shadow-inner rounded-sm outline-none focus:ring-1 focus:ring-purple-500 bg-white"
        />
      </section>

      <section className="relative border-t-[1px] border-purple-300">
        <p className="text-sm text-center mt-8 flex gap-2 justify-center">
          Don&apos;t have an account?
          <Link href="/auth/signup" className="text-purple-500 hover:underline">
            Signup
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

export default Login;
