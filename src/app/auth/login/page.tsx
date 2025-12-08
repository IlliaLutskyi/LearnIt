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
      className="flex flex-col gap-4 sm:w-1/2 w-3/4 p-4 shadow-inner mx-auto mt-20 rounded-sm min-h-[400px] bg-card text-card-foreground"
    >
      <h1 className="text-xl font-bold text-center">Login</h1>
      <section className="grow flex flex-col gap-2">
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
          Don&apos;t have an account?
          <Link
            href="/auth/signup"
            className="text-secondary-accent hover:underline"
          >
            Signup
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

export default Login;
