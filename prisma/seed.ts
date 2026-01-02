import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { Prisma } from "./generated/prisma";

async function seedUsers() {
  const users = [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: await bcrypt.hash("_admin_123", 12),
      role: "Admin",
    },
    {
      name: "User",
      email: "user@gmail.com",
      password: await bcrypt.hash("_user_123", 12),
      role: "User",
    },
  ] as Prisma.UserCreateManyInput[];

  await prisma.user.createMany({
    data: users,
  });
}

seedUsers()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
