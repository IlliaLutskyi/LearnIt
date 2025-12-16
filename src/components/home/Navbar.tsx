"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import DarkModeToggle from "../common/DarkModeToggle";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { IoClose, IoMenu } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { isAdmin } from "@/features/users/permissions";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="flex justify-between items-center gap-4 w-full bg-navbar text-navbar-foreground h-12 py-4 px-6">
      <Link href="/" className="text-2xl font-bold">
        LearnIt
      </Link>
      <SearchBar />
      <ul className="hidden sm:flex items-center justify-center sm:gap-6">
        <li>
          <Link
            href="/"
            className="hover:text-secondary-accent duration-400 text-sm"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/courses"
            className="hover:text-secondary-accent duration-400 text-sm"
          >
            Courses
          </Link>
        </li>
        {!session?.user && status !== "loading" && (
          <li>
            <Link
              href="/auth/login"
              className="hover:text-secondary-accent duration-400 text-sm"
            >
              Login
            </Link>
          </li>
        )}
        {session?.user && session.user.role === "Admin" && (
          <li>
            <Link
              href="/admin"
              className="hover:text-secondary-accent duration-400 text-sm"
            >
              Admin
            </Link>
          </li>
        )}
        {session?.user && session.user.role === "Admin" && (
          <li>
            <Link
              href={"/create-course"}
              className="hover:text-secondary-accent duration-400 text-sm"
            >
              Create course
            </Link>
          </li>
        )}
        <DarkModeToggle />
      </ul>
      <MobileNavbar />
    </nav>
  );
};

const MobileNavbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="sm:hidden block">
      <Drawer direction="left">
        <DrawerTrigger>
          <IoMenu size={20} />
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-2 p-4">
          <DrawerClose>
            <IoClose />
          </DrawerClose>
          <DrawerTitle className="hidden">Navigation Bar</DrawerTitle>

          <ul className="flex flex-col items-center justify-center gap-4 h-full">
            <li>
              <Link
                href="/"
                className="hover:text-secondary-accent duration-400 text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className="hover:text-secondary-accent duration-400 text-sm"
              >
                Courses
              </Link>
            </li>
            {!session?.user && status !== "loading" && (
              <li>
                <Link
                  href="/auth/login"
                  className="hover:text-secondary-accent duration-400 text-sm"
                >
                  Login
                </Link>
              </li>
            )}
            {isAdmin(session?.user) && (
              <li>
                <Link
                  href="/admin"
                  className="hover:text-secondary-accent duration-400 text-sm"
                >
                  Admin
                </Link>
              </li>
            )}
            {isAdmin(session?.user) && (
              <li>
                <Link
                  href={"/create-course"}
                  className="hover:text-secondary-accent duration-400 text-sm"
                >
                  Create course
                </Link>
              </li>
            )}
            <DarkModeToggle />
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
// const DesktopSidebar = () => {
//   const { data: session, status } = useSession();
//   return (
//     <section>
//       <ul className="flex flex-col items-center justify-around gap-6">
//         <li>
//           <Link
//             href="/"
//             className="hover:text-secondary-accent duration-400 text-sm"
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/courses"
//             className="hover:text-secondary-accent duration-400 text-sm"
//           >
//             Courses
//           </Link>
//         </li>
//         {!session?.user && status !== "loading" && (
//           <li>
//             <Link
//               href="/auth/login"
//               className="hover:text-secondary-accent duration-400 text-sm"
//             >
//               Login
//             </Link>
//           </li>
//         )}
//         {session?.user && session.user.role === "Admin" && (
//           <li>
//             <Link
//               href="/admin"
//               className="hover:text-secondary-accent duration-400 text-sm"
//             >
//               Admin
//             </Link>
//           </li>
//         )}
//         {session?.user && session.user.role === "Admin" && (
//           <li>
//             <Link
//               href={"/create-course"}
//               className="hover:text-secondary-accent duration-400 text-sm"
//             >
//               Create course
//             </Link>
//           </li>
//         )}
//       </ul>
//       <DarkModeToggle />
//     </section>
//   );
// };
export default Navbar;
