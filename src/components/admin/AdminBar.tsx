"use client";
import Link from "next/link";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const AdminBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <nav className="flex flex-col bg-white shadow-inner p-4 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex items-center gap-4 p-4 border-b-[1px] border-gray-200">
        <Avatar>
          <AvatarImage></AvatarImage>
          <AvatarFallback>{session?.user?.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <section>
          <h1 className="text-sm">{session?.user?.name}</h1>
          <p className="text-xs">{session?.user?.email}</p>
        </section>
      </div>
      <div>
        <ul className="flex flex-col gap-2 items-center justify-center h-full p-4">
          <li>
            <Link
              href="/admin/addCategory"
              className={`flex items-center gap-2 text-sm hover:underline ${
                pathname === "/admin/addCategory" ? "text-purple-600" : ""
              }`}
            >
              <CiCirclePlus />
              Add Category
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminBar;
