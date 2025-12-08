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
    <aside className="flex flex-col gap-4 bg-sidebar-primary text-sidebar-primary-foreground shadow-inner max-w-[250px] h-[calc(100vh-48px)]">
      <section className="flex items-center gap-4 p-4">
        <Avatar>
          <AvatarImage></AvatarImage>
          <AvatarFallback>{session?.user?.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-sm">{session?.user?.name}</h1>
          <p className="text-xs">{session?.user?.email}</p>
        </div>
      </section>

      <section className="flex flex-col items-center gap-2 h-full p-4 overflow-y-auto">
        <Link
          href="/admin/addCategory"
          className={`flex items-center gap-2 text-sm hover:underline ${
            pathname === "/admin/addCategory" ? "text-secondary-accent" : ""
          }`}
        >
          <CiCirclePlus />
          Add category
        </Link>
      </section>
    </aside>
  );
};

export default AdminBar;
