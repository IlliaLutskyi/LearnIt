"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
const User = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password cannot exceed 100 characters"),
});
type User = z.infer<typeof User>;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(User) });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onSubmit(data: User) {
    setLoading(true);
    try {
      await signIn("credentials", {
        email: data.email,
        redirect: false,
        password: data.password,
      });
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
      className="flex flex-col gap-4 sm:w-1/2 w-3/4 p-4 shadow-2xl mx-auto mt-[5rem] rounded-md"
    >
      <h1 className="text-xl font-bold text-center">Login</h1>
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
          Don&apos;t have an account?
          <Link href="/auth/signup" className="text-purple-500 hover:underline">
            Signup
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

export default Login;
