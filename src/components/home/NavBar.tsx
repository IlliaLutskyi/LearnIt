"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="flex max-sm:gap-3 max-sm:flex-col justify-between items-center w-full max-sm:p-1 p-3 bg-purple-600 text-white">
      <div>
        <Link href="/" className="text-2xl font-bold">
          LearnIt
        </Link>
      </div>
      <ul className="flex max-sm:flex-col items-center justify-center max-sm:gap-1 gap-4 ">
        <li>
          <Link href="/" className="hover:underline text-sm">
            Home
          </Link>
        </li>
        <li>
          <Link href="/courses" className="hover:underline text-sm">
            Courses
          </Link>
        </li>
        {!session?.user && status !== "loading" && (
          <li>
            <Link href="/auth/login" className="hover:underline text-sm">
              Login
            </Link>
          </li>
        )}
        {session?.user && session.user.role === "Admin" && (
          <li>
            <Link href="/admin" className="hover:underline text-sm">
              Admin
            </Link>
          </li>
        )}
        {session?.user && session.user.role === "Admin" && (
          <li>
            <Link href={"/create-course"} className="hover:underline text-sm">
              Create course
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
